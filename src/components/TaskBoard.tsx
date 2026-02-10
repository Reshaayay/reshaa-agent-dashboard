import { Task, TaskStatus } from '@/lib/types'
import { Plus, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'

interface TaskBoardProps {
  tasks: Task[]
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void
}

const columns: { status: TaskStatus; title: string; icon: any; color: string }[] = [
  { status: 'assigned', title: 'Assigned', icon: Clock, color: 'text-gray-400' },
  { status: 'in-progress', title: 'In Progress', icon: AlertTriangle, color: 'text-amber-400' },
  { status: 'completed', title: 'Done', icon: CheckCircle2, color: 'text-emerald-400' },
  { status: 'needs-review', title: 'Review', icon: AlertTriangle, color: 'text-purple-400' },
]

export default function TaskBoard({ tasks, onUpdateTask }: TaskBoardProps) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Mission Board</h2>
        <p className="text-sm text-gray-400">Track and manage agent tasks</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const ColumnIcon = column.icon
          const columnTasks = tasks.filter((t) => t.status === column.status)

          return (
            <div key={column.status} className="flex flex-col h-full rounded-xl bg-[#151923] border border-slate-800">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ColumnIcon size={16} className={column.color} />
                  <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                  <span className="text-xs text-gray-500">({columnTasks.length})</span>
                </div>
              </div>
              <div className="flex-1 p-3 space-y-3 min-h-[400px]">
                {columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {columnTasks.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-4">No tasks</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const isUrgent = task.priority === 'urgent'

  return (
    <div className={`p-3 rounded-lg border ${
      isUrgent ? 'border-rose-500/50 bg-rose-500/10' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
    } transition-all cursor-pointer`}>
      {isUrgent && (
        <div className="flex items-center gap-1 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-xs font-bold text-rose-400 uppercase">Urgent</span>
        </div>
      )}
      <h4 className="text-sm font-semibold text-white mb-1">{task.title}</h4>
      <p className="text-xs text-gray-400 mb-2 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
            {task.assignedTo.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-400">{task.assignedTo}</span>
        </div>
      </div>
    </div>
  )
}
