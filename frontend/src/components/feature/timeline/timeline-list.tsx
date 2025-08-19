import TimelineItem from "./timeline-item";

export default function TimelineList() {
  return <div className="flex flex-col gap-10">
    <TimelineItem />
    <TimelineItem />
    <TimelineItem />
    <TimelineItem />
  </div>;
}