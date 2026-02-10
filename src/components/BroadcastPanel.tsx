// Broadcast Panel Component - Send messages to all agents
import { BroadcastMessage, MessagePriority } from '@/lib/types';
import { Megaphone, Send, Sparkles, Users, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Megaphone size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Broadcast to All Agents</h3>
            <p className="text-sm text-gray-500">Send important messages to the entire team</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Message Input */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your broadcast message..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          />

          {/* Priority Toggle & Send */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPriority('normal')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  priority === 'normal'
                    ? 'bg-gray-700 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setPriority('urgent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  priority === 'urgent'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-red-600 hover:bg-red-50 border border-red-200'
                }`}
              >
                <Sparkles size={14} />
                Urgent
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Megaphone size={16} />
              Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Broadcast History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={18} />
          Broadcast History
        </h3>

        <div className="space-y-3">
          {broadcasts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Megaphone size={40} className="mx-auto mb-2 opacity-50" />
              <p>No broadcasts sent yet</p>
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
  return (
    <div className={`
      rounded-lg p-4 border transition-all
      ${broadcast.priority === 'urgent'
        ? 'bg-red-50 border-red-200'
        : 'bg-gray-50 border-gray-200'
      }
    `}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Megaphone size={16} className="text-amber-600" />
          {broadcast.priority === 'urgent' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
              <Sparkles size={10} className="mr-1" />
              URGENT
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {formatTime(broadcast.timestamp)}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(broadcast.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-700">{broadcast.content}</p>

      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users size={12} />
          <span>Sent to all agents by {broadcast.createdBy}</span>
        </div>
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
