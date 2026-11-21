import { Nav } from "@/components/Nav";
import { WorkCards } from "@/components/WorkCards";

export const dynamic = 'force-static';
export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-24">
        <WorkCards />
      </main>
    </>
  );
}
