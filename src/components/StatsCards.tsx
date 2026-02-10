// Stats Cards Component - Enhanced Visual Design
import { DashboardStats } from '@/lib/types';
import { Users, ListTodo, CheckCircle, Clock, AlertTriangle, Zap, Activity, ArrowUp, ArrowDown } from 'lucide-react';

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
      color: 'indigo',
      trend: `${Math.round((stats.activeAgents / stats.totalAgents || 1) * 100)}% online`,
      increase: true,
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: ListTodo,
      color: 'purple',
      trend: `${stats.inProgressTasks} in progress`,
      increase: true,
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'emerald',
      trend: 'Tasks finished',
      increase: true,
    },
    {
      title: 'Needs Review',
      value: stats.needsReviewTasks,
      icon: AlertTriangle,
      color: 'amber',
      trend: 'Awaiting approval',
      increase: false,
    },
    {
      title: 'Assigned',
      value: stats.assignedTasks,
      icon: Clock,
      color: 'cyan',
      trend: 'Pending tasks',
      increase: true,
    },
    {
      title: 'Urgent Items',
      value: stats.urgentMessages,
      icon: Zap,
      color: 'rose',
      trend: 'Immediate attention',
      increase: false,
    },
  ];

  const colorClasses = {
    indigo: {
      bg: 'gradient-bg-indigo',
      bgLight: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
    },
    purple: {
      bg: 'gradient-bg-pastel',
      bgLight: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
    },
    emerald: {
      bg: 'gradient-bg-green',
      bgLight: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
    },
    amber: {
      bg: 'gradient-bg-orange',
      bgLight: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-200',
    },
    cyan: {
      bg: 'gradient-bg-blue',
      bgLight: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-200',
    },
    rose: {
      bg: 'gradient-bg-rose',
      bgLight: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-200',
    },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const color = colorClasses[card.color as keyof typeof colorClasses];
        const TrendIcon = card.increase ? ArrowUp : ArrowDown;

        return (
          <div
            key={card.title}
            className="
              group relative overflow-hidden
              bg-white rounded-xl p-4
              shadow-sm hover:shadow-xl
              border border-gray-100 hover:border-gray-200
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Decorative gradient background */}
            <div className={`
              absolute -top-8 -right-8 w-24 h-24
              ${color.bg} rounded-full opacity-10
              group-hover:opacity-20 transition-opacity
            `}></div>

            <div className="relative z-10">
              {/* Header with icon */}
              <div className="flex items-start justify-between mb-3">
                <div className={`
                  w-12 h-12 rounded-xl ${color.bg}
                  flex items-center justify-center
                  shadow-lg shadow-${card.color}-500/20
                  group-hover:scale-110 transition-transform
                `}>
                  <Icon size={22} className="text-white" />
                </div>
                {card.title === 'Active Agents' && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <Activity size={10} />
                  </div>
                )}
              </div>

              {/* Value */}
              <div className="mb-2">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-700">
                  {card.value}
                </span>
                {card.total !== undefined && (
                  <span className="text-lg text-gray-400 ml-1">/ {card.total}</span>
                )}
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1.5">
                <TrendIcon size={12} className={card.increase ? 'text-emerald-500' : 'text-rose-500'} />
                <span className="text-xs font-medium text-gray-500">{card.trend}</span>
              </div>
            </div>

            {/* Hover glow effect */}
            <div className={`
              absolute bottom-0 left-0 right-0 h-0.5
              ${color.bg} opacity-0 group-hover:opacity-100
              transition-opacity
            `}></div>
          </div>
        );
      })}
    </div>
  );
}
