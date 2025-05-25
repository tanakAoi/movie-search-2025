import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Instruction } from "./components/Instruction";
import { MovieSearch } from "./components/MovieSearch";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Instruction />
        <MovieSearch />
      </main>
      <Footer />
    </>
  );
}
