import { memo } from "react";
import TimelineItem from "./timeline-item";
import { TIMELINE_DATA } from "@/data/timeline-data";

const TimelineList = memo(() => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        {TIMELINE_DATA.map((item, ) => (
          <TimelineItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
});

TimelineList.displayName = "TimelineList";

export default TimelineList;