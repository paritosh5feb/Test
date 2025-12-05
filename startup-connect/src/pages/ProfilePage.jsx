import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  MapPin,
  Briefcase,
  Linkedin,
  Calendar,
  Edit,
  UserPlus,
  MessageSquare,
  Clock,
  Building,
  DollarSign,
  Users,
  Rocket,
  Save,
  X
} from 'lucide-react';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentUser, 
    getUserById, 
    updateUser,
    sendConnectionRequest,
    startConversation,
    connectionRequests,
    startups
  } = useData();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // If no id, show current user's profile
  const profileUserId = id || currentUser?.id;
  const user = getUserById(profileUserId);
  const isOwnProfile = !id || id === currentUser?.id;

  // Get user's startups
  const userStartups = startups.filter(s => s.founders?.includes(profileUserId));

  // Connection status
  const isConnected = currentUser?.connections?.includes(profileUserId);
  const hasPendingRequest = connectionRequests.some(
    r => (r.fromUserId === currentUser?.id && r.toUserId === profileUserId) ||
         (r.fromUserId === profileUserId && r.toUserId === currentUser?.id)
  );

  // Function to start editing - initializes edit data
  const startEditing = () => {
    if (user) {
      setEditData({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        linkedin: user.linkedin || '',
        skills: user.skills || [],
        interests: user.interests || [],
        experience: user.experience || '',
        lookingFor: user.lookingFor || [],
        availability: user.availability || '',
        firm: user.firm || '',
        investmentFocus: user.investmentFocus || [],
        checkSize: user.checkSize || '',
        stage: user.stage || []
      });
      setIsEditing(true);
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">User not found</h2>
        <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="text-indigo-600 font-medium hover:text-indigo-700">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const isFounder = user.role === 'founder';
  const isVC = user.role === 'vc';

  const handleConnect = () => {
    sendConnectionRequest(profileUserId);
  };

  const handleMessage = () => {
    startConversation(profileUserId);
    navigate('/messages');
  };

  const handleSave = () => {
    updateUser(currentUser.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const addSkill = (skill) => {
    if (skill && !editData.skills.includes(skill)) {
      setEditData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill) => {
    setEditData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const toggleArrayItem = (key, item) => {
    setEditData(prev => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter(i => i !== item)
        : [...prev[key], item]
    }));
  };

  const domainOptions = [
    'Artificial Intelligence', 'Climate Tech', 'FinTech', 'HealthTech', 
    'EdTech', 'B2B SaaS', 'Consumer', 'Web3', 'Developer Tools', 
    'E-commerce', 'Enterprise', 'Cybersecurity', 'Gaming', 'Media'
  ];

  const lookingForOptions = [
    'Technical Co-founder', 'Business Co-founder', 'CEO', 'CTO', 
    'CMO', 'CFO', 'Advisor', 'Investor'
  ];

  const stageOptions = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+'];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="h-32 gradient-primary" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-xl border-4 border-white shadow-lg"
            />
            <div className="flex-1 pt-4 sm:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none bg-transparent"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      isVC ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {isVC ? 'VC / Investor' : 'Founder'}
                    </span>
                    {isVC && user.firm && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {user.firm}
                      </span>
                    )}
                    {user.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {isOwnProfile ? (
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={startEditing}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {isConnected ? (
                      <button
                        onClick={handleMessage}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    ) : hasPendingRequest ? (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                      >
                        <Clock className="w-4 h-4" />
                        Pending
                      </button>
                    ) : (
                      <button
                        onClick={handleConnect}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                      >
                        <UserPlus className="w-4 h-4" />
                        Connect
                      </button>
                    )}
                  </div>
                )}
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
            {isEditing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600">{user.bio || 'No bio provided.'}</p>
            )}
          </div>

          {/* Founder-specific fields */}
          {isFounder && (
            <>
              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                {isEditing ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {editData.skills.map(skill => (
                        <span key={skill} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="hover:text-indigo-900">
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a skill..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.length > 0 ? (
                      user.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills listed.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Interests */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Interests</h2>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {domainOptions.map(domain => (
                      <button
                        key={domain}
                        onClick={() => toggleArrayItem('interests', domain)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          editData.interests.includes(domain)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.interests?.length > 0 ? (
                      user.interests.map(interest => (
                        <span key={interest} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No interests listed.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Looking For */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Looking For</h2>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {lookingForOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => toggleArrayItem('lookingFor', option)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          editData.lookingFor.includes(option)
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.lookingFor?.length > 0 ? (
                      user.lookingFor.map(item => (
                        <span key={item} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Not specified.</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {/* VC-specific fields */}
          {isVC && (
            <>
              {/* Investment Focus */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Focus</h2>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {domainOptions.map(domain => (
                      <button
                        key={domain}
                        onClick={() => toggleArrayItem('investmentFocus', domain)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          editData.investmentFocus.includes(domain)
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.investmentFocus?.length > 0 ? (
                      user.investmentFocus.map(focus => (
                        <span key={focus} className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {focus}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Not specified.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Investment Stage */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Stage</h2>
                {isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    {stageOptions.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleArrayItem('stage', s)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          editData.stage.includes(s)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.stage?.length > 0 ? (
                      user.stage.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {s}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Not specified.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Portfolio */}
              {user.portfolio && user.portfolio.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Companies</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.portfolio.map(company => (
                      <span key={company} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              {isFounder && (
                <>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span>{user.experience || 'Experience not specified'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{user.availability || 'Availability not specified'}</span>
                  </div>
                </>
              )}
              {isVC && (
                <div className="flex items-center gap-3 text-gray-600">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span>{user.checkSize || 'Check size not specified'}</span>
                </div>
              )}
              {user.linkedin && (
                <a 
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span>Joined {format(new Date(user.createdAt), 'MMM yyyy')}</span>
              </div>
            </div>
          </div>

          {/* Connections */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Connections</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 text-gray-400" />
              <span>{user.connections?.length || 0} connections</span>
            </div>
          </div>

          {/* User's Startups */}
          {userStartups.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Startups</h3>
              <div className="space-y-3">
                {userStartups.map(startup => (
                  <Link
                    key={startup.id}
                    to={`/startups/${startup.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{startup.name}</h4>
                      <p className="text-xs text-gray-500">{startup.stage}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
