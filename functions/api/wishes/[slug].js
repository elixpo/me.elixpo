// Birthday wish counter: GET /api/wishes/<slug> reads this year's count,
// POST /api/wishes/<slug> {"count": n} adds a batch of wishes from one visitor.
// Clients batch clicks in localStorage and flush every few seconds, so one request can carry many
// wishes; the limits below keep a single visitor from inflating the count or exhausting D1.
import members from "../../../content/portfolio-order.json";

const MAX_BATCH = 50; // wishes per request
const MAX_PER_MINUTE = 150; // wishes per visitor per member per minute
const ALLOWED_ORIGIN = /^https:\/\/([a-z0-9-]+\.)*elixpo\.com$|^http:\/\/localhost(:\d+)?$/;

const yearInIndia = () => Number(new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric" }).format(new Date()));

function cors(request) {
  const origin = request.headers.get("Origin");
  return origin && ALLOWED_ORIGIN.test(origin) ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {};
}

const json = (request, body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors(request), ...headers } });

async function visitorKey(request, slug, salt) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${salt}:${ip}:${slug}`));
  return [...new Uint8Array(digest).slice(0, 12)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function onRequest({ request, params, env }) {
  const slug = String(params.slug || "");
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { ...cors(request), "Access-Control-Allow-Methods": "GET, POST", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
  }
  if (!members.includes(slug)) return json(request, { error: "unknown member" }, 404);
  const year = yearInIndia();
  const db = env.WISHES_DB;

  if (request.method === "GET") {
    const row = await db.prepare("SELECT count FROM wishes WHERE slug = ?1 AND year = ?2").bind(slug, year).first();
    // A short shared cache absorbs polling from many visitors at once.
    return json(request, { slug, year, count: row?.count ?? 0 }, 200, { "Cache-Control": "public, max-age=10" });
  }
  if (request.method !== "POST") return json(request, { error: "method not allowed" }, 405, { Allow: "GET, POST, OPTIONS" });

  const origin = request.headers.get("Origin");
  if (origin && !ALLOWED_ORIGIN.test(origin)) return json(request, { error: "origin not allowed" }, 403);
  let body;
  try { body = await request.json(); } catch { return json(request, { error: "invalid JSON" }, 400); }
  const requested = Math.floor(Number(body?.count));
  if (!Number.isFinite(requested) || requested < 1) return json(request, { error: "count must be a positive integer" }, 400);
  let count = Math.min(requested, MAX_BATCH);

  // The salt rotates daily, so stored keys cannot be linked back to an IP or across days.
  const window = Math.floor(Date.now() / 60000);
  const key = await visitorKey(request, slug, `${env.WISHES_SALT || "elixpo-wishes"}:${new Date().toISOString().slice(0, 10)}`);
  const used = await db.prepare(
    "INSERT INTO wish_limits (key, minute, n) VALUES (?1, ?2, ?3) ON CONFLICT(key) DO UPDATE SET n = CASE WHEN minute = ?2 THEN n + ?3 ELSE ?3 END, minute = ?2 RETURNING n"
  ).bind(key, window, count).first("n");
  const over = used - MAX_PER_MINUTE;
  if (over >= count) return json(request, { error: "too many wishes, slow down", retryAfter: 60 }, 429, { "Retry-After": "60" });
  if (over > 0) count -= over;

  const total = await db.prepare(
    "INSERT INTO wishes (slug, year, count) VALUES (?1, ?2, ?3) ON CONFLICT(slug, year) DO UPDATE SET count = count + ?3, updated_at = datetime('now') RETURNING count"
  ).bind(slug, year, count).first("count");
  // Occasionally drop stale throttle rows.
  if (Math.random() < 0.02) await db.prepare("DELETE FROM wish_limits WHERE minute < ?1").bind(window - 5).run();
  return json(request, { slug, year, count: total, accepted: count });
}
