// Core Types for Reshaa Agent Dashboard

export type MessagePriority = 'normal' | 'urgent';

export type TaskStatus = 'assigned' | 'in-progress' | 'completed' | 'needs-review';

export type AgentStatus = 'active' | 'idle' | 'offline' | 'busy';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  tasksAssigned: number;
  lastActive: string;
  capabilities: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: TaskStatus;
  priority: MessagePriority;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  tags?: string[];
  dependencies?: string[];
}

export interface ChatMessage {
  id: string;
  from: string;
  fromRole: string;
  to?: string; // specific agent or 'broadcast'
  content: string;
  title?: string;
  priority?: MessagePriority;
  timestamp: string;
  channel: 'agent-chat' | 'agent-inputs' | 'resha-direct';
  mentions?: string[];
}

export interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  totalTasks: number;
  assignedTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  needsReviewTasks: number;
  urgentMessages: number;
}

export interface BroadcastMessage {
  id: string;
  content: string;
  priority: MessagePriority;
  timestamp: string;
  createdBy: string;
}
