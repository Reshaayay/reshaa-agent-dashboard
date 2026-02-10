// Broadcast Panel Component - Send messages to all agents
import { BroadcastMessage, MessagePriority } from '@/lib/types';
import { Megaphone, Send, Sparkles, Users, Clock, Trash2, Bell } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BroadcastPanelProps {
  broadcasts: BroadcastMessage[];
  onSendBroadcast?: (content: string, priority: MessagePriority) => void;
  onDeleteBroadcast?: (id: string) => void;
}

export default function BroadcastPanel({ broadcasts, onSendBroadcast, onDeleteBroadcast }: BroadcastPanelProps) {
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<MessagePriority>('normal');

  const handleSend = () => {
    if (message.trim()) {
      onSendBroadcast?.(message, priority);
      setMessage('');
      setPriority('normal');
    }
  };

  return (
    <div className="space-y-4">
      {/* Send Broadcast Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Megaphone size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Broadcast</h3>
              <p className="text-xs text-slate-500">Send to all agents</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Message Input */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your broadcast message..."
              rows={3}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 text-sm resize-none transition-all"
            />
            {message && (
              <span className="absolute bottom-2 right-2 text-xs text-slate-400 font-medium">
                {message.length} chars
              </span>
            )}
          </div>

          {/* Priority & Send */}
          <div className="flex items-center justify-between">
            {/* Priority Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPriority('normal')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all",
                  priority === 'normal'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                Normal
              </button>
              <button
                onClick={() => setPriority('urgent')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1",
                  priority === 'urgent'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-rose-600 hover:bg-rose-50 border border-rose-200'
                )}
              >
                <Sparkles size={12} />
                Urgent
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={cn(
                "px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 font-semibold text-sm",
                priority === 'urgent'
                  ? "bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:from-rose-700 hover:to-rose-800"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500"
              )}
            >
              <Megaphone size={14} />
              Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
                <Clock size={16} className="text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">History</h3>
                <p className="text-xs text-slate-500">{broadcasts.length} sent</p>
              </div>
            </div>
            {broadcasts.length > 0 && (
              <Bell size={14} className="text-slate-400" />
            )}
          </div>
        </div>

        {/* Broadcast List */}
        <div className="divide-y divide-slate-100">
          {broadcasts.length === 0 ? (
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-2">
                <Megaphone size={20} className="text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-1">No broadcasts yet</h3>
              <p className="text-xs text-slate-500">Send your first broadcast above</p>
            </div>
          ) : (
            broadcasts.map((broadcast) => (
              <BroadcastItem
                key={broadcast.id}
                broadcast={broadcast}
                onDelete={onDeleteBroadcast}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface BroadcastItemProps {
  broadcast: BroadcastMessage;
  onDelete?: (id: string) => void;
}

function BroadcastItem({ broadcast, onDelete }: BroadcastItemProps) {
  const isUrgent = broadcast.priority === 'urgent';

  return (
    <div className={cn(
      "p-4 transition-all hover:bg-slate-50",
      isUrgent ? "bg-rose-50/30" : "bg-white"
    )}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          isUrgent ? "bg-rose-100" : "bg-slate-100"
        )}>
          <Megaphone size={16} className={isUrgent ? "text-rose-600" : "text-slate-600"} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            {isUrgent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-700">
                <Sparkles size={10} />
                URGENT
              </span>
            )}
            <span className="text-xs font-medium text-slate-400 ml-auto">
              {formatTime(broadcast.timestamp)}
            </span>
          </div>

          {/* Message */}
          <p className="text-sm text-slate-800 font-medium mb-2 leading-relaxed">
            {broadcast.content}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Users size={12} />
            <span>Sent by <span className="font-semibold text-slate-700">{broadcast.createdBy}</span></span>
          </div>
        </div>

        {/* Delete */}
        {onDelete && (
          <button
            onClick={() => onDelete(broadcast.id)}
            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded transition-colors flex-shrink-0"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function formatTime(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return d.toLocaleDateString();
}
