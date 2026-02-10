// Reshaa Assistant Component - Direct Chat with Main Coordinator
import { ChatMessage } from '@/lib/types';
import { Send, Bot, Sparkles, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ReshaAssistantProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string, title?: string, priority?: 'normal' | 'urgent') => void;
}

export default function ReshaAssistant({ messages, onSendMessage }: ReshaAssistantProps) {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage?.(message, title || undefined, priority);
      setMessage('');
      setTitle('');
      setShowTitleInput(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">Reshaa</h2>
            <p className="text-sm text-gray-500">Main Coordinator & Personal Assistant</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isReshaa={msg.from === 'Reshaa'} />
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Start chatting with Reshaa</h3>
            <p className="text-sm text-gray-500">
              Reshaa coordinates all agents and can help you manage tasks, review work, and make decisions.
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        {/* Priority Toggle */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setPriority('normal')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              priority === 'normal'
                ? 'bg-gray-700 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setPriority('urgent')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              priority === 'urgent'
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-600 hover:bg-red-50'
            }`}
          >
            <Sparkles size={14} />
            Urgent
          </button>
          <div className="ml-auto">
            <button
              onClick={() => setShowTitleInput(!showTitleInput)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {showTitleInput ? 'Remove Title' : '+ Add Title'}
            </button>
          </div>
        </div>

        {/* Title Input */}
        {showTitleInput && (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Message title..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message to Reshaa..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
  isReshaa: boolean;
}

function MessageBubble({ message, isReshaa }: MessageBubbleProps) {
  return (
    <div className={`flex gap-3 ${isReshaa ? '' : 'flex-row-reverse'}`}>
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0
        ${isReshaa ? 'bg-gradient-to-br from-indigo-600 to-purple-700' : 'bg-gray-400'}
      `}>
        {message.from.charAt(0)}
      </div>
      <div className={`flex-1 max-w-[70%] ${isReshaa ? '' : 'text-right'}`}>
        {/* Title */}
        {message.title && (
          <div className={`text-sm font-medium mb-1 ${isReshaa ? 'text-indigo-600' : 'text-gray-700'}`}>
            {message.title}
          </div>
        )}

        {/* Priority Badge */}
        {message.priority === 'urgent' && (
          <div className={`flex items-center gap-1 text-xs font-medium mb-1 ${isReshaa ? 'justify-start' : 'justify-end'}`}>
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${message.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
              <Sparkles size={10} />
              <span className="ml-1">{message.priority === 'urgent' ? 'URGENT' : 'Normal'}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`
          rounded-lg p-3 text-sm
          ${isReshaa
            ? 'bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800'
            : 'bg-gray-100 text-gray-800'
          }
        `}>
          <p>{message.content}</p>
        </div>

        {/* Timestamp */}
        <div className={`mt-1 text-xs text-gray-400 flex items-center gap-1 ${isReshaa ? 'justify-start' : 'justify-end'}`}>
          <Clock size={10} />
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}

function formatTime(date: string): string {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
