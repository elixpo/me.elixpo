-- Birthday wishes per member and year (Asia/Kolkata), sent from the "Send a wish" button.
CREATE TABLE IF NOT EXISTS wishes (
  slug TEXT NOT NULL,
  year INTEGER NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (slug, year)
);

-- Per-visitor throttle: a salted hash of the client IP, one row per member per minute window.
CREATE TABLE IF NOT EXISTS wish_limits (
  key TEXT PRIMARY KEY,
  minute INTEGER NOT NULL,
  n INTEGER NOT NULL
);
