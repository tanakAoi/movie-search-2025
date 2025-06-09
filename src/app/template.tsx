import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import StarryBackground from "@/components/decor/StarryBackground";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
