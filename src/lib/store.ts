// Zustand Store for Dashboard State Management
import { create } from 'zustand';
import { Agent, Task, ChatMessage, DashboardStats, BroadcastMessage, MessagePriority } from './types';

interface DashboardStore {
  // Agents
  agents: Agent[];
  setAgents: (agents: Agent[]) => void;
  updateAgentStatus: (agentId: string, status: Agent['status']) => void;

  // Tasks
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;

  // Chat Messages
  chatMessages: ChatMessage[];
  reshaMessages: ChatMessage[];
  agentInputs: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  setReshaMessages: (messages: ChatMessage[]) => void;
  addReshaMessage: (message: ChatMessage) => void;
  setAgentInputs: (messages: ChatMessage[]) => void;
  addAgentInput: (message: ChatMessage) => void;

  // Broadcasts
  broadcasts: BroadcastMessage[];
  addBroadcast: (broadcast: BroadcastMessage) => void;

  // Stats
  stats: DashboardStats;
  updateStats: () => void;

  // UI State
  selectedAgent: string | null;
  setSelectedAgent: (agentId: string | null) => void;
  unreadMessages: number;
  setUnreadMessages: (count: number) => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // Initial State
  agents: [],
  tasks: [],
  chatMessages: [],
  reshaMessages: [],
  agentInputs: [],
  broadcasts: [],
  stats: {
    totalAgents: 0,
    activeAgents: 0,
    totalTasks: 0,
    assignedTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    needsReviewTasks: 0,
    urgentMessages: 0,
  },
  selectedAgent: null,
  unreadMessages: 0,

  // Agent Actions
  setAgents: (agents) => set({ agents }),
  updateAgentStatus: (agentId, status) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, status, lastActive: new Date().toISOString() } : agent,
      ),
    })),

  // Task Actions
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString(),
              completedAt: updates.status === 'completed' ? new Date().toISOString() : task.completedAt,
            }
          : task,
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),

  // Chat Actions
  setChatMessages: (messages) => set({ chatMessages: messages }),
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
      unreadMessages: state.unreadMessages + 1,
    })),
  setReshaMessages: (messages) => set({ reshaMessages: messages }),
  addReshaMessage: (message) =>
    set((state) => ({
      reshaMessages: [...state.reshaMessages, message],
    })),
  setAgentInputs: (messages) => set({ agentInputs: messages }),
  addAgentInput: (message) =>
    set((state) => ({
      agentInputs: [...state.agentInputs, message],
    })),

  // Broadcast Actions
  addBroadcast: (broadcast) =>
    set((state) => ({ broadcasts: [...state.broadcasts, broadcast] })),

  // Stats Actions
  updateStats: () =>
    set((state) => {
      const totalAgents = state.agents.length;
      const activeAgents = state.agents.filter((a) => a.status === 'active' || a.status === 'busy').length;
      const totalTasks = state.tasks.length;
      const assignedTasks = state.tasks.filter((t) => t.status === 'assigned').length;
      const inProgressTasks = state.tasks.filter((t) => t.status === 'in-progress').length;
      const completedTasks = state.tasks.filter((t) => t.status === 'completed').length;
      const needsReviewTasks = state.tasks.filter((t) => t.status === 'needs-review').length;
      const urgentMessages = state.tasks.filter((t) => t.priority === 'urgent').length;

      return {
        stats: {
          totalAgents,
          activeAgents,
          totalTasks,
          assignedTasks,
          inProgressTasks,
          completedTasks,
          needsReviewTasks,
          urgentMessages,
        },
      };
    }),

  // UI Actions
  setSelectedAgent: (agentId) => set({ selectedAgent: agentId }),
  setUnreadMessages: (count) => set({ unreadMessages: count }),
}));
