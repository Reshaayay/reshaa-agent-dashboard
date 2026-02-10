'use client'

import { Bot, Layout, MessageSquare, Settings } from 'lucide-react'
import { Agent } from '@/lib/types'

interface SidebarProps {
  agents: Agent[]
}

export default function Sidebar({ agents }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-64 flex-col fixed left-0 top-0 h-full border-r border-slate-800 bg-[#0D1117] z-20">
      {/* Header */}
      <div className="h-14 flex items-center px-4 border-b border-slate-700">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">R</div>
        <span className="ml-2 text-white font-bold">Reshaa</span>
      </div>
      
      {/* Agent List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">{agent.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{agent.name}</p>
              <p className="text-xs text-gray-400 truncate">{agent.role}</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${
              agent.status === 'active' ? 'bg-emerald-500' :
              agent.status === 'busy' ? 'bg-amber-500' :
              'bg-gray-500'
            }`} />
          </div>
        ))}
      </div>
      
      {/* Footer Nav */}
      <nav className="border-t border-slate-700 p-2 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white">
          <Layout size={18} />
          <span className="text-sm">Overview</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white">
          <MessageSquare size={18} />
          <span className="text-sm">Channels</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white">
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </button>
      </nav>
    </aside>
  )
}
