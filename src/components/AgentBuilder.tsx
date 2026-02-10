// Agent Builder Component - Create new agents
import { Plus, X, Sparkles, Settings, Bot, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AgentBuilderProps {
  onCreateAgent?: (agent: {
    name: string;
    role: string;
    capabilities: string[];
    task: string;
  }) => void;
}

const predefinedRoles = [
  { role: 'Frontend Engineer', capabilities: ['React', 'Vue', 'Tailwind CSS', 'TypeScript'], icon: '🎨', color: 'indigo' },
  { role: 'Backend Engineer', capabilities: ['Node.js', 'Python', 'API', 'Database'], icon: '⚙️', color: 'purple' },
  { role: 'Mobile Developer', capabilities: ['React Native', 'Flutter', 'iOS', 'Android'], icon: '📱', color: 'sky' },
  { role: 'UI/UX Designer', capabilities: ['Figma', 'Design Systems', 'Prototyping'], icon: '✨', color: 'pink' },
  { role: 'QA Engineer', capabilities: ['Testing', 'Cypress', 'Jest', 'Code Review'], icon: '🔍', color: 'emerald' },
  { role: 'DevOps Engineer', capabilities: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'], icon: '🚀', color: 'amber' },
  { role: 'Research Agent', capabilities: ['Research', 'Documentation', 'Analysis'], icon: '📚', color: 'cyan' },
  { role: 'Product Manager', capabilities: ['Planning', 'Prioritization', 'Documentation'], icon: '📋', color: 'violet' },
];

const colorClasses = {
  indigo: 'from-indigo-500 to-indigo-600',
  purple: 'from-purple-500 to-purple-600',
  sky: 'from-sky-500 to-sky-600',
  pink: 'from-pink-500 to-pink-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-500 to-amber-600',
  cyan: 'from-cyan-500 to-cyan-600',
  violet: 'from-violet-500 to-violet-600',
};

export default function AgentBuilder({ onCreateAgent }: AgentBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [newCapability, setNewCapability] = useState('');
  const [task, setTask] = useState('');
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null);

  const handleSelectRole = (index: number) => {
    const predefined = predefinedRoles[index];
    setRole(predefined.role);
    setCapabilities([...predefined.capabilities]);
    setSelectedRoleIndex(index);
  };

  const handleAddCapability = () => {
    if (newCapability.trim() && !capabilities.includes(newCapability.trim())) {
      setCapabilities([...capabilities, newCapability.trim()]);
      setNewCapability('');
    }
  };

  const handleRemoveCapability = (cap: string) => {
    setCapabilities(capabilities.filter((c) => c !== cap));
  };

  const handleCreate = () => {
    if (name.trim() && role.trim() && capabilities.length > 0 && task.trim()) {
      onCreateAgent?.({
        name: name.trim(),
        role: role.trim(),
        capabilities,
        task: task.trim(),
      });
      // Reset form
      setName('');
      setRole('');
      setCapabilities([]);
      setTask('');
      setNewCapability('');
      setSelectedRoleIndex(null);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full group py-4 px-5 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 hover:bg-indigo-50 hover:border-indigo-400 hover:border-solid transition-all duration-300"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
            <Plus size={20} className="text-gray-500 group-hover:text-indigo-600" />
          </div>
          <span className="font-semibold text-gray-500 group-hover:text-indigo-700 transition-colors">
            Add New Agent
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bot size={22} className="text-white" />
            </div>
            <div className="text-white">
              <h3 className="font-bold text-lg">Create New Agent</h3>
              <p className="text-indigo-100 text-xs font-medium">Add to your AI team</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Quick Start Roles */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-indigo-500" />
            Quick Start - Select Role
          </label>
          <div className="grid grid-cols-2 gap-2">
            {predefinedRoles.map((item, index) => {
              const isSelected = selectedRoleIndex === index;
              return (
                <button
                  key={item.role}
                  onClick={() => handleSelectRole(index)}
                  className={cn(
                    "px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left flex items-center justify-between",
                    isSelected
                      ? `bg-gradient-to-r ${colorClasses[item.color as keyof typeof colorClasses]} text-white shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  <span>{item.icon} {item.role}</span>
                  {isSelected && <Check size={16} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Agent Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., CodeMaster, DesignBot"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Role <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Frontend Engineer, QA Manager"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        {/* Capabilities */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Capabilities <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newCapability}
              onChange={(e) => setNewCapability(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCapability()}
              placeholder="Add a capability..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
            />
            <button
              onClick={handleAddCapability}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
          {capabilities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200"
                >
                  {cap}
                  <button
                    onClick={() => handleRemoveCapability(cap)}
                    className="hover:text-indigo-900 hover:bg-indigo-100 rounded p-0.5 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Initial Task */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Initial Task <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Describe the agent's first task or mission..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none transition-all"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim() || !role.trim() || capabilities.length === 0 || !task.trim()}
          className={cn(
            "w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-base shadow-lg",
            name.trim() && role.trim() && capabilities.length > 0 && task.trim()
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <Sparkles size={20} />
          Create Agent
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
