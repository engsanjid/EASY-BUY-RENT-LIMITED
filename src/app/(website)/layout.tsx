// src/app/(website)/layout.tsx
import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}