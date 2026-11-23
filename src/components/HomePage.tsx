import { Hero } from "./Hero";
import {
  AboutSection,
  ContactSection,
  ProjectsSection,
  SignalSection,
  ToolchainSection,
} from "./HomeSections";

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ToolchainSection />
      <SignalSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
