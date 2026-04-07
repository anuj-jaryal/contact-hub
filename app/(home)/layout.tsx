
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "../globals.css";

const figtree = Figtree({
  weight: ["400","500","600"],
  display: "swap",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Welcome",
  description: "A test version of next js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={`${figtree.className} antialiased`}>
            {children}
      </body>
    </html>
  );
}
