import { memo } from "react";
import { TimelineItem as TimelineItemType } from "@/data/timeline-data";
import SubTitle from "@/components/heading/sub-title";

interface TimelineItemProps {
  item: TimelineItemType;
}

const TimelineItem = memo(({ item }: TimelineItemProps) => {
  return (
    <div className="flex flex-col gap-3 text-foreground pl-0 md:pl-10 timeline relative">
      <div className={`flex flex-col gap-3 timeline-item relative pl-5`}>
        <div className="flex flex-col gap-2">
          <SubTitle>{item.title}</SubTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <p className="text-xl text-primary font-medium">@{item.company}</p>
            <span className="hidden sm:inline text-primary">•</span>
            <p className="text-lg">{item.period}</p>
            {item.location && (
              <>
                <span className="hidden text-primary sm:inline">
                  •
                </span>
                <p className="text-sm">{item.location}</p>
              </>
            )}
          </div>
        </div>

        {/* Skills */}
        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {item.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Responsibilities */}
        <ul className="text-lg flex flex-col gap-3 list-disc list-inside">
          {item.responsibilities.map((responsibility, index) => (
            <li key={index} className="leading-relaxed">
              {responsibility}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";

export default TimelineItem;
