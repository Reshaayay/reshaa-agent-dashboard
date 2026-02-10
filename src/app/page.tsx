// Main Dashboard Page - Enhanced Design
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
import { Activity, Bot, MessageSquare, Settings, Bell, Zap, Users, LayoutDashboard, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 pattern-grid">
      {/* Enhanced Header with Glass Effect */}
      <header className="header-glass sticky top-0 z-50 border-b border-indigo-100/50">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg-indigo flex items-center justify-center shadow-lg glow-indigo">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Reshaa Agent Dashboard
                </h1>
                <p className="text-sm text-gray-500 font-medium">AI Development Team Command Center</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100/50">
                <Zap size={16} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">Live</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <button className="relative p-2.5 bg-white rounded-xl text-gray-500 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-100/50 transition-all border border-gray-200 hover:border-indigo-200">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full status-pulse border-2 border-white"></span>
              </button>
              <button className="p-2.5 bg-white rounded-xl text-gray-500 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-100/50 transition-all border border-gray-200 hover:border-indigo-200">
                <Settings size={20} />
              </button>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg glow-pink cursor-pointer">
                R
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Enhanced Spacing and Layout */}
      <main className="max-w-[1920px] mx-auto p-6 space-y-8">
        {/* Stats Overview - Better Container */}
        <div className="card-elegant rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-bg-indigo flex items-center justify-center">
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Real-time team metrics and status</p>
            </div>
          </div>
          <StatsCards stats={useDashboardStore.getState().stats} />
        </div>

        {/* Main Grid - Better Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Agents */}
          <div className="lg:col-span-3 space-y-6">
            <div className="card-elegant rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg-blue flex items-center justify-center">
                    <Users size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Active Agents</h2>
                    <p className="text-sm text-gray-500">{agents.length} online</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {agents.map((agent) => (
                  <AgentStatusCard key={agent.id} agent={agent} selected={false} />
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Tasks & Chat */}
          <div className="lg:col-span-6 space-y-8">
            {/* Task Board - Enhanced */}
            <div className="card-elegant rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-bg-rose flex items-center justify-center">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Task Board</h2>
                    <p className="text-sm text-gray-500">Track team progress</p>
                  </div>
                </div>
              </div>
              <TaskBoard tasks={tasks} />
            </div>

            {/* Chat Channels - Enhanced */}
            <div className="card-elegant rounded-2xl p-6 h-[550px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg gradient-bg-pastel flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Team Communication</h2>
                  <p className="text-sm text-gray-500">Agent collaboration hub</p>
                </div>
              </div>
              <ChatChannels
                agent_chat={chatMessages}
                agent_inputs={agentInputs}
                onSendMessage={handleSendChatMessage}
              />
            </div>
          </div>

          {/* Right Column - Reshaa & Tools */}
          <div className="lg:col-span-3 space-y-8">
            {/* Reshaa Assistant - Enhanced */}
            <div className="card-elegant rounded-2xl p-6 h-[650px]">
              <ReshaAssistant
                messages={reshaMessages}
                onSendMessage={handleSendReshaaMessage}
              />
            </div>

            {/* Broadcast Panel - Enhanced */}
            <div>
              <BroadcastPanel
                broadcasts={broadcasts}
                onSendBroadcast={handleSendBroadcast}
              />
            </div>

            {/* Agent Builder - Enhanced */}
            <div>
              <AgentBuilder onCreateAgent={handleCreateAgent} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
