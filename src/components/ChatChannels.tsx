// Chat Channels Component
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Channel Tabs */}
      <div className="flex border-b border-gray-200">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium relative
                ${activeChannel === channel.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <Icon size={16} />
              {channel.title}
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {channel.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {currentMessages.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <MessageSquare size={40} className="mx-auto mb-2 opacity-50" />
            <p>No messages yet</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${activeChannel === 'agent-chat' ? 'agents' : 'input channel'}...`}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
        {message.from.charAt(0)}
      </div>
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900">{message.from}</span>
          <span className="text-xs text-gray-400">{message.fromRole}</span>
          <span className="text-xs text-gray-400 ml-auto">
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700">{message.content}</p>
        </div>

        {/* Mentions */}
        {message.mentions && message.mentions.length > 0 && (
          <div className="flex gap-1 mt-2">
            {message.mentions.map((mention) => (
              <span
                key={mention}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
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
  if (diff < 86400000) return d.toLocaleTimeString();
  return d.toLocaleDateString();
}
