// Stats Cards Component - Overview Dashboard Metrics
import { DashboardStats } from '@/lib/types';
import { Users, ListTodo, Clock, CheckCircle, AlertTriangle, Zap, Activity } from 'lucide-react';

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
      color: 'blue',
      trend: `${stats.activeAgents} of ${stats.totalAgents} online`,
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: ListTodo,
      color: 'purple',
      trend: `${stats.inProgressTasks} in progress`,
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'green',
      trend: 'Tasks finished',
    },
    {
      title: 'Needs Review',
      value: stats.needsReviewTasks,
      icon: AlertTriangle,
      color: 'orange',
      trend: 'Awaiting your approval',
    },
    {
      title: 'Assigned',
      value: stats.assignedTasks,
      icon: Clock,
      color: 'cyan',
      trend: 'Pending tasks',
    },
    {
      title: 'Urgent Items',
      value: stats.urgentMessages,
      icon: Zap,
      color: 'red',
      trend: 'Requires immediate attention',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      text: 'text-blue-600',
    },
    purple: {
      bg: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      text: 'text-purple-600',
    },
    green: {
      bg: 'bg-green-500',
      bgLight: 'bg-green-50',
      text: 'text-green-600',
    },
    orange: {
      bg: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      text: 'text-orange-600',
    },
    cyan: {
      bg: 'bg-cyan-500',
      bgLight: 'bg-cyan-50',
      text: 'text-cyan-600',
    },
    red: {
      bg: 'bg-red-500',
      bgLight: 'bg-red-50',
      text: 'text-red-600',
    },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const color = colorClasses[card.color as keyof typeof colorClasses];

        return (
          <div
            key={card.title}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
              {card.title === 'Active Agents' && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <Activity size={12} className="text-green-500" />
                </div>
              )}
            </div>
            <div className="mb-1">
              <span className="text-2xl font-bold text-gray-900">{card.value}</span>
              {card.total !== undefined && (
                <span className="text-sm text-gray-400"> / {card.total}</span>
              )}
            </div>
            <p className="text-xs text-gray-500">{card.trend}</p>
          </div>
        );
      })}
    </div>
  );
}
