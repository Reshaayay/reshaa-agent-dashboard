// Agent Builder Component - Create new agents
import { Plus, X, Sparkles, Settings, Bot, Check } from 'lucide-react';
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
  { role: 'Frontend Engineer', capabilities: ['React', 'Vue', 'Tailwind CSS', 'TypeScript'], icon: '🎨' },
  { role: 'Backend Engineer', capabilities: ['Node.js', 'Python', 'API', 'Database'], icon: '⚙️' },
  { role: 'Mobile Developer', capabilities: ['React Native', 'Flutter', 'iOS', 'Android'], icon: '📱' },
  { role: 'UI/UX Designer', capabilities: ['Figma', 'Design Systems', 'Prototyping'], icon: '✨' },
  { role: 'QA Engineer', capabilities: ['Testing', 'Cypress', 'Jest', 'Code Review'], icon: '🔍' },
  { role: 'DevOps Engineer', capabilities: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'], icon: '🚀' },
  { role: 'Research Agent', capabilities: ['Research', 'Documentation', 'Analysis'], icon: '📚' },
  { role: 'Product Manager', capabilities: ['Planning', 'Prioritization', 'Documentation'], icon: '📋' },
];

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
        className="w-full group py-3 px-4 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 hover:border-solid transition-all duration-200"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
            <Plus size={18} className="text-slate-500 group-hover:text-indigo-600" />
          </div>
          <span className="font-semibold text-slate-500 group-hover:text-indigo-700 transition-colors text-sm">
            Add New Agent
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Create New Agent</h3>
              <p className="text-xs text-slate-500">Add to your AI team</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Start Roles */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Sparkles size={14} className="text-indigo-600" />
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
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center justify-between",
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  )}
                >
                  <span className="text-xs">{item.icon} {item.role}</span>
                  {isSelected && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agent Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Agent Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., CodeMaster"
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 text-sm transition-all"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Role <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Frontend Engineer"
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 text-sm transition-all"
          />
        </div>

        {/* Capabilities */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Capabilities <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newCapability}
              onChange={(e) => setNewCapability(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCapability()}
              placeholder="Add a capability..."
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 text-sm transition-all"
            />
            <button
              onClick={handleAddCapability}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          {capabilities.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-700"
                >
                  {cap}
                  <button
                    onClick={() => handleRemoveCapability(cap)}
                    className="hover:text-indigo-900 hover:bg-indigo-200 rounded p-0.5 transition-colors"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Initial Task */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Initial Task <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Describe the agent's first task..."
            rows={3}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600 text-sm resize-none transition-all"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim() || !role.trim() || capabilities.length === 0 || !task.trim()}
          className={cn(
            "w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold text-sm",
            name.trim() && role.trim() && capabilities.length > 0 && task.trim()
              ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          <Sparkles size={16} />
          Create Agent
        </button>
      </div>
    </div>
  );
}
