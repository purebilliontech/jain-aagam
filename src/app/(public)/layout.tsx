import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import { Toaster } from '@/components/ui/sonner'


export const metadata: Metadata = {
  title: "Jain Aagam",
  description: "Explore the timeless wisdom and teachings of Jain Aagam, a collection of sacred texts that form the foundation of Jain philosophy and spirituality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Toaster />
      {children}
    </>
  );
}
