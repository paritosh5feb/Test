import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DataContext = createContext();

// Sample data for initial population
const sampleUsers = [
  {
    id: '1',
    email: 'sarah.chen@example.com',
    password: 'demo123',
    name: 'Sarah Chen',
    role: 'founder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Serial entrepreneur with 10+ years in tech. Previously founded 2 startups (1 exit). Passionate about AI and sustainable technology.',
    skills: ['Product Strategy', 'Fundraising', 'Team Building', 'AI/ML'],
    interests: ['Artificial Intelligence', 'Climate Tech', 'SaaS'],
    experience: '10+ years',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/sarahchen',
    lookingFor: ['Technical Co-founder', 'CTO'],
    availability: 'Full-time',
    connections: ['2', '3', '4'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'alex.kumar@example.com',
    password: 'demo123',
    name: 'Alex Kumar',
    role: 'founder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Full-stack developer turned entrepreneur. Built and scaled systems handling millions of users. Looking to join an early-stage startup.',
    skills: ['Full-Stack Development', 'System Architecture', 'DevOps', 'React', 'Node.js'],
    interests: ['FinTech', 'Developer Tools', 'Web3'],
    experience: '8 years',
    location: 'New York, NY',
    linkedin: 'https://linkedin.com/in/alexkumar',
    lookingFor: ['Business Co-founder', 'CEO'],
    availability: 'Full-time',
    connections: ['1', '3'],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    email: 'maya.patel@example.com',
    password: 'demo123',
    name: 'Maya Patel',
    role: 'founder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    bio: 'Ex-Google product manager with deep experience in B2B SaaS. Stanford MBA. Looking for technical co-founders for my EdTech startup.',
    skills: ['Product Management', 'Go-to-Market', 'Analytics', 'User Research'],
    interests: ['EdTech', 'B2B SaaS', 'Productivity'],
    experience: '7 years',
    location: 'Austin, TX',
    linkedin: 'https://linkedin.com/in/mayapatel',
    lookingFor: ['Technical Co-founder'],
    availability: 'Full-time',
    connections: ['1', '2', '4'],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    email: 'james.wilson@example.com',
    password: 'demo123',
    name: 'James Wilson',
    role: 'vc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    bio: 'Partner at Horizon Ventures. Focused on early-stage investments in AI, Climate Tech, and Healthcare. Have backed 30+ companies including 3 unicorns.',
    firm: 'Horizon Ventures',
    investmentFocus: ['Artificial Intelligence', 'Climate Tech', 'Healthcare', 'Deep Tech'],
    checkSize: '$500K - $5M',
    stage: ['Pre-seed', 'Seed', 'Series A'],
    portfolio: ['TechCo', 'HealthAI', 'ClimateFirst'],
    location: 'Palo Alto, CA',
    linkedin: 'https://linkedin.com/in/jameswilsonvc',
    connections: ['1', '3'],
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    email: 'lisa.zhang@example.com',
    password: 'demo123',
    name: 'Lisa Zhang',
    role: 'vc',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    bio: 'Principal at NextGen Capital. Former founder (YC W18). Passionate about supporting first-time founders in B2B and Developer Tools.',
    firm: 'NextGen Capital',
    investmentFocus: ['B2B SaaS', 'Developer Tools', 'FinTech', 'Enterprise'],
    checkSize: '$250K - $2M',
    stage: ['Pre-seed', 'Seed'],
    portfolio: ['DevTools Inc', 'SaaSCo', 'FinanceApp'],
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/lisazhangvc',
    connections: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    email: 'david.okonkwo@example.com',
    password: 'demo123',
    name: 'David Okonkwo',
    role: 'founder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    bio: 'Blockchain engineer with 5 years experience. Previously at Coinbase. Looking to build the next generation of decentralized infrastructure.',
    skills: ['Blockchain', 'Smart Contracts', 'Solidity', 'Rust', 'System Design'],
    interests: ['Web3', 'DeFi', 'Infrastructure'],
    experience: '5 years',
    location: 'Miami, FL',
    linkedin: 'https://linkedin.com/in/davidokonkwo',
    lookingFor: ['Business Co-founder', 'Growth Lead'],
    availability: 'Full-time',
    connections: [],
    createdAt: new Date().toISOString()
  }
];

const sampleStartups = [
  {
    id: '1',
    name: 'EcoTrack',
    tagline: 'AI-powered carbon footprint tracking for enterprises',
    description: 'EcoTrack helps enterprises measure, track, and reduce their carbon footprint using AI and IoT sensors. Our platform provides real-time insights and actionable recommendations.',
    founders: ['1'],
    industry: 'Climate Tech',
    stage: 'Seed',
    fundingRaised: '$1.2M',
    fundingGoal: '$3M',
    team: [
      { userId: '1', role: 'CEO & Co-founder' }
    ],
    openRoles: ['CTO', 'Head of Engineering', 'Data Scientist'],
    milestones: [
      { title: 'MVP Launch', date: '2024-01', status: 'completed' },
      { title: 'First 10 Customers', date: '2024-03', status: 'completed' },
      { title: 'Seed Round', date: '2024-06', status: 'completed' },
      { title: 'Series A', date: '2025-06', status: 'planned' }
    ],
    pitch: 'https://pitch.com/ecotrack',
    website: 'https://ecotrack.io',
    interestedVCs: ['4'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'LearnFlow',
    tagline: 'Personalized learning paths powered by AI',
    description: 'LearnFlow creates personalized learning experiences for professionals. Our AI analyzes your goals, learning style, and schedule to create optimal learning paths.',
    founders: ['3'],
    industry: 'EdTech',
    stage: 'Pre-seed',
    fundingRaised: '$0',
    fundingGoal: '$500K',
    team: [
      { userId: '3', role: 'CEO & Founder' }
    ],
    openRoles: ['Technical Co-founder', 'Full-stack Developer'],
    milestones: [
      { title: 'Idea Validation', date: '2024-09', status: 'completed' },
      { title: 'MVP Development', date: '2024-12', status: 'in-progress' },
      { title: 'Beta Launch', date: '2025-02', status: 'planned' },
      { title: 'Pre-seed Round', date: '2025-04', status: 'planned' }
    ],
    pitch: '',
    website: '',
    interestedVCs: [],
    createdAt: new Date().toISOString()
  }
];

const sampleIdeas = [
  {
    id: '1',
    title: 'AI-Powered Legal Document Assistant',
    description: 'An AI tool that helps startups draft, review, and understand legal documents without expensive lawyers. Would use GPT-4 to analyze contracts and highlight potential issues.',
    author: '2',
    category: 'LegalTech',
    stage: 'Idea',
    upvotes: 24,
    upvotedBy: ['1', '3', '6'],
    comments: [
      { id: '1', userId: '1', text: 'Love this idea! Legal costs are a huge pain point for early-stage startups.', createdAt: new Date().toISOString() },
      { id: '2', userId: '3', text: 'Have you looked into the regulatory requirements for this? Happy to connect you with a lawyer friend.', createdAt: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Sustainable Packaging Marketplace',
    description: 'A B2B marketplace connecting businesses with sustainable packaging suppliers. Would include carbon impact scores and bulk ordering capabilities.',
    author: '3',
    category: 'Climate Tech',
    stage: 'Researching',
    upvotes: 18,
    upvotedBy: ['1', '4'],
    comments: [
      { id: '1', userId: '4', text: 'This is exactly the type of climate-focused B2B solution we look for. Would love to chat more.', createdAt: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Remote Team Culture Platform',
    description: 'A platform that helps remote teams build culture through virtual events, team rituals, and engagement tracking. Integrates with Slack and Teams.',
    author: '1',
    category: 'HR Tech',
    stage: 'Building MVP',
    upvotes: 31,
    upvotedBy: ['2', '3', '5', '6'],
    comments: [],
    createdAt: new Date().toISOString()
  }
];

const sampleMessages = [
  {
    id: '1',
    participants: ['1', '2'],
    messages: [
      { id: '1', senderId: '1', text: 'Hi Alex! I saw your profile and love your technical background. Would you be interested in chatting about a potential collaboration?', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: '2', senderId: '2', text: 'Hey Sarah! Thanks for reaching out. I\'d love to hear more about what you\'re working on. Your experience in AI sounds fascinating.', createdAt: new Date(Date.now() - 82800000).toISOString() },
      { id: '3', senderId: '1', text: 'Great! I\'m building EcoTrack - an AI-powered carbon footprint tracking platform. We\'re looking for a technical co-founder. Would you have time for a call this week?', createdAt: new Date(Date.now() - 79200000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 79200000).toISOString()
  },
  {
    id: '2',
    participants: ['1', '4'],
    messages: [
      { id: '1', senderId: '4', text: 'Hi Sarah, I came across EcoTrack and I\'m impressed by what you\'re building. Climate tech is a key focus area for us at Horizon Ventures.', createdAt: new Date(Date.now() - 172800000).toISOString() },
      { id: '2', senderId: '1', text: 'Thanks James! We\'re excited about the space too. We just closed our seed round but are starting to think about Series A.', createdAt: new Date(Date.now() - 169200000).toISOString() },
      { id: '3', senderId: '4', text: 'That\'s great timing. I\'d love to learn more about your traction and roadmap. Can you send over your deck?', createdAt: new Date(Date.now() - 165600000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 165600000).toISOString()
  }
];

const sampleNotifications = [
  {
    id: '1',
    userId: '1',
    type: 'connection_request',
    title: 'New Connection Request',
    message: 'David Okonkwo wants to connect with you',
    fromUserId: '6',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '1',
    type: 'idea_comment',
    title: 'New Comment on Your Idea',
    message: 'Someone commented on "Remote Team Culture Platform"',
    ideaId: '3',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

export function DataProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [startups, setStartups] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedUsers = localStorage.getItem('startup_connect_users');
        const savedStartups = localStorage.getItem('startup_connect_startups');
        const savedIdeas = localStorage.getItem('startup_connect_ideas');
        const savedConversations = localStorage.getItem('startup_connect_conversations');
        const savedNotifications = localStorage.getItem('startup_connect_notifications');
        const savedRequests = localStorage.getItem('startup_connect_requests');
        const savedCurrentUser = localStorage.getItem('startup_connect_current_user');

        setUsers(savedUsers ? JSON.parse(savedUsers) : sampleUsers);
        setStartups(savedStartups ? JSON.parse(savedStartups) : sampleStartups);
        setIdeas(savedIdeas ? JSON.parse(savedIdeas) : sampleIdeas);
        setConversations(savedConversations ? JSON.parse(savedConversations) : sampleMessages);
        setNotifications(savedNotifications ? JSON.parse(savedNotifications) : sampleNotifications);
        setConnectionRequests(savedRequests ? JSON.parse(savedRequests) : []);
        
        if (savedCurrentUser) {
          setCurrentUser(JSON.parse(savedCurrentUser));
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Initialize with sample data on error
        setUsers(sampleUsers);
        setStartups(sampleStartups);
        setIdeas(sampleIdeas);
        setConversations(sampleMessages);
        setNotifications(sampleNotifications);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('startup_connect_users', JSON.stringify(users));
      localStorage.setItem('startup_connect_startups', JSON.stringify(startups));
      localStorage.setItem('startup_connect_ideas', JSON.stringify(ideas));
      localStorage.setItem('startup_connect_conversations', JSON.stringify(conversations));
      localStorage.setItem('startup_connect_notifications', JSON.stringify(notifications));
      localStorage.setItem('startup_connect_requests', JSON.stringify(connectionRequests));
      if (currentUser) {
        localStorage.setItem('startup_connect_current_user', JSON.stringify(currentUser));
      }
    }
  }, [users, startups, ideas, conversations, notifications, connectionRequests, currentUser, isLoading]);

  // Auth functions
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('startup_connect_current_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('startup_connect_current_user');
  };

  const register = (userData) => {
    const exists = users.find(u => u.email === userData.email);
    if (exists) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser = {
      ...userData,
      id: uuidv4(),
      connections: [],
      createdAt: new Date().toISOString()
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const updateUser = (userId, updates) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => ({ ...prev, ...updates }));
    }
  };

  // Connection functions
  const sendConnectionRequest = (toUserId) => {
    const request = {
      id: uuidv4(),
      fromUserId: currentUser.id,
      toUserId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setConnectionRequests(prev => [...prev, request]);
    
    // Add notification
    addNotification({
      userId: toUserId,
      type: 'connection_request',
      title: 'New Connection Request',
      message: `${currentUser.name} wants to connect with you`,
      fromUserId: currentUser.id
    });
    
    return request;
  };

  const acceptConnectionRequest = (requestId) => {
    const request = connectionRequests.find(r => r.id === requestId);
    if (!request) return;

    setConnectionRequests(prev => prev.filter(r => r.id !== requestId));
    
    // Add connection to both users
    setUsers(prev => prev.map(u => {
      if (u.id === request.fromUserId) {
        return { ...u, connections: [...(u.connections || []), request.toUserId] };
      }
      if (u.id === request.toUserId) {
        return { ...u, connections: [...(u.connections || []), request.fromUserId] };
      }
      return u;
    }));

    // Update current user if they are involved
    if (currentUser.id === request.toUserId) {
      setCurrentUser(prev => ({
        ...prev,
        connections: [...(prev.connections || []), request.fromUserId]
      }));
    }

    // Notify the requester
    addNotification({
      userId: request.fromUserId,
      type: 'connection_accepted',
      title: 'Connection Accepted',
      message: `${currentUser.name} accepted your connection request`,
      fromUserId: currentUser.id
    });
  };

  const declineConnectionRequest = (requestId) => {
    setConnectionRequests(prev => prev.filter(r => r.id !== requestId));
  };

  // Startup functions
  const createStartup = (startupData) => {
    const newStartup = {
      ...startupData,
      id: uuidv4(),
      founders: [currentUser.id],
      team: [{ userId: currentUser.id, role: startupData.founderRole || 'Founder' }],
      interestedVCs: [],
      createdAt: new Date().toISOString()
    };
    setStartups(prev => [...prev, newStartup]);
    return newStartup;
  };

  const updateStartup = (startupId, updates) => {
    setStartups(prev => prev.map(s => s.id === startupId ? { ...s, ...updates } : s));
  };

  const expressInterest = (startupId) => {
    setStartups(prev => prev.map(s => {
      if (s.id === startupId && currentUser.role === 'vc') {
        const interestedVCs = s.interestedVCs || [];
        if (!interestedVCs.includes(currentUser.id)) {
          return { ...s, interestedVCs: [...interestedVCs, currentUser.id] };
        }
      }
      return s;
    }));
  };

  // Ideas functions
  const createIdea = (ideaData) => {
    const newIdea = {
      ...ideaData,
      id: uuidv4(),
      author: currentUser.id,
      upvotes: 0,
      upvotedBy: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    setIdeas(prev => [...prev, newIdea]);
    return newIdea;
  };

  const upvoteIdea = (ideaId) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        const upvotedBy = idea.upvotedBy || [];
        if (upvotedBy.includes(currentUser.id)) {
          return {
            ...idea,
            upvotes: idea.upvotes - 1,
            upvotedBy: upvotedBy.filter(id => id !== currentUser.id)
          };
        } else {
          return {
            ...idea,
            upvotes: idea.upvotes + 1,
            upvotedBy: [...upvotedBy, currentUser.id]
          };
        }
      }
      return idea;
    }));
  };

  const addComment = (ideaId, text) => {
    const comment = {
      id: uuidv4(),
      userId: currentUser.id,
      text,
      createdAt: new Date().toISOString()
    };
    
    setIdeas(prev => prev.map(idea => {
      if (idea.id === ideaId) {
        return { ...idea, comments: [...idea.comments, comment] };
      }
      return idea;
    }));

    // Notify idea author
    const idea = ideas.find(i => i.id === ideaId);
    if (idea && idea.author !== currentUser.id) {
      addNotification({
        userId: idea.author,
        type: 'idea_comment',
        title: 'New Comment on Your Idea',
        message: `${currentUser.name} commented on "${idea.title}"`,
        ideaId
      });
    }

    return comment;
  };

  // Messaging functions
  const startConversation = (participantId) => {
    const existing = conversations.find(c => 
      c.participants.includes(currentUser.id) && c.participants.includes(participantId)
    );
    
    if (existing) return existing;

    const newConversation = {
      id: uuidv4(),
      participants: [currentUser.id, participantId],
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setConversations(prev => [...prev, newConversation]);
    return newConversation;
  };

  const sendMessage = (conversationId, text) => {
    const message = {
      id: uuidv4(),
      senderId: currentUser.id,
      text,
      createdAt: new Date().toISOString()
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, message],
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    // Notify recipient
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      const recipientId = conversation.participants.find(p => p !== currentUser.id);
      addNotification({
        userId: recipientId,
        type: 'new_message',
        title: 'New Message',
        message: `${currentUser.name} sent you a message`,
        conversationId
      });
    }

    return message;
  };

  // Notification functions
  const addNotification = (notificationData) => {
    const notification = {
      ...notificationData,
      id: uuidv4(),
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
    return notification;
  };

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => 
      n.userId === currentUser?.id ? { ...n, read: true } : n
    ));
  };

  const getUserById = (userId) => users.find(u => u.id === userId);
  const getStartupById = (startupId) => startups.find(s => s.id === startupId);
  const getIdeaById = (ideaId) => ideas.find(i => i.id === ideaId);

  const getUserNotifications = () => 
    notifications.filter(n => n.userId === currentUser?.id);
  
  const getUnreadNotificationCount = () => 
    notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  const getUserConversations = () => 
    conversations.filter(c => c.participants.includes(currentUser?.id));

  const getPendingConnectionRequests = () => 
    connectionRequests.filter(r => r.toUserId === currentUser?.id && r.status === 'pending');

  const getFounders = () => users.filter(u => u.role === 'founder');
  const getVCs = () => users.filter(u => u.role === 'vc');

  const value = {
    currentUser,
    users,
    startups,
    ideas,
    conversations,
    notifications,
    connectionRequests,
    isLoading,
    
    // Auth
    login,
    logout,
    register,
    updateUser,
    
    // Connections
    sendConnectionRequest,
    acceptConnectionRequest,
    declineConnectionRequest,
    getPendingConnectionRequests,
    
    // Startups
    createStartup,
    updateStartup,
    expressInterest,
    
    // Ideas
    createIdea,
    upvoteIdea,
    addComment,
    
    // Messages
    startConversation,
    sendMessage,
    getUserConversations,
    
    // Notifications
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    getUserNotifications,
    getUnreadNotificationCount,
    
    // Getters
    getUserById,
    getStartupById,
    getIdeaById,
    getFounders,
    getVCs
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
