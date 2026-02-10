// Task Board Component - Clean, Modern Design
import { Task, TaskStatus } from '@/lib/types';
import { Plus, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

const columns: { status: TaskStatus; title: string; icon: any; color: string }[] = [
  { status: 'assigned', title: 'Assigned', icon: Clock, color: 'text-blue-600' },
  { status: 'in-progress', title: 'In Progress', icon: AlertTriangle, color: 'text-amber-600' },
  { status: 'completed', title: 'Done', icon: CheckCircle2, color: 'text-emerald-600' },
  { status: 'needs-review', title: 'Needs Review', icon: AlertTriangle, color: 'text-purple-600' },
];

export default function TaskBoard({ tasks, onUpdateTask }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {columns.map((column) => {
        const ColumnIcon = column.icon;
        const columnTasks = tasks.filter((t) => t.status === column.status);

        return (
          <div key={column.status} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            {/* Simplified Column Header */}
            <div className="bg-white px-4 py-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ColumnIcon size={18} className={column.color} />
                  <h3 className="text-sm font-semibold text-slate-800">{column.title}</h3>
                  <span className="text-xs text-slate-500">({columnTasks.length})</span>
                </div>

                {columnTasks.length > 0 && (
                  <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                    <Plus size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Task Cards */}
            <div className="p-3 space-y-3 min-h-[400px]">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateTask={onUpdateTask} />
              ))}
              {columnTasks.length === 0 && (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                  <p className="text-slate-500 font-medium text-sm">No tasks yet</p>
                  <p className="text-xs text-slate-400 mt-1">Click + to add a task</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

function TaskCard({ task, onUpdateTask }: TaskCardProps) {
  const isUrgent = task.priority === 'urgent';

  return (
    <div className={`
      bg-white rounded-lg p-4 border
      transition-all duration-200 cursor-pointer
      ${isUrgent
        ? 'border-rose-300 bg-rose-50/30'
        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }
    `}>
      {/* Urgent Banner */}
      {isUrgent && (
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-xs font-bold uppercase text-rose-600 tracking-wide">Urgent</span>
        </div>
      )}

      {/* Title */}
      <h4 className="text-sm font-semibold text-slate-900 mb-1.5 line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Assignment Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium">
            {task.assignedTo.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-medium text-slate-700">{task.assignedTo}</span>
        </div>

        <time className="text-xs text-slate-400">
          {formatTimeAgo(task.updatedAt)}
        </time>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
          {task.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="text-xs text-slate-400">+{task.tags.length - 2}</span>
          )}
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return new Date(date).toLocaleDateString();
}
