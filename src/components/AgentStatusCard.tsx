// Agent Status Card Component
import { Agent, AgentStatus } from '@/lib/types';
import { Activity, Clock, Zap, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface AgentStatusCardProps {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean;
}

const statusConfig: Record<AgentStatus, { icon: any; color: string; label: string }> = {
  active: { icon: Activity, color: 'bg-green-500', label: 'Active' },
  busy: { icon: Zap, color: 'bg-yellow-500', label: 'Busy' },
  idle: { icon: Clock, color: 'bg-blue-500', label: 'Idle' },
  offline: { icon: AlertCircle, color: 'bg-gray-500', label: 'Offline' },
};

export default function AgentStatusCard({ agent, onClick, selected }: AgentStatusCardProps) {
  const config = statusConfig[agent.status];
  const StatusIcon = config.icon;

  const lastActiveTime = new Date(agent.lastActive).toLocaleTimeString();
  const timeAgo = getTimeAgo(new Date(agent.lastActive));

  return (
    <div
      onClick={onClick}
      className={`
        relative bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer hover:shadow-md
        ${selected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-indigo-300'}
      `}
    >
      {/* Status Indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`}></div>
        <span className="text-xs font-medium text-gray-500">{config.label}</span>
      </div>

      {/* Agent Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {agent.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{agent.name}</h3>
          <p className="text-sm text-gray-500">{agent.role}</p>
        </div>
      </div>

      {/* Status Details */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Tasks</span>
          <span className="font-medium text-gray-900">{agent.tasksAssigned}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={14} />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Capabilities Tags */}
      <div className="mt-3 flex flex-wrap gap-1">
        {agent.capabilities.slice(0, 3).map((cap) => (
          <span
            key={cap}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
          >
            {cap}
          </span>
        ))}
        {agent.capabilities.length > 3 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            +{agent.capabilities.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
