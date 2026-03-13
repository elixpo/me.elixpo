import "./globals.css";

export const metadata = {
  title: "Elixpo",
  description: "Portfolio showcase",
  icons: {
    icon: "https://cdn.discordapp.com/app-icons/1214916249222643752/f60abd68fff5f65f72076a5aaac5afb8.png?size=512",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
