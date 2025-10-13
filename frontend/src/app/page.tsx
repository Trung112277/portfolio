import { Metadata } from "next";
import { FloatingButton } from "@/components/button/floating-button";
import Introduction from "@/components/common/introduction";
import TechList from "@/components/feature/tech/tech-list";
import ProjectsFloatingList from "@/components/feature/linking-floating/projects-floating-list";
import TimelineList from "@/components/feature/timeline/timeline-list";
import { MainHeader } from "@/components/heading/main-header";
import { Title } from "@/components/heading/title";
import { BUTTON_COLORS } from "@/constant/theme-colors";
import Projects3DWrapper from "@/components/feature/threed-section/projects-3d-wrapper";
import { SocialsGlowBoxList } from "@/components/feature/glow-bow/socials-glow-box-list";
import { getAuthorNameServerSide } from "@/lib/author-name-server";
import { generateBaseSEO } from "@/lib/seo";

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';

// Generate metadata for home page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const authorName = await getAuthorNameServerSide();
    const seoConfig = generateBaseSEO(authorName);
    
    return {
      title: `${authorName} | Portfolio`,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
      openGraph: {
        title: `${authorName} | Portfolio`,
        description: seoConfig.description,
        url: seoConfig.url,
        type: seoConfig.type,
        images: [
          {
            url: `${seoConfig.url}${seoConfig.image}`,
            width: 1200,
            height: 630,
            alt: `${authorName} | Portfolio`,
          },
        ],
        siteName: seoConfig.siteName,
        locale: seoConfig.locale,
      },
      twitter: {
        card: "summary_large_image",
        title: `${authorName} | Portfolio`,
        description: seoConfig.description,
        images: [`${seoConfig.url}${seoConfig.image}`],
        creator: seoConfig.twitterHandle,
      },
    };
  } catch (error) {
    console.error("Error generating home metadata:", error);
    return {
      title: "Developer | Portfolio",
      description: "Professional portfolio showcasing development skills, React, Next.js, TypeScript projects, and modern web technologies.",
      keywords: ["portfolio", "developer", "react", "nextjs", "typescript"],
    };
  }
}

export default function Home() {
  return (
    <main>
      <section className="container mx-auto px-4 mb-10 md:mb-20 flex flex-col justify-between items-center h-screen min-h-[700px] relative">
        <div className="flex-1" />
        <div className="flex-1 flex items-center justify-center z-10">
          <MainHeader />
        </div>
        <div className="flex-1 flex justify-center pb-1 md:pb-8 mt-[100px]">
          <SocialsGlowBoxList />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="w-[300px] h-[300px] bg-primary/40 rounded-full block blur-3xl"></span>
        </div>
        <div className="absolute lg:top-[100px] top-1/5 left-[5%]  xl:left-1/5 2xl:left-0">
          <FloatingButton color={BUTTON_COLORS.about} to="#about">
            About me
          </FloatingButton>
        </div>
        <div className="absolute lg:top-[100px] top-1/5 right-[5%]  xl:right-1/5 2xl:right-0">
          <FloatingButton color={BUTTON_COLORS.dashboard} to="/dashboard">
            Dashboard
          </FloatingButton>
        </div>
        <div className="absolute bottom-2/6 md:bottom-[240px] lg:bottom-[200px] right-[5%]   xl:right-1/5 2xl:right-0 ">
          <FloatingButton color={BUTTON_COLORS.tech} to="#tech">
            Tech
          </FloatingButton>
        </div>
        <div className="absolute bottom-2/6 md:bottom-[240px] lg:bottom-[200px] left-[5%]  xl:left-1/5 2xl:left-0 ">
          <FloatingButton color={BUTTON_COLORS.projects} to="#projects">
            Projects
          </FloatingButton>
        </div>
      </section>

      <section
        id="about"
        className="container mx-auto px-4 mb-10 md:mb-20 flex flex-col lg:flex-row items-center relative"
      >
        <div className="top-0 bottom-0 block lg:sticky w-full lg:w-1/2 h-full p-5">
          <div className="flex flex-col mt-0 lg:mt-20 items-center justify-center h-full">
            <Title primary="about" secondary="me" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-0 lg:p-5 flex flex-col gap-12">
          <Introduction />
          <TimelineList />
        </div>
      </section>

      <section
        id="tech"
        className="container mx-auto px-4 mb-10 md:mb-20 flex flex-col-reverse lg:flex-row items-center relative"
      >
        <div className="w-full lg:w-1/2 p-0 md:p-5">
          <TechList />
        </div>
        <div className="top-0 bottom-0 block lg:sticky w-full lg:w-1/2 h-full p-5">
          <div className="flex flex-col mt-0 lg:mt-20 items-center justify-center h-full">
            <Title primary="tech" secondary="set" />
          </div>
        </div>
      </section>

      <section id="projects" className="relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
          <Projects3DWrapper />
        </div>
        <div className="container mx-auto px-4 flex items-center">
          <ProjectsFloatingList />
        </div>
      </section>
    </main>
  );
}
