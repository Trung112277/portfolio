import SubTitle from "@/components/heading/sub-title";

export default function TimelineItem() {
  return (
    <div className="flex flex-col gap-3 text-foreground pl-10 timeline relative">
      <SubTitle>Timeline</SubTitle>
      <div className="flex flex-col gap-3 timeline-item relative pl-5">
        <div>
          <h3 className="text-2xl line-clamp-1">Full Stack Developer</h3>
          <p className="text-xl text-primary line-clamp-1">@Wimetrix | 2022 - Present</p>
        </div>
        <ul className="text-lg list-disc list-inside flex flex-col gap-3">
          <li>
            Contributed significantly to the development of main project
            Sooperwizer, a pivotal project for automating and optimizing textile
            processes.
          </li>
          <li>
            Developed and maintained a comprehensive system for managing and
            tracking textile production processes, including inventory
            management, quality control, and production tracking.
          </li>
        </ul>
      </div>
    </div>
  );
}
