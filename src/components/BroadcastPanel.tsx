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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Megaphone size={22} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Broadcast</h3>
              <p className="text-amber-100 text-xs font-medium">Send to all agents</p>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Message Input */}
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your broadcast message..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm resize-none transition-all"
            />
            {message && (
              <span className="absolute bottom-3 right-3 text-xs text-gray-400 font-medium">
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
                  "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                  priority === 'normal'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                Normal
              </button>
              <button
                onClick={() => setPriority('urgent')}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                  priority === 'urgent'
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md'
                    : 'bg-white text-rose-600 hover:bg-rose-50 border border-rose-200'
                )}
              >
                <Sparkles size={14} />
                Urgent
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={cn(
                "px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-semibold",
                priority === 'urgent'
                  ? "bg-gradient-to-r from-rose-600 to-red-600 text-white hover:from-rose-700 hover:to-red-700 shadow-lg shadow-rose-200"
                  : "bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-amber-200",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              )}
            >
              <Megaphone size={16} />
              Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Clock size={18} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">History</h3>
                <p className="text-xs text-gray-500">{broadcasts.length} sent</p>
              </div>
            </div>
            {broadcasts.length > 0 && (
              <Bell size={16} className="text-gray-400" />
            )}
          </div>
        </div>

        {/* Broadcast List */}
        <div className="divide-y divide-gray-100">
          {broadcasts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-3">
                <Megaphone size={28} className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-1">No broadcasts yet</h3>
              <p className="text-sm text-gray-500">Send your first broadcast above</p>
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
      "p-4 transition-all hover:bg-gray-50",
      isUrgent ? "bg-rose-50/50" : "bg-white"
    )}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
          isUrgent ? "bg-rose-100" : "bg-amber-100"
        )}>
          <Megaphone size={18} className={isUrgent ? "text-rose-600" : "text-amber-600"} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1.5">
            {isUrgent && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                <Sparkles size={10} />
                URGENT
              </span>
            )}
            <span className="text-xs font-semibold text-gray-400 ml-auto">
              {formatTime(broadcast.timestamp)}
            </span>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-800 font-medium mb-2 leading-relaxed">
            {broadcast.content}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Users size={12} />
            <span>Sent by <span className="font-semibold text-gray-700">{broadcast.createdBy}</span></span>
          </div>
        </div>

        {/* Delete */}
        {onDelete && (
          <button
            onClick={() => onDelete(broadcast.id)}
            className="text-gray-400 hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors flex-shrink-0"
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
