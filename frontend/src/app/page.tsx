import { FloatingButton } from "@/components/button/floating-button";
import Intro from "@/components/common/intro";
import { FrontendGlowBow } from "@/components/feature/glow-bow/frontend-glow-bow";
import TechList from "@/components/feature/tech/tech-list";
import TimelineList from "@/components/feature/timeline/timeline-list";
import { MainHeader } from "@/components/heading/main-header";
import { Title } from "@/components/heading/title";

export default function Home() {
  return (
    <main className="container mx-auto px-4 mb-20">
      <section className="flex flex-col justify-between items-center h-[900px] relative">
        <div className="flex-1" />
        <div className="flex-1 flex items-center justify-center z-10">
          <MainHeader />
        </div>
        <div className="flex-1 flex items-end justify-center pb-8">
          <FrontendGlowBow />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="w-[300px] h-[300px] bg-primary/40 rounded-full block blur-3xl"></span>
        </div>
        <div className="absolute top-[100px] left-0">
          <FloatingButton color="#1fc3ff" to="#about">
            About me
          </FloatingButton>
        </div>
        <div className="absolute bottom-[100px] right-0">
          <FloatingButton color="#4ecdc4" to="#tech">
            Tech
          </FloatingButton>
        </div>
      </section>
      <section id="about" className="flex items-center relative">
        <div className="top-0 bottom-0 sticky w-1/2 h-full p-5">
          <div className="flex flex-col mt-20 items-center justify-center h-full">
            <Title primary="about" secondary="me" />
          </div>
        </div>
        <div className="w-1/2 p-5 flex flex-col gap-12">
          <Intro />
          <TimelineList />
        </div>
      </section>
      <section id="tech" className="flex items-center relative">
        <div className="w-1/2 p-5">
          <TechList />
        </div>
        <div className="top-0 bottom-0 sticky w-1/2 h-full p-5">
          <div className="flex flex-col mt-20 items-center justify-center h-full">
            <Title primary="tech" secondary="set" />
          </div>
        </div>
      </section>
    </main>
  );
}
