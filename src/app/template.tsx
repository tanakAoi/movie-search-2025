import { Footer } from "@/app/components/layout/Footer";
import { Header } from "@/app/components/layout/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
