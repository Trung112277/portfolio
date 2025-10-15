// Utility functions for tracking deleted activities
export interface DeletedActivityData {
  type: 'project' | 'tech' | 'work_experience';
  name: string;
  description?: string;
  category?: string;
  company?: string;
  position?: string;
}

export interface UpdatedActivityData {
  type: 'project' | 'tech' | 'work_experience';
  name: string;
  description?: string;
  category?: string;
  company?: string;
  position?: string;
  oldName?: string;
  oldDescription?: string;
}

export interface ActivityItem {
  id: string;
  type: 'project' | 'tech' | 'work_experience';
  action: 'created' | 'updated' | 'deleted';
  title: string;
  description: string;
  timestamp: string;
  color: string;
}

export function trackDeletedActivity(data: DeletedActivityData) {
  if (typeof window === 'undefined') return;

  const activity = {
    id: `${data.type}-${Date.now()}-deleted`,
    type: data.type,
    action: 'deleted' as const,
    title: getDeletedTitle(data),
    description: getDeletedDescription(data),
    timestamp: new Date().toISOString(),
    color: 'red'
  };

  // Call the global function to add deleted activity
  const windowWithActivity = window as unknown as { addDeletedActivity?: (activity: ActivityItem) => void };
  if (windowWithActivity.addDeletedActivity) {
    windowWithActivity.addDeletedActivity(activity);
  }
}

export function trackUpdatedActivity(data: UpdatedActivityData) {
  if (typeof window === 'undefined') return;

  const activity = {
    id: `${data.type}-${Date.now()}-updated`,
    type: data.type,
    action: 'updated' as const,
    title: getUpdatedTitle(data),
    description: getUpdatedDescription(data),
    timestamp: new Date().toISOString(),
    color: 'blue'
  };

  // Call the global function to add updated activity
  const windowWithActivity = window as unknown as { addUpdatedActivity?: (activity: ActivityItem) => void };
  if (windowWithActivity.addUpdatedActivity) {
    windowWithActivity.addUpdatedActivity(activity);
  }
}

function getDeletedTitle(data: DeletedActivityData): string {
  switch (data.type) {
    case 'project':
      return `Deleted project: ${data.name}`;
    case 'tech':
      return `Deleted technology: ${data.name}`;
    case 'work_experience':
      return `Deleted work experience: ${data.position} at ${data.company}`;
    default:
      return `Deleted ${data.type}: ${data.name}`;
  }
}

function getDeletedDescription(data: DeletedActivityData): string {
  switch (data.type) {
    case 'project':
      return data.description || 'Project removed from portfolio';
    case 'tech':
      return `${data.category} technology removed`;
    case 'work_experience':
      return 'Work experience removed from profile';
    default:
      return 'Item removed';
  }
}

function getUpdatedTitle(data: UpdatedActivityData): string {
  switch (data.type) {
    case 'project':
      return `Updated project: ${data.name}`;
    case 'tech':
      return `Updated technology: ${data.name}`;
    case 'work_experience':
      return `Updated work experience: ${data.position} at ${data.company}`;
    default:
      return `Updated ${data.type}: ${data.name}`;
  }
}

function getUpdatedDescription(data: UpdatedActivityData): string {
  const changes = [];
  
  if (data.oldName && data.oldName !== data.name) {
    changes.push(`Name: "${data.oldName}" → "${data.name}"`);
  }
  
  if (data.oldDescription && data.oldDescription !== data.description) {
    changes.push(`Description updated`);
  }
  
  if (changes.length === 0) {
    return 'Details modified';
  }
  
  return changes.join(', ');
}
