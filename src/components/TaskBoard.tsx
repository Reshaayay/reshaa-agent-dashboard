// Task Board Component with Kanban-style columns
import { Task, TaskStatus } from '@/lib/types';
import { Plus, AlertTriangle, CheckCircle2, Clock, MoreVertical } from 'lucide-react';

interface TaskBoardProps {
  tasks: Task[];
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
}

const columns: { status: TaskStatus; title: string; icon: any; color: string }[] = [
  { status: 'assigned', title: 'Assigned', icon: Clock, color: 'bg-blue-500' },
  { status: 'in-progress', title: 'In Progress', icon: AlertTriangle, color: 'bg-yellow-500' },
  { status: 'completed', title: 'Done', icon: CheckCircle2, color: 'bg-green-500' },
  { status: 'needs-review', title: 'Needs Review', icon: AlertTriangle, color: 'bg-purple-500' },
];

export default function TaskBoard({ tasks, onUpdateTask }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const ColumnIcon = column.icon;
        const columnTasks = tasks.filter((t) => t.status === column.status);

        return (
          <div key={column.status} className="bg-gray-50 rounded-xl p-4 min-h-[400px]">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${column.color} flex items-center justify-center`}>
                  <ColumnIcon size={18} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Plus size={18} />
              </button>
            </div>

            {/* Task Cards */}
            <div className="space-y-3">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onUpdateTask={onUpdateTask} />
              ))}
              {columnTasks.length === 0 && (
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-400 text-sm">
                  No tasks
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
      bg-white rounded-lg p-4 shadow-sm border transition-all hover:shadow-md
      ${isUrgent ? 'border-red-300' : 'border-gray-200'}
    `}>
      {/* Urgent Badge */}
      {isUrgent && (
        <div className="flex items-center gap-1 text-red-600 text-xs font-medium mb-2">
          <AlertTriangle size={12} />
          <span>URGENT</span>
        </div>
      )}

      {/* Task Title */}
      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{task.title}</h4>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>

      {/* Task Details */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-xs">
            {task.assignedTo.charAt(0).toUpperCase()}
          </div>
          <span>Assigned to {task.assignedTo}</span>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">{formatTimeAgo(task.updatedAt)}</span>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={14} />
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
