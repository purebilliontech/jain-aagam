import type { Metadata } from "next";
import './globals.css';
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Jain Aagam",
  description: "Explore the timeless wisdom and teachings of Jain Agam, a collection of sacred texts that form the foundation of Jain philosophy and spirituality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Eczar:wght@400..800&display=swap" rel="stylesheet" />
      </head>
      <body
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
