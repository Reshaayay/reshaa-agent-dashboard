// Reshaa Assistant Component - Enhanced Visual Design
import { ChatMessage } from '@/lib/types';
import { Send, Bot, Sparkles, Clock, User as UserIcon } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Enhanced Header with Gradient */}
      <div className="
        bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
        px-6 py-5 border-b border-indigo-200 shadow-lg
      ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="
              w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm 
              flex items-center justify-center border-2 border-white/30
              shadow-lg
            ">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Reshaa</h2>
              <p className="text-sm text-indigo-100 mt-0.5">AI Coordinator & Personal Assistant</p>
            </div>
          </div>
          <div className="
            flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm 
            rounded-full text-white text-sm font-semibold border border-white/30 shadow-md
          ">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            Online
          </div>
        </div>
      </div>

      {/* Messages - Enhanced Design */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
        {messages.map((msg, idx) => (
          <MessageBubble key={msg.id} message={msg} isReshaa={msg.from === 'Reshaa'} isLast={idx === messages.length - 1} />
        ))}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
              <Bot size={40} className="text-indigo-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Start chatting with Reshaa</h3>
            <p className="text-sm text-gray-500 text-center">
              Reshaa coordinates all agents and can help you manage tasks,<br/>
              review work, and make decisions.
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Enhanced Design */}
      <div className="px-6 py-5 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        {/* Priority Toggle - Larger and More Prominent */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setPriority('normal')}
            className={`
              flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all
              flex items-center justify-center gap-2
              ${priority === 'normal'
                ? 'bg-slate-800 text-white shadow-lg shadow-slate-300 ring-2 ring-slate-500/50'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300 shadow-sm'
              }
            `}
          >
            <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center">
              <UserIcon size={12} className="text-slate-600" />
            </div>
            Normal Priority
          </button>
          <button
            onClick={() => setPriority('urgent')}
            className={`
              flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2
              ${priority === 'urgent'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-300 ring-2 ring-red-500/50'
                : 'bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 shadow-sm'
              }
            `}
          >
            <Sparkles size={18} />
            Urgent
          </button>
        </div>

        {/* Title Input Toggle */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => setShowTitleInput(!showTitleInput)}
            className="
              text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100
            "
          >
            {showTitleInput ? 'Remove Title' : '+ Add Message Title'}
          </button>
        </div>

        {/* Title Input */}
        {showTitleInput && (
          <div className="mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Message title..."
              className="
                w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl
                focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
                transition-all placeholder:text-slate-400 font-semibold text-sm
              "
            />
          </div>
        )}

        {/* Message Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message to Reshaa..."
            className="
              flex-1 px-5 py-3.5 bg-white border-2 border-slate-200 rounded-xl
              focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
              transition-all placeholder:text-slate-400
            "
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="
              px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl
              font-bold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30
              hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-0.5
              transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
              flex items-center gap-2
            "
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
  isReshaa: boolean;
  isLast?: boolean;
}

function MessageBubble({ message, isReshaa, isLast }: MessageBubbleProps) {
  return (
    <div className={`flex gap-3 py-2 ${isReshaa ? '' : 'flex-row-reverse'}`}>
      {/* Avatar - More Prominent */}
      <div className={`
        w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md flex-shrink-0
        ${isReshaa
          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-indigo-100'
          : 'bg-gradient-to-br from-emerald-400 to-teal-500'
        }
      `}>
        {message.from.charAt(0)}
      </div>

      <div className={`flex-1 max-w-[75%] ${isReshaa ? '' : 'flex flex-col items-end'}`}>
        {/* Title */}
        {message.title && (
          <div className={`text-sm font-bold mb-1.5 ${isReshaa ? 'text-indigo-700' : 'text-emerald-700'}`}>
            {message.title}
          </div>
        )}

        {/* Priority Badge - Prominent */}
        {message.priority === 'urgent' && (
          <div className={`flex items-center gap-1.5 text-xs font-bold mb-2 ${isReshaa ? 'justify-start' : 'justify-end'}`}>
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full font-bold uppercase tracking-wide shadow-sm ${message.priority === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
              <Sparkles size={10} className="mr-1" />
              {message.priority === 'urgent' ? 'URGENT' : 'Normal'}
            </div>
          </div>
        )}

        {/* Content - Better Styling */}
        <div className={`
          rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
          ${isReshaa
            ? 'bg-gradient-to-br from-indigo-50 to-purple-50 text-slate-800 rounded-bl-none border border-indigo-100'
            : 'bg-gradient-to-br from-emerald-50 to-teal-50 text-slate-800 rounded-br-none border border-emerald-100'
          }
        `}>
          <p className="font-medium">{message.content}</p>
        </div>

        {/* Timestamp - More Visible */}
        <div className={`mt-2 text-xs text-slate-400 flex items-center gap-1.5 font-medium ${isReshaa ? 'justify-start' : 'justify-end'}`}>
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
