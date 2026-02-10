// Main Dashboard Page
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
import { Activity, Bot, MessageSquare, Settings, Bell, Sparkles } from 'lucide-react';

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

    // Add some initial reshaa messages
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

    // Simulate Reshaa response after 2 seconds
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

    // Also add to chat
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

    // Update state
    const updatedAgents = [...agents, newAgent];
    setAgents(updatedAgents);
    updateStats();

    // Add notification to chat
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-200">
                <Bot size={26} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reshaa Agent Dashboard</h1>
                <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                  <Sparkles size={14} className="text-indigo-500" />
                  AI Development Team Command Center
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings size={20} />
              </button>
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-white">
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <section aria-label="Dashboard Overview">
          <StatsCards stats={useDashboardStore.getState().stats} />
        </section>

        {/* Section Divider */}
        <div className="section-divider-lg" />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Agents */}
          <div className="lg:col-span-3">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="section-header bg-gradient-to-r from-gray-50 to-white px-6 py-4 cursor-pointer hover:from-gray-100 transition-all">
                <div className="section-title">
                  <div className="section-icon bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Activity size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="h2">Agents</h2>
                    <p className="text-xs text-gray-500 font-semibold">{agents.length} in team</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto scrollbar-thin">
                {agents.map((agent) => (
                  <AgentStatusCard
                    key={agent.id}
                    agent={agent}
                    selected={false}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Center Column - Tasks & Chat */}
          <div className="lg:col-span-6 space-y-6">
            {/* Task Board */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="section-header bg-gradient-to-r from-gray-50 to-white px-6 py-4">
                <div className="section-title">
                  <div className="section-icon bg-gradient-to-br from-sky-500 to-blue-600">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="h2">Task Board</h2>
                    <p className="text-xs text-gray-500 font-semibold">{tasks.length} total tasks</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <TaskBoard tasks={tasks} />
              </div>
            </section>

            {/* Chat Channels */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <ChatChannels
                agent_chat={chatMessages}
                agent_inputs={agentInputs}
                onSendMessage={handleSendChatMessage}
              />
            </section>
          </div>

          {/* Right Column - Reshaa, Broadcast, Agent Builder */}
          <div className="lg:col-span-3 space-y-6">
            {/* Reshaa Assistant */}
            <section>
              <ReshaAssistant
                messages={reshaMessages}
                onSendMessage={handleSendReshaaMessage}
              />
            </section>

            {/* Broadcast Panel */}
            <section>
              <BroadcastPanel
                broadcasts={broadcasts}
                onSendBroadcast={handleSendBroadcast}
              />
            </section>

            {/* Agent Builder */}
            <section>
              <AgentBuilder onCreateAgent={handleCreateAgent} />
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-200/50">
        <p>Reshaa Agent Dashboard © {new Date().getFullYear()} — Powered by AI</p>
      </footer>
    </div>
  );
}
