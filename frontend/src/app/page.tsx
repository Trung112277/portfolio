import { FloatingButton } from "@/components/button/floating-button";
import { FrontendGlowBow } from "@/components/feature/glow-bow/frontend-glow-bow";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="flex justify-center items-center h-screen gap-6">
        <FloatingButton color="#1fc3ff" to="#about">
          About me
        </FloatingButton>
        <FloatingButton color="#ff6b6b" to="#contact">
          Contact me
        </FloatingButton>
        <FloatingButton color="#4ecdc4" to="#projects">
          Projects
        </FloatingButton>
      </section>
      
      <section id="tech-stack" className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Frontend Technologies</h2>
          <FrontendGlowBow />
        </div>
      </section>
    </main>
  );
}
