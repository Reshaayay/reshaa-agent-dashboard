'use client'

import { Users, ListTodo, CheckCircle } from 'lucide-react'
import { DashboardStats } from '@/lib/types'

interface TopBarProps {
  stats: DashboardStats
}

export default function TopBar({ stats }: TopBarProps) {
  return (
    <header className="h-14 border-b border-slate-800 bg-[#0D1117] flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-emerald-500" />
          <span className="text-sm text-white">{stats.activeAgents} agents active</span>
        </div>
        <div className="w-px h-6 bg-slate-700" />
        <div className="flex items-center gap-2">
          <ListTodo size={18} className="text-indigo-500" />
          <span className="text-sm text-white">{stats.totalTasks} tasks</span>
        </div>
        <div className="w-px h-6 bg-slate-700" />
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-amber-500" />
          <span className="text-sm text-white">{stats.completedTasks} done</span>
        </div>
      </div>
    </header>
  )
}