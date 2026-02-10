// Chat Channels Component - Enhanced Visual Design
import { ChatMessage } from '@/lib/types';
import { Send, Users, MessageSquare, Sparkles, Clock, Bot, AlertTriangle } from 'lucide-react';
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
    { id: 'agent-chat' as Channel, title: 'Agent Chat', icon: Users, count: agent_chat.length, color: 'from-indigo-500 to-purple-500' },
    { id: 'agent-inputs' as Channel, title: 'Agent Inputs', icon: Sparkles, count: agent_inputs.length, color: 'from-amber-500 to-orange-500' },
  ];

  const currentMessages = activeChannel === 'agent-chat' ? agent_chat : agent_inputs;

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(activeChannel, message);
      setMessage('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Channel Tabs - Enhanced Design */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const isActive = activeChannel === channel.id;

          return (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-bold transition-all relative
                ${isActive
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <Icon size={16} />
              <span>{channel.title}</span>
              {channel.count > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-[10px] font-bold
                  ${isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-600'}
                `}>
                  {channel.count}
                </span>
              )}

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-transparent" />
              )}
            </button>
          );
        })}
      </div>

      {/* Messages - Enhanced Design */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
        {currentMessages.map((msg, idx) => (
          <ChatMessageBubble key={msg.id} message={msg} isLast={idx === currentMessages.length - 1} />
        ))}
        {currentMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
              <MessageSquare size={36} className="text-gray-300" />
            </div>
            <p className="font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation</p>
          </div>
        )}
      </div>

      {/* Input - Enhanced Design */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${activeChannel === 'agent-chat' ? 'agents' : 'input channel'}...`}
            className="
              flex-1 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl
              focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
              transition-all placeholder:text-gray-400
            "
          />
          <button
            onClick={handleSend}
            className="
              px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl
              shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30
              transition-all hover:-translate-y-0.5
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
  isLast?: boolean;
}

function ChatMessageBubble({ message, isLast }: ChatMessageBubbleProps) {
  const isSystem = message.from === 'Reshaa';
  const isUser = message.from === 'Rajpal';

  return (
    <div className={`
      flex gap-4 py-2 transition-all
      ${isUser ? 'flex-row-reverse' : ''}
      ${isSystem ? 'bg-indigo-50/50 -mx-3 px-3 py-3 rounded-2xl mx-2' : ''}
    `}>
      {/* Avatar - More Refined */}
      <div className={`
        w-11 h-11 rounded-2xl flex items-center justify-center 
        text-white font-bold flex-shrink-0 shadow-md
        ${isSystem
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-indigo-100'
          : isUser
            ? 'bg-gradient-to-br from-emerald-400 to-teal-500'
            : 'bg-gradient-to-br from-slate-600 to-slate-700'
        }
      `}>
        {message.from.charAt(0)}
      </div>

      <div className={`flex-1 min-w-0 ${isUser ? 'flex flex-col items-end' : ''}`}>
        {/* Header Row */}
        <div className={`
          flex items-center gap-2 mb-1.5
          ${isUser ? 'flex-row-reverse' : ''}
        `}>
          <div className="flex items-center gap-2">
            <span className={`
              font-bold text-base
              ${isSystem ? 'text-indigo-700' : isUser ? 'text-emerald-700' : 'text-slate-900'}
            `}>
              {message.from}
            </span>
            {message.fromRole && (
              <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded-full font-medium">
                {message.fromRole}
              </span>
            )}
            {message.priority === 'urgent' && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-700">
                <AlertTriangle size={10} className="mr-1" />
                Urgent
              </span>
            )}
          </div>
          <time className="text-xs text-slate-400 flex items-center gap-1">
            <Clock size={10} />
            {formatTime(message.timestamp)}
          </time>
        </div>

        {/* Message Content - Improved Styling */}
        <div className={`
          rounded-2xl px-4 py-3 text-sm leading-relaxed
          shadow-sm max-w-md
          ${isUser
            ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-br-none'
            : isSystem
              ? 'bg-white border-2 border-indigo-100 rounded-bl-none shadow-md'
              : 'bg-white border border-slate-200 rounded-bl-none'
          }
        `}>
          <p className={isUser ? 'text-white/95' : 'text-slate-700 font-medium'}>
            {message.content}
          </p>
        </div>

        {/* Mentions */}
        {message.mentions && message.mentions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.mentions.map((mention) => (
              <span
                key={mention}
                className="
                  inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold
                  bg-indigo-100 text-indigo-700
                "
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
