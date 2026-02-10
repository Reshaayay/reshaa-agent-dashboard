// Task Board Component - Enhanced Visual Design
import { Task, TaskStatus } from '@/lib/types';
import { Plus, AlertTriangle, CheckCircle2, Clock, MoreVertical, User } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

const columns: { status: TaskStatus; title: string; icon: any; color: string }[] = [
  { status: 'assigned', title: 'Assigned', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  { status: 'in-progress', title: 'In Progress', icon: AlertTriangle, color: 'from-amber-500 to-orange-500' },
  { status: 'completed', title: 'Done', icon: CheckCircle2, color: 'from-emerald-500 to-green-500' },
  { status: 'needs-review', title: 'Needs Review', icon: AlertTriangle, color: 'from-purple-500 to-pink-500' },
];

export default function TaskBoard({ tasks, onUpdateTask }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {columns.map((column) => {
        const ColumnIcon = column.icon;
        const columnTasks = tasks.filter((t) => t.status === column.status);

        return (
          <div key={column.status} className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-md">
            {/* Enhanced Column Header */}
            <div className="bg-white px-5 py-4 border-b-2 border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${column.color} shadow-lg`}>
                    <ColumnIcon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{column.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {columnTasks.length} task{columnTasks.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Task Count Badge */}
                {columnTasks.length > 0 && (
                  <div className={`
                    px-3 py-1.5 rounded-full text-sm font-bold shadow-sm
                    ${columnTasks.length > 5
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                    }
                  `}>
                    {columnTasks.length}
                  </div>
                )}

                <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Task Cards */}
            <div className="p-4 space-y-3 min-h-[400px]">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateTask={onUpdateTask} />
              ))}
              {columnTasks.length === 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <ColumnIcon size={28} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No tasks yet</p>
                  <p className="text-sm text-gray-400 mt-1">Click + to add a task</p>
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
      relative group bg-white rounded-xl p-5 
      transition-all duration-300 cursor-pointer overflow-hidden
      ${isUrgent
        ? 'shadow-lg shadow-red-500/10 border-2 border-red-300 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/15'
        : 'shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md'
      }
      hover:-translate-y-1
    `}>
      {/* Urgent Banner */}
      {isUrgent && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
      )}

      {/* Priority Badge */}
      {isUrgent && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold uppercase tracking-wide shadow-sm">
            <AlertTriangle size={10} />
            Urgent
          </div>
        </div>
      )}

      {/* Task Content */}
      <div className={isUrgent ? 'pr-20' : ''}>
        {/* Title */}
        <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug line-clamp-2">
          {task.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
          {task.description}
        </p>

        {/* Assignment Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
              {task.assignedTo.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-700">{task.assignedTo}</span>
              <span className="text-[10px] text-gray-400">Assigned</span>
            </div>
          </div>

          <time className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={10} />
            {formatTimeAgo(task.updatedAt)}
          </time>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
            {task.tags.map((tag, idx) => (
              <span
                key={tag}
                className={`
                  px-2.5 py-1 rounded-lg text-xs font-semibold
                  ${idx === 0
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }
                  transition-colors cursor-default
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Action */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-gray-100 hover:bg-indigo-100 hover:text-indigo-600 rounded-lg transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>
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
