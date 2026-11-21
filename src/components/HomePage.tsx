import { Nav } from "./Nav";
import { Hero } from "./Hero";

export function HomePage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
      </main>
    </>
  );
}
