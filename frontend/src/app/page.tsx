import { FloatingButton } from "@/components/button/floating-button";
import { FrontendGlowBow } from "@/components/feature/glow-bow/frontend-glow-bow";

export default function Home() {
  return (
   <div className="container mx-auto px-4">
    <section className="flex justify-center items-center h-screen">
      <FloatingButton color="#1fc3ff" to="#">
        About me
      </FloatingButton>
      <FloatingButton color="#ff0000" to="#">
        Contact me
      </FloatingButton>
      <FloatingButton color="#00ff00" to="#">
        Projects
      </FloatingButton>
    </section>
    <section className="flex justify-center items-center h-screen gap-8">
      <FrontendGlowBow />
    </section>
   </div>
  );
}
