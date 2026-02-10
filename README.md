# 🤖 Reshaa Agent Dashboard

> AI Development Team Command Center - Manage, monitor, and collaborate with your multi-agent development ecosystem.

## 🚀 Features

### 📊 Real-time Monitoring
- **Agent Status Cards** - View all agents with live status (Active/Busy/Idle/Offline)
- **Task Counts** - See how many tasks each agent is working on
- **Last Activity** - Track when each agent was last active
- **Capabilities Display** - See each agent's skills and expertise

### 📋 Task Management
- **Kanban Board** with 4 columns:
  - 🔵 Assigned
  - 🟡 In Progress
  - 🟢 Done
  - 🟣 Needs Review
- **Priority Tags** - Normal and Urgent task priority
- **Task Dependencies** - Track related tasks
- **Agent Assignment** - See who's working on what

### 💬 Communication Channels
- **Agent Chat** - Real-time chat where agents communicate with each other
- **Agent Inputs** - Channel where agents provide their inputs and recommendations
- **Direct Reshaa Chat** - Personal assistant for project owner
- **Broadcast System** - Send messages to all agents at once
- **Message Priority** - Normal vs Urgent messages
- **Message Titles** - Add context to your messages

### 🤖 Reshaa - Your Personal AI Assistant
- Direct chat with the main coordinator
- Handles urgent messages immediately
- Coordinates between agents
- Reviews work that needs your approval
- Provides team summaries

### 🎯 Task Assignment & Tracking
- Create and assign tasks to agents
- Track progress through Kanban board
- See completed tasks
- Review pending items
- Agent can tag each other in chat to assign work

### 📢 Broadcast System
- Send messages to all agents
- Set priority (Normal/Urgent)
- View broadcast history
- Track who sent broadcasts

### 🏗️ Agent Builder
- Create new agents with:
  - Custom name
  - Role (Frontend, Backend, UI/UX, QA, etc.)
  - Capabilities/Skills
  - Initial task
- Pre-defined roles for quick setup
- Auto-assign initial task

### 📈 Dashboard Statistics
- Active agents count
- Total tasks
- In-progress tasks
- Completed tasks
- Tasks needing review
- Urgent items

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **API Integration**: OpenClaw Gateway (planned)
- **Real-time**: Socket.IO (planned)
- **Charts**: Recharts (planned)

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/Reshaayay/reshaa-agent-dashboard.git
cd reshaa-agent-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
reshaa-agent-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main dashboard page
│   │   ├── globals.css         # Global styles
│   │   └── types.ts            # Type exports
│   ├── components/
│   │   ├── AgentStatusCard.tsx # Individual agent card
│   │   ├── TaskBoard.tsx       # Kanban task board
│   │   ├── ChatChannels.tsx    # Agent chat & inputs
│   │   ├── ReshaAssistant.tsx  # Direct Reshaa chat
│   │   ├── BroadcastPanel.tsx  # Broadcast system
│   │   ├── AgentBuilder.tsx    # Create new agents
│   │   └── StatsCards.tsx      # Dashboard statistics
│   └── lib/
│       ├── types.ts            # TypeScript interfaces
│       ├── store.ts            # Zustand state store
│       └── gateway.ts          # API integration layer
├── public/                     # Static assets
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
└── next.config.ts             # Next.js config
```

## 🔌 Gateway Integration

The dashboard is designed to integrate with the OpenClaw Gateway for:

- **Real-time agent status** via `/api/v1/sessions/list`
- **Agent communication** via `/api/v1/sessions/send`
- **Spawning new agents** via `/api/v1/sessions/spawn`
- **Session history** via `/api/v1/sessions/history`

*Mock data is currently used for development and will be replaced with real API calls.*

## 🎨 Customization

### Agent Roles & Capabilities
Edit `src/components/AgentBuilder.tsx` to add predefined agent roles and capabilities.

### Dashboard Colors
Modify Tailwind classes in components to match your brand colors.

### Gateway URL
Set `NEXT_PUBLIC_GATEWAY_URL` in `.env.local`:

```env
NEXT_PUBLIC_GATEWAY_URL=http://your-gateway-url:8080
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the project:
```bash
npm run build
```

Deploy the `.next` folder to your preferred hosting platform.

## 🔒 Environment Variables

```env
NEXT_PUBLIC_GATEWAY_URL=http://localhost:8080
# Add other env variables as needed
```

## 📝 License

MIT License - Copyright © 2026 Reshaa Dev Team

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

---

**Built with ❤️ by Reshaa AI Development Team**
