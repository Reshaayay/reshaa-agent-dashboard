// Reshaa Assistant Component - Clean, Modern Design
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
    <div className="bg-white rounded-xl border border-slate-200 h-full flex flex-col">
      {/* Simplified Header - Clean, No Gradient */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Reshaa</h2>
              <p className="text-xs text-slate-500">AI Coordinator</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </div>
        </div>
      </div>

      {/* Messages - Simplified Bubbles */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, idx) => (
          <MessageBubble key={msg.id} message={msg} isReshaa={msg.from === 'Reshaa'} />
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Bot size={36} className="mb-2 opacity-50" />
            <p className="font-medium text-sm">Chat with Reshaa</p>
            <p className="text-xs mt-1">Your AI coordinator is ready to help</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Simplified Design */}
      <div className="p-4 border-t border-slate-200">
        {/* Priority Toggle - Smaller, Cleaner */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setPriority('normal')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all
              flex items-center justify-center gap-1.5
              ${priority === 'normal'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }
            `}
          >
            <span className="w-4 h-4 rounded bg-slate-300 flex items-center justify-center">
              <div className="w-2 h-0.5 bg-slate-500" />
            </span>
            Normal
          </button>
          <button
            onClick={() => setPriority('urgent')}
            className={`
              flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5
              ${priority === 'urgent'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              }
            `}
          >
            <Sparkles size={14} />
            Urgent
          </button>
        </div>

        {/* Title Toggle */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowTitleInput(!showTitleInput)}
            className="text-xs font-medium text-slate-500 hover:text-slate-700"
          >
            {showTitleInput ? 'Remove Title' : '+ Add Title'}
          </button>
        </div>

        {/* Title Input */}
        {showTitleInput && (
          <div className="mb-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Message title..."
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message to Reshaa..."
            className="
              flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-lg
              focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10
              text-sm placeholder:text-slate-400
            "
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="
              px-4 py-2.5 bg-indigo-600 text-white rounded-lg
              hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            "
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
    <div className={`flex gap-3 py-2 ${isReshaa ? '' : 'flex-row-reverse'}`}>
      {/* Avatar - Simplified */}
      <div className={`
        w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm
        shrink-0
        ${isReshaa ? 'bg-indigo-600' : 'bg-emerald-600'}
      `}>
        {message.from.charAt(0)}
      </div>

      <div className={`flex-1 max-w-[70%] ${isReshaa ? '' : 'flex flex-col items-end'}`}>
        {/* Title */}
        {message.title && (
          <div className={`text-sm font-semibold mb-1 ${isReshaa ? 'text-indigo-700' : 'text-emerald-700'}`}>
            {message.title}
          </div>
        )}

        {/* Priority Badge */}
        {message.priority === 'urgent' && (
          <div className={`flex items-center gap-1 text-xs font-bold mb-2 ${isReshaa ? 'justify-start' : 'justify-end'}`}>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 uppercase tracking-wide">
              Urgent
            </span>
          </div>
        )}

        {/* Content - No Gradient */}
        <div className={`
          px-4 py-2.5 text-sm leading-relaxed rounded-lg
          ${isReshaa
            ? 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-200'
            : 'bg-emerald-600 text-white rounded-br-none'
          }
        `}>
          <p>{message.content}</p>
        </div>

        {/* Timestamp */}
        <div className={`mt-1.5 text-xs text-slate-400 flex items-center gap-1 ${isReshaa ? 'justify-start' : 'justify-end'}`}>
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
