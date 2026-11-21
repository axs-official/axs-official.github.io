import { Nav } from "@/components/Nav";
import { ContactCard } from "@/components/ContactCard";

export const dynamic = 'force-static';
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="relative pt-24">
        <ContactCard />
      </main>
    </>
  );
}
