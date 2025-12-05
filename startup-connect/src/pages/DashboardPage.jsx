import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Users,
  Lightbulb,
  Building2,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Bell,
  ArrowRight,
  UserPlus,
  Rocket
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    currentUser, 
    users, 
    startups, 
    ideas, 
    getUserConversations,
    getPendingConnectionRequests,
    getUserNotifications,
    getFounders,
    getVCs
  } = useData();

  const conversations = getUserConversations();
  const pendingRequests = getPendingConnectionRequests();
  const notifications = getUserNotifications().filter(n => !n.read);
  const founders = getFounders();
  const vcs = getVCs();

  const isFounder = currentUser?.role === 'founder';

  // Get user's startups
  const myStartups = startups.filter(s => s.founders?.includes(currentUser?.id));
  
  // Get recommended connections based on interests
  const getRecommendedUsers = () => {
    if (!currentUser) return [];
    
    const interests = isFounder ? currentUser.interests : currentUser.investmentFocus;
    
    return users
      .filter(u => u.id !== currentUser.id)
      .filter(u => {
        if (isFounder) {
          // Founders see other founders with matching interests or VCs
          const userInterests = u.role === 'founder' ? u.interests : u.investmentFocus;
          return userInterests?.some(i => interests?.includes(i));
        } else {
          // VCs see founders with matching interests
          return u.role === 'founder' && u.interests?.some(i => interests?.includes(i));
        }
      })
      .slice(0, 4);
  };

  const recommendedUsers = getRecommendedUsers();

  // Get trending ideas
  const trendingIdeas = [...ideas].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);

  const stats = isFounder ? [
    { label: 'Connections', value: currentUser?.connections?.length || 0, icon: Users, color: 'bg-blue-500' },
    { label: 'My Ideas', value: ideas.filter(i => i.author === currentUser?.id).length, icon: Lightbulb, color: 'bg-amber-500' },
    { label: 'My Startups', value: myStartups.length, icon: Building2, color: 'bg-green-500' },
    { label: 'Messages', value: conversations.length, icon: MessageSquare, color: 'bg-purple-500' }
  ] : [
    { label: 'Founders Met', value: currentUser?.connections?.length || 0, icon: Users, color: 'bg-blue-500' },
    { label: 'Startups Viewed', value: startups.filter(s => s.interestedVCs?.includes(currentUser?.id)).length, icon: Building2, color: 'bg-green-500' },
    { label: 'Active Deals', value: 0, icon: DollarSign, color: 'bg-amber-500' },
    { label: 'Messages', value: conversations.length, icon: MessageSquare, color: 'bg-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {currentUser?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">
              {isFounder 
                ? 'Ready to find your next co-founder or share your startup ideas?'
                : 'Discover promising startups and talented founders today.'
              }
            </p>
          </div>
          <div className="flex gap-3">
            {isFounder ? (
              <>
                <Link
                  to="/founders"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  Find Co-founders
                </Link>
                <Link
                  to="/ideas/new"
                  className="inline-flex items-center gap-2 bg-indigo-400/30 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-400/50 transition-colors"
                >
                  <Lightbulb className="w-5 h-5" />
                  Post Idea
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/startups"
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
                >
                  <Building2 className="w-5 h-5" />
                  Browse Startups
                </Link>
                <Link
                  to="/founders"
                  className="inline-flex items-center gap-2 bg-indigo-400/30 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-400/50 transition-colors"
                >
                  <Users className="w-5 h-5" />
                  Meet Founders
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Pending Actions */}
      {(pendingRequests.length > 0 || notifications.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-amber-600" />
            <div className="flex-1">
              <span className="font-medium text-amber-800">You have pending actions: </span>
              {pendingRequests.length > 0 && (
                <Link to="/notifications" className="text-amber-600 hover:underline">
                  {pendingRequests.length} connection request{pendingRequests.length > 1 ? 's' : ''}
                </Link>
              )}
              {pendingRequests.length > 0 && notifications.length > 0 && <span className="text-amber-800"> and </span>}
              {notifications.length > 0 && (
                <Link to="/notifications" className="text-amber-600 hover:underline">
                  {notifications.length} notification{notifications.length > 1 ? 's' : ''}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Connections */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
                <p className="text-sm text-gray-500">Based on your interests</p>
              </div>
              <Link 
                to={isFounder ? "/founders" : "/startups"}
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y">
              {recommendedUsers.length > 0 ? (
                recommendedUsers.map((user) => (
                  <Link
                    key={user.id}
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                        {user.role === 'vc' && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                            VC
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {user.role === 'vc' ? user.firm : user.bio?.slice(0, 60) + '...'}
                      </p>
                    </div>
                    <UserPlus className="w-5 h-5 text-gray-400" />
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No recommendations yet. Complete your profile to see suggestions!</p>
                </div>
              )}
            </div>
          </div>

          {/* Trending Ideas */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Trending Ideas</h2>
                <p className="text-sm text-gray-500">Hot startup ideas from the community</p>
              </div>
              <Link 
                to="/ideas"
                className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y">
              {trendingIdeas.map((idea) => {
                const author = users.find(u => u.id === idea.author);
                return (
                  <Link
                    key={idea.id}
                    to={`/ideas/${idea.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1">{idea.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{idea.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                            {idea.category}
                          </span>
                          <span className="text-xs text-gray-400">by {author?.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        {idea.upvotes}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* My Startups (for founders) */}
          {isFounder && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">My Startups</h3>
                <Link to="/startups/new" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  + New
                </Link>
              </div>
              <div className="p-4">
                {myStartups.length > 0 ? (
                  <div className="space-y-3">
                    {myStartups.map(startup => (
                      <Link
                        key={startup.id}
                        to={`/startups/${startup.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                          <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{startup.name}</h4>
                          <p className="text-xs text-gray-500">{startup.stage}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Rocket className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm text-gray-500 mb-3">No startups yet</p>
                    <Link
                      to="/startups/new"
                      className="inline-flex items-center gap-1 text-indigo-600 text-sm font-medium hover:text-indigo-700"
                    >
                      Create your first startup <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Platform Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Founders</span>
                <span className="font-medium text-gray-900">{founders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">VCs & Investors</span>
                <span className="font-medium text-gray-900">{vcs.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Startups</span>
                <span className="font-medium text-gray-900">{startups.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Startup Ideas</span>
                <span className="font-medium text-gray-900">{ideas.length}</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Recent Messages</h3>
            </div>
            <div className="divide-y">
              {conversations.slice(0, 3).map(conv => {
                const otherUserId = conv.participants.find(p => p !== currentUser?.id);
                const otherUser = users.find(u => u.id === otherUserId);
                const lastMessage = conv.messages[conv.messages.length - 1];
                return (
                  <Link
                    key={conv.id}
                    to="/messages"
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={otherUser?.avatar}
                      alt={otherUser?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {otherUser?.name}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        {lastMessage?.text}
                      </p>
                    </div>
                  </Link>
                );
              })}
              {conversations.length === 0 && (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No conversations yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
