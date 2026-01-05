import "./globals.css";

export const metadata = {
  title: "THRESHOLD",
  description: "Where Shadow Becomes Wisdom."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
