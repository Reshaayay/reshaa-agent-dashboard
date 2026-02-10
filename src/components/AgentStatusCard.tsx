// Agent Status Card Component - Enhanced Design
import { Agent, AgentStatus } from '@/lib/types';
import { Activity, Clock, Zap, Shield, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface AgentStatusCardProps {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean;
}

const statusConfig: Record<AgentStatus, { icon: any; color: string; label: string; bgLight: string; textLight: string }> = {
  active: { icon: Activity, color: 'bg-emerald-500', label: 'Active', bgLight: 'bg-emerald-100', textLight: 'text-emerald-700' },
  busy: { icon: Zap, color: 'bg-amber-500', label: 'Busy', bgLight: 'bg-amber-100', textLight: 'text-amber-700' },
  idle: { icon: Clock, color: 'bg-blue-500', label: 'Idle', bgLight: 'bg-blue-100', textLight: 'text-blue-700' },
  offline: { icon: AlertCircle, color: 'bg-gray-400', label: 'Offline', bgLight: 'bg-gray-100', textLight: 'text-gray-600' },
};

function getAvatarGradient(index: number) {
  const gradients = [
    'avatar-gradient-1',
    'avatar-gradient-2',
    'avatar-gradient-3',
    'avatar-gradient-4',
    'avatar-gradient-5',
  ];
  return gradients[index % gradients.length];
}

export default function AgentStatusCard({ agent, onClick, selected }: AgentStatusCardProps) {
  const config = statusConfig[agent.status];
  const StatusIcon = config.icon;
  const avatarGradient = getAvatarGradient(agent.id.length);

  const lastActiveTime = new Date(agent.lastActive).toLocaleTimeString();
  const timeAgo = getTimeAgo(new Date(agent.lastActive));

  return (
    <div
      onClick={onClick}
      className={`
        group relative bg-white rounded-xl p-4 shadow-sm border-2 transition-all cursor-pointer overflow-hidden
        ${selected ? 'border-indigo-500 ring-4 ring-indigo-200/50' : 'border-gray-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50'}
        hover:-translate-y-1
      `}
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${config.color} animate-pulse shadow-lg shadow-${config.color.replace('bg-', '')}/50`}></div>
        <span className={`text-xs font-semibold ${config.textLight} rounded-full px-2 py-1 ${config.bgLight}`}>
          {config.label}
        </span>
      </div>

      {/* Agent Info */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`
          w-13 h-13 rounded-xl ${agent.status === 'active' ? avatarGradient : 'bg-gradient-to-br from-gray-400 to-gray-500'}
          flex items-center justify-center text-white font-bold text-xl shadow-lg
          flex-shrink-0 group-hover:scale-105 transition-transform
        `}
        style={{ width: '52px', height: '52px' }}
        >
          {agent.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 truncate text-base group-hover:text-indigo-600 transition-colors">
            {agent.name}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{agent.role}</p>
        </div>
      </div>

      {/* Status Details */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 font-medium flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-lg bg-indigo-100 flex items-center justify-center">
              <CheckCircle size={10} className="text-indigo-600" />
            </div>
            Tasks
          </span>
          <span className="font-bold text-gray-900">{agent.tasksAssigned}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-gray-500 font-medium">
            <Clock size={14} className="text-gray-400" />
            <span className="flex-1 truncate">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Capabilities Tags */}
      <div className="flex flex-wrap gap-1.5">
        {agent.capabilities.slice(0, 3).map((cap, idx) => (
          <span
            key={cap}
            className={`
              inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border
              ${idx % 2 === 0 ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-purple-50 text-purple-700 border-purple-100'}
            `}
          >
            {cap}
          </span>
        ))}
        {agent.capabilities.length > 3 && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            +{agent.capabilities.length - 3}
          </span>
        )}
      </div>

      {/* Hover action button */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg">
          <ExternalLink size={14} />
        </button>
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
