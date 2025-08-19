import { FloatingButton } from "@/components/button/floating-button";
import { FrontendGlowBow } from "@/components/feature/glow-bow/frontend-glow-bow";
import { MainHeader } from "@/components/heading/main-header";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="flex flex-col justify-between items-center h-[900px] relative">
        <div className="flex-1" />
        <div className="flex-1 flex items-center justify-center">
          <MainHeader />
        </div>
        <div className="flex-1 flex items-end justify-center pb-8">
          <FrontendGlowBow />
        </div>
        <div className="absolute top-[100px] left-0">
          <FloatingButton color="#1fc3ff" to="#about">About me</FloatingButton>
        </div>
        <div className="absolute bottom-[100px] right-0">
          <FloatingButton color="#4ecdc4" to="#tech">Tech</FloatingButton>
        </div>
      </section>
    </main>
  );
}
