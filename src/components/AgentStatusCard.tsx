// Agent Status Card Component - Clean, Modern Design
import { Agent, AgentStatus } from '@/lib/types';
import { Activity, Clock, CheckCircle } from 'lucide-react';

interface AgentStatusCardProps {
  agent: Agent;
  onClick?: () => void;
  selected?: boolean;
}

const statusConfig: Record<AgentStatus, { color: string; label: string; bgLight: string; textLight: string }> = {
  active: { color: 'bg-emerald-600', label: 'Active', bgLight: 'bg-emerald-100', textLight: 'text-emerald-700' },
  busy: { color: 'bg-amber-500', label: 'Busy', bgLight: 'bg-amber-100', textLight: 'text-amber-700' },
  idle: { color: 'bg-slate-400', label: 'Idle', bgLight: 'bg-slate-100', textLight: 'text-slate-600' },
  offline: { color: 'bg-slate-300', label: 'Offline', bgLight: 'bg-slate-100', textLight: 'text-slate-500' },
};

export default function AgentStatusCard({ agent, onClick, selected }: AgentStatusCardProps) {
  const config = statusConfig[agent.status];

  const timeAgo = getTimeAgo(new Date(agent.lastActive));

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl p-4 border border-slate-200
        transition-all duration-200 cursor-pointer
        hover:shadow-md hover:border-slate-300
        ${selected ? 'ring-2 ring-indigo-500' : ''}
        ${agent.status === 'active' ? 'border-l-4 border-l-emerald-500' : ''}
      `}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.color} animate-pulse`}></div>
      </div>

      {/* Agent Info */}
      <div className="flex items-start gap-3 mb-4">
        {/* Avatar - Solid color */}
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold
          ${agent.status === 'active' ? 'bg-indigo-600' : 'bg-slate-500'}
          shrink-0
        `}>
          {agent.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-base">{agent.name}</h3>
          <div className="mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600">
              {agent.role}
            </span>
          </div>
        </div>
      </div>

      {/* Status Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 font-medium">Tasks</span>
          <span className="font-semibold text-slate-900">{agent.tasksAssigned}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock size={14} />
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="border-t border-slate-100 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {agent.capabilities.slice(0, 4).map((cap, idx) => (
            <span
              key={cap}
              className={`
                inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium
                ${idx === 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-600'}
              `}
            >
              {cap}
            </span>
          ))}
          {agent.capabilities.length > 4 && (
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-500">
              +{agent.capabilities.length - 4}
            </span>
          )}
        </div>
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
