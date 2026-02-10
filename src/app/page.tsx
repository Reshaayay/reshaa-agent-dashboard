'use client'

import { useEffect } from 'react'
import { useDashboardStore } from '@/lib/store'
import { Task, Agent } from '@/lib/types'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import TaskBoard from '@/components/TaskBoard'

export default function Dashboard() {
  const {
    agents,
    setAgents,
    tasks,
    setTasks,
  } = useDashboardStore()

  useEffect(() => {
    // Mock data
    const mockAgents: Agent[] = [
      { id: '1', name: 'Nexa', role: 'Frontend Developer', status: 'active', tasksAssigned: 3, lastActive: new Date().toISOString(), capabilities: ['React', 'Next.js', 'Tailwind'] },
      { id: '2', name: 'CodeX', role: 'Backend Developer', status: 'active', tasksAssigned: 2, lastActive: new Date().toISOString(), capabilities: ['Node.js', 'Python', 'API'] },
      { id: '3', name: 'DesignPro', role: 'UI/UX Designer', status: 'busy', tasksAssigned: 1, lastActive: new Date().toISOString(), capabilities: ['Figma', 'Design Systems'] },
    ]
    
    const mockTasks: Task[] = [
      { id: 't1', title: 'Implement dark theme', description: 'Apply dark mode colors to all components', assignedTo: 'agent-1', status: 'in-progress', priority: 'normal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), tags: ['design', 'theme'] },
      { id: 't2', title: 'Create sidebar component', description: 'Build left sidebar with agent list', assignedTo: 'agent-1', status: 'completed', priority: 'normal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), tags: ['components'] },
      { id: 't3', title: 'Mobile responsive design', description: 'Ensure all components work on mobile', assignedTo: 'agent-2', status: 'assigned', priority: 'normal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), tags: ['responsive'] },
      { id: 't4', title: 'Deploy to Vercel', description: 'Build and deploy Mission Control dashboard', assignedTo: 'agent-3', status: 'needs-review', priority: 'normal', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), tags: ['deployment'] },
    ]

    setAgents(mockAgents)
    setTasks(mockTasks)
  }, [setAgents, setTasks])

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Sidebar agents={agents} />
      <div className="md:ml-64 min-h-screen flex flex-col">
        <TopBar stats={useDashboardStore.getState().stats} />
        <main className="flex-1 p-6">
          <TaskBoard tasks={tasks} />
        </main>
      </div>
    </div>
  )
}
