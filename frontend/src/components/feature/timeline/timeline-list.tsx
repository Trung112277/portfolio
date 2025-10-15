"use client";

import React from "react";
import { useWorkExperience } from "@/hooks/useWorkExperience";
import TimelineItem from "./timeline-item";
import { TimelineItem as TimelineItemType } from "@/data/timeline-data";

const TimelineList = () => {
  const { workExperiences, loading, error } = useWorkExperience();

  // Transform work experience data to timeline format
  const currentYear = new Date().getFullYear();
  const timelineItems: TimelineItemType[] = workExperiences.map((work) => ({
    id: work.id,
    title: work.position,
    company: work.company_name,
    period: work.end_year === currentYear ? `${work.start_year} - Present` : `${work.start_year} - ${work.end_year}`,
    location: work.work_arrangement,
    skills: work.tech_stack,
    responsibilities: work.description.split('\n').filter(line => line.trim() !== ''),
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <div className="text-lg">Loading work experiences...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500 text-lg">Error loading work experiences: {error}</div>
      </div>
    );
  }

  if (timelineItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-muted-foreground text-lg">No work experiences found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        {timelineItems.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TimelineList;