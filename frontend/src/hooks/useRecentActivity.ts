"use client";

import { useMemo, useEffect, useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { useTechStack } from '@/hooks/useTechStack';
import { useWorkExperience } from '@/hooks/useWorkExperience';

export interface ActivityItem {
  id: string;
  type: 'project' | 'tech' | 'work_experience';
  action: 'created' | 'updated' | 'deleted';
  title: string;
  description: string;
  timestamp: string;
  color: string;
}

export function useRecentActivity() {
  const { projects } = useProjects();
  const { techStack: allTech } = useTechStack();
  const { workExperiences } = useWorkExperience();
  const [deletedActivities, setDeletedActivities] = useState<ActivityItem[]>([]);
  const [updatedActivities, setUpdatedActivities] = useState<ActivityItem[]>([]);

  // Load activities from localStorage on mount
  useEffect(() => {
    const storedDeleted = localStorage.getItem('deletedActivities');
    const storedUpdated = localStorage.getItem('updatedActivities');
    
    if (storedDeleted) {
      try {
        setDeletedActivities(JSON.parse(storedDeleted));
      } catch (error) {
        console.error('Error parsing deleted activities:', error);
      }
    }
    
    if (storedUpdated) {
      try {
        setUpdatedActivities(JSON.parse(storedUpdated));
      } catch (error) {
        console.error('Error parsing updated activities:', error);
      }
    }
  }, []);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('deletedActivities', JSON.stringify(deletedActivities));
  }, [deletedActivities]);

  useEffect(() => {
    localStorage.setItem('updatedActivities', JSON.stringify(updatedActivities));
  }, [updatedActivities]);

  // Function to add a deleted activity
  const addDeletedActivity = (activity: ActivityItem) => {
    setDeletedActivities(prev => {
      const newActivities = [activity, ...prev].slice(0, 10); // Keep only latest 10
      return newActivities;
    });
  };

  // Function to add an updated activity
  const addUpdatedActivity = (activity: ActivityItem) => {
    setUpdatedActivities(prev => {
      const newActivities = [activity, ...prev].slice(0, 10); // Keep only latest 10
      return newActivities;
    });
  };

  // Expose functions to add activities (can be called from components)
  useEffect(() => {
    const windowWithActivity = window as unknown as { 
      addDeletedActivity?: typeof addDeletedActivity;
      addUpdatedActivity?: typeof addUpdatedActivity;
    };
    
    windowWithActivity.addDeletedActivity = addDeletedActivity;
    windowWithActivity.addUpdatedActivity = addUpdatedActivity;
    
    return () => {
      delete windowWithActivity.addDeletedActivity;
      delete windowWithActivity.addUpdatedActivity;
    };
  }, []);

  const activities = useMemo((): ActivityItem[] => {
    const allActivities: ActivityItem[] = [];

    // Process projects - only show created activities, not updated ones
    // Updated activities should be tracked separately with snapshot data
    projects.forEach((project) => {
      if (project.created_at) {
        allActivities.push({
          id: `project-${project.id}-created`,
          type: 'project',
          action: 'created',
          title: `Added new project: ${project.name}`,
          description: project.description || 'No description',
          timestamp: project.created_at,
          color: 'green'
        });
      }
    });

    // Process tech stack - only show created activities
    allTech.forEach((tech) => {
      if (tech.created_at) {
        allActivities.push({
          id: `tech-${tech.id}-created`,
          type: 'tech',
          action: 'created',
          title: `Added new technology: ${tech.name}`,
          description: `${tech.category} technology`,
          timestamp: tech.created_at,
          color: 'purple'
        });
      }
    });

    // Process work experiences - only show created activities
    workExperiences.forEach((workExp) => {
      if (workExp.created_at) {
        allActivities.push({
          id: `work-${workExp.id}-created`,
          type: 'work_experience',
          action: 'created',
          title: `Added work experience: ${workExp.position} at ${workExp.company_name}`,
          description: `${workExp.start_year} - ${workExp.end_year || 'Present'}`,
          timestamp: workExp.created_at,
          color: 'orange'
        });
      }
    });

    // Add deleted and updated activities
    allActivities.push(...deletedActivities);
    allActivities.push(...updatedActivities);

    // Sort by timestamp (most recent first) and limit to 10 items
    return allActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10);
  }, [projects, allTech, workExperiences, deletedActivities, updatedActivities]);

  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffTime = now.getTime() - activityDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
  };

  const getActivityIcon = (type: ActivityItem['type'], action: ActivityItem['action']): string => {
    if (action === 'created') {
      switch (type) {
        case 'project': return '📁';
        case 'tech': return '⚡';
        case 'work_experience': return '💼';
        default: return '📝';
      }
    } else if (action === 'updated') {
      return '✏️';
    } else if (action === 'deleted') {
      return '🗑️';
    } else {
      return '📝';
    }
  };

  return {
    activities,
    getTimeAgo,
    getActivityIcon
  };
}
