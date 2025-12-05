# StartupConnect 🚀

A full-featured platform for startup founders to find co-founders, connect with VCs, share ideas, and manage their startup journey.

![StartupConnect](https://img.shields.io/badge/React-18-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4.0-cyan) ![Vite](https://img.shields.io/badge/Vite-7.0-purple)

## Features

### 👥 Find Co-founders
- Browse profiles of potential co-founders
- Filter by skills, interests, experience, and availability
- Send connection requests and build your network
- Real-time messaging with connections

### 💰 Connect with VCs & Investors
- Discover investors based on investment focus and stage preferences
- View check sizes and portfolio companies
- Express interest and start conversations
- Build relationships with the right investors

### 💡 Startup Ideas Hub
- Post and share your startup ideas
- Get feedback through upvotes and comments
- Discover trending ideas from the community
- Find collaborators for your projects

### 🏢 Startup Management
- Create and showcase your startup profile
- Track milestones and roadmap
- Manage funding rounds and goals
- List open positions to attract talent
- Connect with interested VCs

### 💬 Communication
- Real-time messaging with connections
- Notification system for updates
- Connection request management

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd startup-connect
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Demo Accounts

The app comes pre-loaded with sample data. You can use these demo accounts:

| Email | Password | Role |
|-------|----------|------|
| sarah.chen@example.com | demo123 | Founder |
| alex.kumar@example.com | demo123 | Founder |
| maya.patel@example.com | demo123 | Founder |
| james.wilson@example.com | demo123 | VC |
| lisa.zhang@example.com | demo123 | VC |

Or click the "Founder Demo" or "VC Demo" buttons on the login page.

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **State**: React Context API
- **Storage**: localStorage (for demo purposes)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with navigation
├── context/            # React Context providers
│   └── DataContext.jsx # Global state management
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── FoundersPage.jsx
│   ├── VCsPage.jsx
│   ├── ProfilePage.jsx
│   ├── IdeasPage.jsx
│   ├── IdeaDetailPage.jsx
│   ├── NewIdeaPage.jsx
│   ├── StartupsPage.jsx
│   ├── StartupDetailPage.jsx
│   ├── NewStartupPage.jsx
│   ├── MessagesPage.jsx
│   └── NotificationsPage.jsx
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles & Tailwind
```

## Key Features Explained

### User Profiles
- **Founders**: Showcase skills, interests, experience, and what they're looking for
- **VCs**: Display firm, investment focus, check sizes, and portfolio

### Smart Matching
- Recommendations based on shared interests
- Filtering by multiple criteria
- Easy connection workflow

### Startup Management
- Complete startup profiles with team, milestones, and funding info
- Milestone tracking with status updates
- Open positions for hiring
- VC interest tracking

### Communication
- Direct messaging between connections
- Notification system for activity updates
- Connection request management

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Built with ❤️ for the startup community
