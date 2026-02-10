// Chat Channels Component - Clean, Modern Design
import { ChatMessage } from '@/lib/types';
import { Send, Users, MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ChatChannelsProps {
  agent_chat: ChatMessage[];
  agent_inputs: ChatMessage[];
  onSendMessage?: (channel: string, message: string) => void;
}

type Channel = 'agent-chat' | 'agent-inputs';

export default function ChatChannels({ agent_chat, agent_inputs, onSendMessage }: ChatChannelsProps) {
  const [activeChannel, setActiveChannel] = useState<Channel>('agent-chat');
  const [message, setMessage] = useState('');

  const channels = [
    { id: 'agent-chat' as Channel, title: 'Agent Chat', icon: Users, count: agent_chat.length },
    { id: 'agent-inputs' as Channel, title: 'Agent Inputs', icon: Sparkles, count: agent_inputs.length },
  ];

  const currentMessages = activeChannel === 'agent-chat' ? agent_chat : agent_inputs;

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(activeChannel, message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 h-full flex flex-col">
      {/* Channel Tabs - Simplified */}
      <div className="flex border-b border-slate-200">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isActive = activeChannel === channel.id;

          return (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all
                ${isActive
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100'
                }
              `}
            >
              <Icon size={16} />
              <span>{channel.title}</span>
              {channel.count > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-semibold
                  ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'}
                `}>
                  {channel.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Messages - Simplified Bubbles */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {currentMessages.map((msg, idx) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {currentMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <MessageSquare size={32} className="mb-2 opacity-50" />
            <p className="font-medium text-sm">No messages yet</p>
          </div>
        )}
      </div>

      {/* Input - Simplified */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="
              flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg
              focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10
              text-sm placeholder:text-slate-400
            "
          />
          <button
            onClick={handleSend}
            className="
              px-4 py-2.5 bg-indigo-600 text-white rounded-lg
              hover:bg-indigo-700 transition-colors
            "
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isSystem = message.from === 'Reshaa';
  const isUser = message.from === 'Rajpal';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar - Simpler Design */}
      <div className={`
        w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm
        shrink-0
        ${isSystem
          ? 'bg-indigo-600'
          : isUser
            ? 'bg-emerald-600'
            : 'bg-slate-500'
        }
      `}>
        {message.from.charAt(0)}
      </div>

      <div className={`flex-1 max-w-[70%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        {/* Header */}
        <div className={`flex items-center gap-2 mb-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className={`text-sm font-semibold ${isSystem ? 'text-indigo-700' : 'text-slate-900'}`}>
            {message.from}
          </span>
          {message.fromRole && (
            <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded-full">
              {message.fromRole}
            </span>
          )}
          <time className="text-xs text-slate-400">
            {formatTime(message.timestamp)}
          </time>
        </div>

        {/* Message Bubble - No Gradients */}
        <div className={`
          px-4 py-2.5 text-sm leading-relaxed
          ${isUser
            ? 'bg-indigo-600 text-white rounded-lg rounded-br-none'
            : 'bg-slate-100 text-slate-800 rounded-lg rounded-bl-none'
          }
        `}>
          <p>{message.content}</p>
        </div>

        {/* Mentions */}
        {message.mentions && message.mentions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.mentions.map((mention) => (
              <span
                key={mention}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700"
              >
                @{mention}
              </span>
            ))}
          </div>
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
  if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString();
}
