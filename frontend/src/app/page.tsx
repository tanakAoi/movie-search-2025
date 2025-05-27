import { Hero } from "@/components/home/Hero";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ShowResult } from "@/components/search/ShowResult";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Container>
          <ShowResult />
        </Container>
      </main>
      <Footer />
    </>
  );
}
