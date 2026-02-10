// Gateway Integration Layer for Reshaa Agent Dashboard

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'http://localhost:8080';

export interface GatewayResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class GatewayClient {
  private url: string;

  constructor(url: string = GATEWAY_URL) {
    this.url = url;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<GatewayResponse<T>> {
    try {
      const response = await fetch(`${this.url}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Request failed' };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Gateway request error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // List all agents/sessions
  async listSessions(activeMinutes: number = 30) {
    return this.request<any>('/api/v1/sessions/list', {
      method: 'POST',
      body: JSON.stringify({ activeMinutes }),
    });
  }

  // Get session history
  async getSessionHistory(sessionKey: string, limit: number = 100) {
    return this.request<any>(`/api/v1/sessions/history`, {
      method: 'POST',
      body: JSON.stringify({ sessionKey, limit }),
    });
  }

  // Send message to a session/agent
  async sendToSession(sessionKey: string, message: string, timeoutSeconds?: number) {
    return this.request<any>('/api/v1/sessions/send', {
      method: 'POST',
      body: JSON.stringify({ sessionKey, message, timeoutSeconds }),
    });
  }

  // Spawn a new agent session
  async spawnAgent(task: string, label?: string, agentId?: string, cleanup?: string) {
    return this.request<any>('/api/v1/sessions/spawn', {
      method: 'POST',
      body: JSON.stringify({
        task,
        label,
        agentId,
        cleanup: cleanup || 'keep',
      }),
    });
  }

  // Get session status
  async getSessionStatus(sessionKey?: string) {
    return this.request<any>('/api/v1/session/status', {
      method: 'POST',
      body: JSON.stringify({ sessionKey }),
    });
  }

  // Broadcast message (via system event)
  async broadcastMessage(message: string, mode?: 'system-event' | 'agent-turn') {
    return this.request<any>('/api/v1/cron/wake', {
      method: 'POST',
      body: JSON.stringify({
        text: message,
        mode: 'now',
      }),
    });
  }

  // List available agents
  async listAgents() {
    return this.request<any>('/api/v1/agents/list', {
      method: 'POST',
    });
  }
}

export const gateway = new GatewayClient();

// Mock data for development (will be replaced with real API calls)
export const mockAgents = [
  {
    id: 'reshaa-main',
    name: 'Reshaa',
    role: 'Main Coordinator',
    status: 'active' as const,
    tasksAssigned: 3,
    lastActive: new Date().toISOString(),
    capabilities: ['orchestration', 'coordination', 'review'],
  },
  {
    id: 'frontend-dev',
    name: 'Nexa',
    role: 'Frontend Engineer',
    status: 'busy' as const,
    tasksAssigned: 2,
    lastActive: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    capabilities: ['React', 'Vue', 'Tailwind CSS', 'UI Components'],
  },
  {
    id: 'backend-dev',
    name: 'CodeX',
    role: 'Backend Engineer',
    status: 'active' as const,
    tasksAssigned: 1,
    lastActive: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    capabilities: ['Node.js', 'Python', 'API Design', 'Database'],
  },
  {
    id: 'ui-designer',
    name: 'Pixel',
    role: 'UI/UX Designer',
    status: 'idle' as const,
    tasksAssigned: 1,
    lastActive: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    capabilities: ['Figma', 'Design Systems', 'User Research'],
  },
  {
    id: 'qa-engineer',
    name: 'TestBot',
    role: 'QA Engineer',
    status: 'idle' as const,
    tasksAssigned: 0,
    lastActive: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    capabilities: ['Testing', 'Code Review', 'Quality Assurance'],
  },
];

export const mockTasks = [
  {
    id: 'task-1',
    title: 'Build Dashboard Layout',
    description: 'Create the main dashboard layout with agent status cards',
    assignedTo: 'frontend-dev',
    status: 'in-progress' as const,
    priority: 'urgent' as const,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    tags: ['frontend', 'dashboard'],
  },
  {
    id: 'task-2',
    title: 'Setup Gateway Integration',
    description: 'Integrate with OpenClaw Gateway for agent communication',
    assignedTo: 'backend-dev',
    status: 'in-progress' as const,
    priority: 'urgent' as const,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    tags: ['backend', 'api'],
  },
  {
    id: 'task-3',
    title: 'Design Task Cards Component',
    description: 'Create reusable task card component with status indicators',
    assignedTo: 'ui-designer',
    status: 'completed' as const,
    priority: 'normal' as const,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    tags: ['design', 'ui'],
  },
  {
    id: 'task-4',
    title: 'Review Dashboard Architecture',
    description: 'Review and approve the overall dashboard architecture',
    assignedTo: 'reshaa-main',
    status: 'needs-review' as const,
    priority: 'normal' as const,
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    tags: ['architecture', 'review'],
  },
];

export const mockChatMessages: any[] = [
  {
    id: 'msg-1',
    from: 'Nexa',
    fromRole: 'Frontend Engineer',
    content: 'Dashboard layout is taking shape! Need feedback on the agent status cards design.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    channel: 'agent-chat',
  },
  {
    id: 'msg-2',
    from: 'CodeX',
    fromRole: 'Backend Engineer',
    content: 'Gateway API endpoints are ready. Can test the connection now.',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    channel: 'agent-chat',
  },
  {
    id: 'msg-3',
    from: 'Pixel',
    fromRole: 'UI/UX Designer',
    content: 'Task cards component design is approved. Ready for implementation.',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    channel: 'agent-inputs',
  },
  {
    id: 'msg-4',
    from: 'Reshaa',
    fromRole: 'Main Coordinator',
    content: 'Great progress team! Dashboard architecture review is pending from Rajpal. @TestBot can you prepare a summary?',
    mentions: ['TestBot'],
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    channel: 'agent-chat',
  },
];
