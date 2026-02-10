// Agent Builder Component - Create new agents
import { Plus, X, Sparkles, Settings, Bot } from 'lucide-react';
import { useState } from 'react';

interface AgentBuilderProps {
  onCreateAgent?: (agent: {
    name: string;
    role: string;
    capabilities: string[];
    task: string;
  }) => void;
}

const predefinedRoles = [
  { role: 'Frontend Engineer', capabilities: ['React', 'Vue', 'Tailwind CSS', 'TypeScript'] },
  { role: 'Backend Engineer', capabilities: ['Node.js', 'Python', 'API', 'Database'] },
  { role: 'Mobile Developer', capabilities: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { role: 'UI/UX Designer', capabilities: ['Figma', 'Design Systems', 'Prototyping'] },
  { role: 'QA Engineer', capabilities: ['Testing', 'Cypress', 'Jest', 'Code Review'] },
  { role: 'DevOps Engineer', capabilities: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'] },
  { role: 'Research Agent', capabilities: ['Research', 'Documentation', 'Analysis'] },
  { role: 'Product Manager', capabilities: ['Planning', 'Prioritization', 'Documentation'] },
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
        className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        Add New Agent
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Create New Agent</h3>
            <p className="text-sm text-gray-500">Add a new member to your AI development team</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Predefined Roles */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Start - Select Role</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {predefinedRoles.map((item, index) => (
            <button
              key={item.role}
              onClick={() => handleSelectRole(index)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                ${selectedRoleIndex === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {item.role}
            </button>
          ))}
        </div>
      </div>

      {/* Agent Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., CodeMaster, DesignBot"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Role */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Frontend Engineer, QA Manager"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Capabilities */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Capabilities *</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newCapability}
            onChange={(e) => setNewCapability(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCapability()}
            placeholder="Add a capability..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddCapability}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <span
              key={cap}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700"
            >
              {cap}
              <button
                onClick={() => handleRemoveCapability(cap)}
                className="hover:text-indigo-900"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Initial Task */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Initial Task *</label>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Describe the agent's first task or mission..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Create Button */}
      <button
        onClick={handleCreate}
        disabled={!name.trim() || !role.trim() || capabilities.length === 0 || !task.trim()}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
      >
        <Sparkles size={18} />
        Create Agent
      </button>
    </div>
  );
}
