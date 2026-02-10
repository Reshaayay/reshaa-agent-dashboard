// Agent Status Card Component
import { Agent } from '@/lib/types';
import { Activity, Clock, Zap, AlertCircle, MoreVertical, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentStatusCardProps {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean;
}

const statusConfig: Record<Agent['status'], { icon: any; color: string; bgColor: string; textColor: string; borderColor: string; label: string }> = {
  active: { 
    icon: Activity, 
    color: 'bg-emerald-500', 
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    label: 'Active' 
  },
  busy: { 
    icon: Zap, 
    color: 'bg-amber-500', 
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    label: 'Busy' 
  },
  idle: { 
    icon: Clock, 
    color: 'bg-sky-500', 
    bgColor: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200',
    label: 'Idle' 
  },
  offline: { 
    icon: AlertCircle, 
    color: 'bg-gray-400', 
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-200',
    label: 'Offline' 
  },
};

export default function AgentStatusCard({ agent, onClick, selected }: AgentStatusCardProps) {
  const config = statusConfig[agent.status];
  const StatusIcon = config.icon;

  const timeAgo = getTimeAgo(new Date(agent.lastActive));

  return (
    <div
      onClick={onClick}
      className={`
        relative group bg-white rounded-2xl p-5 shadow-sm border-2 transition-all duration-300 cursor-pointer
        ${selected 
          ? 'border-indigo-500 ring-4 ring-indigo-100' 
          : `border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5`
        }
      `}
    >
      {/* Top Section - Avatar & Status */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar with gradient */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            {agent.name.charAt(0)}
          </div>
          {/* Status indicator on avatar */}
          <div className={cn(
            "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white flex items-center justify-center shadow-sm",
            config.bgColor
          )}>
            <div className={cn("w-3 h-3 rounded-full", config.color, "animate-pulse")} />
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 truncate">{agent.name}</h3>
            {agent.id === 'reshaa-main' && (
              <Star size={16} className="text-amber-400 fill-amber-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm font-medium text-gray-600 mb-1">{agent.role}</p>
          
          {/* Status Badge */}
          <div className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
            config.bgColor,
            config.textColor,
            config.borderColor,
            "border"
          )}>
            <StatusIcon size={12} />
            <span>{config.label}</span>
          </div>
        </div>

        {/* More Options */}
        <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors flex-shrink-0">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{agent.tasksAssigned}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Active</p>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">{timeAgo}</p>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      {agent.capabilities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {agent.capabilities.slice(0, 3).map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
            >
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
              +{agent.capabilities.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}
