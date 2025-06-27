import { Footer } from "@/app/(public)/components/layout/Footer";
import { Header } from "@/app/(public)/components/layout/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
