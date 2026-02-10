// Main Dashboard Page - Clean, Modern Design
'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/lib/store';
import { ChatMessage, BroadcastMessage, MessagePriority, Agent, Task } from '@/lib/types';
import StatsCards from '@/components/StatsCards';
import AgentStatusCard from '@/components/AgentStatusCard';
import TaskBoard from '@/components/TaskBoard';
import ChatChannels from '@/components/ChatChannels';
import ReshaAssistant from '@/components/ReshaAssistant';
import BroadcastPanel from '@/components/BroadcastPanel';
import AgentBuilder from '@/components/AgentBuilder';
import { mockAgents, mockTasks, mockChatMessages } from '@/lib/gateway';
import { Activity, Bot, MessageSquare, Settings, Bell, Zap } from 'lucide-react';

export default function Dashboard() {
  const {
    agents,
    setAgents,
    tasks,
    setTasks,
    chatMessages,
    agentInputs,
    setChatMessages,
    setAgentInputs,
    reshaMessages,
    setReshaMessages,
    broadcasts,
    addBroadcast,
    addChatMessage,
    addReshaMessage,
    addAgentInput,
    addTask,
    updateStats,
  } = useDashboardStore();

  // Initialize with mock data on mount
  useEffect(() => {
    setAgents(mockAgents);
    setTasks(mockTasks);
    setChatMessages(mockChatMessages.filter((m) => m.channel === 'agent-chat'));
    setAgentInputs(mockChatMessages.filter((m) => m.channel === 'agent-inputs'));

    setReshaMessages([
      {
        id: 'reshaa-1',
        from: 'Reshaa',
        fromRole: 'Main Coordinator',
        content: 'Hi Rajpal! I\'m ready to help you manage the team. What would you like me to do?',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        channel: 'resha-direct',
      },
      {
        id: 'reshaa-2',
        from: 'Reshaa',
        fromRole: 'Main Coordinator',
        content: 'I\'m monitoring all agent activities. Nexa is working on the dashboard layout, CodeX on the backend. Dashboard architecture is ready for your review.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        channel: 'resha-direct',
      },
    ]);

    updateStats();
  }, [setAgents, setTasks, setChatMessages, setAgentInputs, setReshaMessages, updateStats]);

  // Handle sending message to chat channels
  const handleSendChatMessage = (channel: string, content: string) => {
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: 'Rajpal',
      fromRole: 'Project Owner',
      content,
      timestamp: new Date().toISOString(),
      channel: channel as 'agent-chat' | 'agent-inputs',
    };

    if (channel === 'agent-chat') {
      addChatMessage(message);
    } else if (channel === 'agent-inputs') {
      addAgentInput(message);
    }
  };

  // Handle sending message to Reshaa
  const handleSendReshaaMessage = (content: string, title?: string, priority?: MessagePriority) => {
    const message: ChatMessage = {
      id: `reshaa-msg-${Date.now()}`,
      from: 'Rajpal',
      fromRole: 'Project Owner',
      content,
      title,
      priority,
      timestamp: new Date().toISOString(),
      channel: 'resha-direct',
    };

    addReshaMessage(message);

    setTimeout(() => {
      const response: ChatMessage = {
        id: `reshaa-resp-${Date.now()}`,
        from: 'Reshaa',
        fromRole: 'Main Coordinator',
        content: `I received your ${priority === 'urgent' ? 'urgent' : ''} message. I'll coordinate with the team and handle this ${priority === 'urgent' ? 'immediately' : 'promptly'}.`,
        timestamp: new Date().toISOString(),
        channel: 'resha-direct',
      };
      addReshaMessage(response);
    }, 2000);
  };

  // Handle broadcasting to all agents
  const handleSendBroadcast = (content: string, priority: MessagePriority) => {
    const broadcast: BroadcastMessage = {
      id: `broadcast-${Date.now()}`,
      content,
      priority,
      timestamp: new Date().toISOString(),
      createdBy: 'Rajpal',
    };

    addBroadcast(broadcast);

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: 'Rajpal',
      fromRole: 'Project Owner',
      content: `📢 BROADCAST: ${content}`,
      priority,
      timestamp: new Date().toISOString(),
      channel: 'agent-chat',
    };
    addChatMessage(message);
  };

  // Handle creating new agent
  const handleCreateAgent = (agentData: { name: string; role: string; capabilities: string[]; task: string }) => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: agentData.name,
      role: agentData.role,
      status: 'idle',
      tasksAssigned: 1,
      lastActive: new Date().toISOString(),
      capabilities: agentData.capabilities,
    };

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: `Initial task for ${agentData.name}`,
      description: agentData.task,
      assignedTo: newAgent.id,
      status: 'assigned',
      priority: 'normal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [agentData.role.toLowerCase()],
    };

    addTask(newTask);
    setAgents([...agents, newAgent]);
    updateStats();

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: 'Reshaa',
      fromRole: 'Main Coordinator',
      content: `New agent ${agentData.name} (${agentData.role}) has been added to the team!`,
      timestamp: new Date().toISOString(),
      channel: 'agent-chat',
    };
    addChatMessage(message);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Simplified Header - No Gradient */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Reshaa Agent Dashboard</h1>
                <p className="text-xs text-slate-500">AI Development Team Command Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                <Zap size={12} className="text-amber-500" />
                <span>Live</span>
              </div>
              <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings size={18} />
              </button>
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - More Whitespace */}
      <main className="max-w-[1800px] mx-auto p-6 space-y-6">
        {/* Stats - With more spacing */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <StatsCards stats={useDashboardStore.getState().stats} />
        </div>

        {/* Main Grid - Bigger gaps for breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Agents */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-slate-900">Active Agents</h2>
                <span className="text-xs text-slate-500">{agents.length} total</span>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {agents.map((agent) => (
                  <AgentStatusCard key={agent.id} agent={agent} selected={false} />
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Tasks & Chat */}
          <div className="lg:col-span-6 space-y-6">
            {/* Task Board */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-slate-900">Task Board</h2>
              </div>
              <TaskBoard tasks={tasks} />
            </div>

            {/* Chat Channels */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 h-[500px]">
              <ChatChannels
                agent_chat={chatMessages}
                agent_inputs={agentInputs}
                onSendMessage={handleSendChatMessage}
              />
            </div>
          </div>

          {/* Right Column - Reshaa & Tools */}
          <div className="lg:col-span-3 space-y-6">
            {/* Reshaa Assistant */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 h-[600px]">
              <ReshaAssistant
                messages={reshaMessages}
                onSendMessage={handleSendReshaaMessage}
              />
            </div>

            {/* Broadcast Panel */}
            <div>
              <BroadcastPanel
                broadcasts={broadcasts}
                onSendBroadcast={handleSendBroadcast}
              />
            </div>

            {/* Agent Builder */}
            <div>
              <AgentBuilder onCreateAgent={handleCreateAgent} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
