import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { v4 as uuidv4 } from 'uuid';
import {
  ArrowLeft,
  Rocket,
  DollarSign,
  Users,
  Target,
  Globe,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
  UserPlus,
  MessageSquare,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { format } from 'date-fns';

export default function StartupDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, startups, users, expressInterest, updateStartup, startConversation } = useData();

  const startup = startups.find(s => s.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', date: '', status: 'planned' });
  const [showAddMilestone, setShowAddMilestone] = useState(false);

  if (!startup) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Startup not found</h2>
        <p className="text-gray-600 mb-4">The startup you're looking for doesn't exist.</p>
        <Link to="/startups" className="text-indigo-600 font-medium hover:text-indigo-700">
          Back to Startups
        </Link>
      </div>
    );
  }

  const isFounder = startup.founders?.includes(currentUser?.id);
  const isVC = currentUser?.role === 'vc';
  const isInterestedVC = startup.interestedVCs?.includes(currentUser?.id);

  const team = startup.team?.map(member => ({
    ...member,
    user: users.find(u => u.id === member.userId)
  })).filter(m => m.user);

  const interestedVCs = startup.interestedVCs?.map(id => users.find(u => u.id === id)).filter(Boolean);

  const handleExpressInterest = () => {
    expressInterest(startup.id);
  };

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.date) {
      const id = uuidv4();
      const milestones = [...(startup.milestones || []), { ...newMilestone, id }];
      updateStartup(startup.id, { milestones });
      setNewMilestone({ title: '', date: '', status: 'planned' });
      setShowAddMilestone(false);
    }
  };

  const updateMilestoneStatus = (index, status) => {
    const milestones = startup.milestones.map((m, i) => i === index ? { ...m, status } : m);
    updateStartup(startup.id, { milestones });
  };

  const handleMessageFounder = (founderId) => {
    startConversation(founderId);
    navigate('/messages');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/startups')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Startups
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="h-32 gradient-primary" />
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-12">
            <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
              <Rocket className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{startup.name}</h1>
                  <p className="text-lg text-gray-600 mt-1">{startup.tagline}</p>
                </div>
                <div className="flex gap-3">
                  {isVC && (
                    <button
                      onClick={handleExpressInterest}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${
                        isInterestedVC
                          ? 'bg-green-100 text-green-700'
                          : 'gradient-primary text-white hover:opacity-90'
                      }`}
                    >
                      {isInterestedVC ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Interested
                        </>
                      ) : (
                        <>
                          <DollarSign className="w-5 h-5" />
                          Express Interest
                        </>
                      )}
                    </button>
                  )}
                  {isFounder && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium text-gray-900">{startup.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Stage</p>
                <p className="font-medium text-gray-900">{startup.stage}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Raised</p>
                <p className="font-medium text-gray-900">{startup.fundingRaised || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Team Size</p>
                <p className="font-medium text-gray-900">{startup.team?.length || 1}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{startup.description}</p>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Milestones & Roadmap</h2>
              {isFounder && (
                <button
                  onClick={() => setShowAddMilestone(true)}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </button>
              )}
            </div>

            {showAddMilestone && isFounder && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Milestone title"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="month"
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, date: e.target.value }))}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <select
                    value={newMilestone.status}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, status: e.target.value }))}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddMilestone(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMilestone}
                    className="px-4 py-2 gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {startup.milestones && startup.milestones.length > 0 ? (
                startup.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    {getStatusIcon(milestone.status)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                      <p className="text-sm text-gray-500">
                        {milestone.date && format(new Date(milestone.date + '-01'), 'MMMM yyyy')}
                      </p>
                    </div>
                    {isFounder ? (
                      <select
                        value={milestone.status}
                        onChange={(e) => updateMilestoneStatus(index, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}
                      >
                        <option value="planned">Planned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                        {milestone.status === 'in-progress' ? 'In Progress' : 
                         milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No milestones added yet.</p>
              )}
            </div>
          </div>

          {/* Open Positions */}
          {startup.openRoles && startup.openRoles.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Open Positions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {startup.openRoles.map((role, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <span className="font-medium text-gray-900">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Team</h3>
            <div className="space-y-4">
              {team?.map((member) => (
                <div key={member.userId} className="flex items-center gap-3">
                  <Link to={`/profile/${member.userId}`}>
                    <img
                      src={member.user.avatar}
                      alt={member.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/profile/${member.userId}`}
                      className="font-medium text-gray-900 hover:text-indigo-600 truncate block"
                    >
                      {member.user.name}
                    </Link>
                    <p className="text-sm text-gray-500 truncate">{member.role}</p>
                  </div>
                  {!isFounder && currentUser?.id !== member.userId && (
                    <button
                      onClick={() => handleMessageFounder(member.userId)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Funding Goal */}
          {startup.fundingGoal && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Funding</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Raised</span>
                  <span className="font-medium text-gray-900">{startup.fundingRaised || '$0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Goal</span>
                  <span className="font-medium text-gray-900">{startup.fundingGoal}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="gradient-primary h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (parseFloat(startup.fundingRaised?.replace(/[$MK]/g, '') || 0) /
                        parseFloat(startup.fundingGoal?.replace(/[$MK]/g, '') || 1)) * 100,
                        100
                      )}%`
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Interested VCs */}
          {interestedVCs && interestedVCs.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Interested Investors</h3>
              <div className="space-y-3">
                {interestedVCs.map((vc) => (
                  <Link
                    key={vc.id}
                    to={`/profile/${vc.id}`}
                    className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={vc.avatar}
                      alt={vc.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{vc.name}</p>
                      <p className="text-sm text-gray-500 truncate">{vc.firm}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <div className="space-y-3">
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700"
                >
                  <Globe className="w-5 h-5" />
                  Website
                </a>
              )}
              {startup.pitch && (
                <a
                  href={startup.pitch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700"
                >
                  <FileText className="w-5 h-5" />
                  Pitch Deck
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
