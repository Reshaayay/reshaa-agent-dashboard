// Stats Cards Component - Clean, Modern Design
import { DashboardStats } from '@/lib/types';
import { Users, ListTodo, CheckCircle, Clock, AlertTriangle, Zap, Activity } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Active Agents',
      value: stats.activeAgents,
      total: stats.totalAgents,
      icon: Users,
      color: 'bg-indigo-600',
      trend: `${Math.round((stats.activeAgents / stats.totalAgents || 1) * 100)}% online`,
      increase: true,
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: ListTodo,
      color: 'bg-indigo-600',
      trend: `${stats.inProgressTasks} in progress`,
      increase: true,
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'bg-emerald-600',
      trend: 'Tasks finished',
      increase: true,
    },
    {
      title: 'Needs Review',
      value: stats.needsReviewTasks,
      icon: AlertTriangle,
      color: 'bg-amber-500',
      trend: 'Awaiting approval',
      increase: false,
    },
    {
      title: 'Assigned',
      value: stats.assignedTasks,
      icon: Clock,
      color: 'bg-indigo-600',
      trend: 'Pending tasks',
      increase: true,
    },
    {
      title: 'Urgent Items',
      value: stats.urgentMessages,
      icon: Zap,
      color: 'bg-rose-600',
      trend: 'Immediate attention',
      increase: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white rounded-xl p-4
              border border-slate-200
              hover:shadow-md hover:border-slate-300
              transition-all duration-200
            "
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`
                w-10 h-10 rounded-lg ${card.color} flex items-center justify-center
                shrink-0
              `}>
                <Icon size={18} className="text-white" />
              </div>
              {card.title === 'Active Agents' && (
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              )}
            </div>

            <div className="mb-2">
              <span className="text-2xl font-bold text-slate-900">
                {card.value}
              </span>
              {card.total !== undefined && (
                <span className="text-lg text-slate-400 ml-1">/{card.total}</span>
              )}
            </div>

            <p className="text-xs text-slate-500 font-medium">{card.trend}</p>
          </div>
        );
      })}
    </div>
  );
}
