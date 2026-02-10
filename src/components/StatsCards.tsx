// Stats Cards Component - Overview Dashboard Metrics
import { DashboardStats } from '@/lib/types';
import { Users, ListTodo, Clock, CheckCircle, AlertTriangle, Zap, Activity, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      trend: `${stats.activeAgents} of ${stats.totalAgents} online`,
      trendUp: true,
      trendValue: '+2 today',
    },
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: ListTodo,
      color: 'purple',
      trend: `${stats.inProgressTasks} in progress`,
      trendUp: true,
      trendValue: '+5 this week',
    },
    {
      title: 'Completed',
      value: stats.completedTasks,
      icon: CheckCircle,
      color: 'emerald',
      trend: 'Tasks finished',
      trendUp: true,
      trendValue: '+12 done',
    },
    {
      title: 'Needs Review',
      value: stats.needsReviewTasks,
      icon: AlertTriangle,
      color: 'amber',
      trend: 'Awaiting your approval',
      trendUp: false,
      trendValue: '3 pending',
    },
    {
      title: 'Assigned',
      value: stats.assignedTasks,
      icon: Clock,
      color: 'sky',
      trend: 'Pending tasks',
      trendUp: true,
      trendValue: '+2 new',
    },
    {
      title: 'Urgent Items',
      value: stats.urgentMessages,
      icon: Zap,
      color: 'rose',
      trend: 'Requires immediate attention',
      trendUp: false,
      trendValue: `${stats.urgentMessages} critical`,
    },
  ];

  const colorClasses = {
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      bgLight: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-200',
    },
    sky: {
      bg: 'bg-gradient-to-br from-sky-500 to-sky-600',
      bgLight: 'bg-sky-50',
      text: 'text-sky-600',
      border: 'border-sky-200',
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-500 to-rose-600',
      bgLight: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-200',
    },
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const color = colorClasses[card.color as keyof typeof colorClasses];

          return (
            <div
              key={card.title}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background gradient on hover */}
              <div className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity",
                color.bg
              )} />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-14 h-14 rounded-xl shadow-lg flex items-center justify-center", color.bg)}>
                    <Icon size={28} className="text-white" />
                  </div>
                  
                  {/* Active indicator for agents */}
                  {card.title === 'Active Agents' && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-semibold text-emerald-700">Live</span>
                    </div>
                  )}

                  {/* Trend indicator */}
                  {card.trendValue && (
                    <div className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                      card.trendUp ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                    )}>
                      <TrendingUp size={12} className={!card.trendUp ? "rotate-180" : ""} />
                      <span>{card.trendValue}</span>
                    </div>
                  )}
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900 tracking-tight">
                    {card.value}
                  </span>
                  {card.total !== undefined && (
                    <span className="text-xl font-medium text-gray-400 ml-1">/ {card.total}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.trend}</p>
              </div>

              {/* Bottom accent line */}
              <div className={cn("absolute bottom-0 left-4 right-4 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity", color.bgLight)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
