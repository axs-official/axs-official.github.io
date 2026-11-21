import { Nav } from "@/components/Nav";
import { StackList } from "@/components/StackList";

export const dynamic = 'force-static';
export default function StackPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-24">
        <StackList />
      </main>
    </>
  );
}
