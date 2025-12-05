import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  ChevronDown,
  UserPlus,
  MessageSquare,
  X,
  Users
} from 'lucide-react';

export default function FoundersPage() {
  const { currentUser, getFounders, sendConnectionRequest, startConversation } = useData();
  const founders = getFounders();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique skills and interests
  const allSkills = useMemo(() => {
    const skills = new Set();
    founders.forEach(f => f.skills?.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, [founders]);

  const allInterests = useMemo(() => {
    const interests = new Set();
    founders.forEach(f => f.interests?.forEach(i => interests.add(i)));
    return Array.from(interests).sort();
  }, [founders]);

  // Filter founders
  const filteredFounders = useMemo(() => {
    return founders.filter(founder => {
      // Exclude current user
      if (founder.id === currentUser?.id) return false;

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = founder.name.toLowerCase().includes(query);
        const matchesBio = founder.bio?.toLowerCase().includes(query);
        const matchesSkills = founder.skills?.some(s => s.toLowerCase().includes(query));
        const matchesInterests = founder.interests?.some(i => i.toLowerCase().includes(query));
        if (!matchesName && !matchesBio && !matchesSkills && !matchesInterests) return false;
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        if (!founder.skills?.some(s => selectedSkills.includes(s))) return false;
      }

      // Interests filter
      if (selectedInterests.length > 0) {
        if (!founder.interests?.some(i => selectedInterests.includes(i))) return false;
      }

      // Experience filter
      if (selectedExperience && founder.experience !== selectedExperience) return false;

      // Availability filter
      if (selectedAvailability && founder.availability !== selectedAvailability) return false;

      return true;
    });
  }, [founders, currentUser, searchQuery, selectedSkills, selectedInterests, selectedExperience, selectedAvailability]);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedInterests([]);
    setSelectedExperience('');
    setSelectedAvailability('');
    setSearchQuery('');
  };

  const isConnected = (userId) => currentUser?.connections?.includes(userId);

  const handleConnect = (e, userId) => {
    e.preventDefault();
    e.stopPropagation();
    sendConnectionRequest(userId);
  };

  const handleMessage = (e, userId) => {
    e.preventDefault();
    e.stopPropagation();
    startConversation(userId);
  };

  const hasActiveFilters = selectedSkills.length > 0 || selectedInterests.length > 0 || selectedExperience || selectedAvailability;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Co-founders</h1>
        <p className="text-gray-600">Connect with talented founders who complement your skills</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, skills, interests..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                {selectedSkills.length + selectedInterests.length + (selectedExperience ? 1 : 0) + (selectedAvailability ? 1 : 0)}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Filter Options</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 12).map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedInterests.includes(interest)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Any experience</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Any availability</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Weekends">Weekends only</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedSkills.map(skill => (
            <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {skill}
              <button onClick={() => toggleSkill(skill)}>
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          {selectedInterests.map(interest => (
            <span key={interest} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {interest}
              <button onClick={() => toggleInterest(interest)}>
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          {selectedExperience && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
              {selectedExperience}
              <button onClick={() => setSelectedExperience('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          {selectedAvailability && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {selectedAvailability}
              <button onClick={() => setSelectedAvailability('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredFounders.length} founder{filteredFounders.length !== 1 ? 's' : ''}
      </div>

      {/* Founders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFounders.map((founder) => (
          <Link
            key={founder.id}
            to={`/profile/${founder.id}`}
            className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">{founder.name}</h3>
                  {founder.location && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {founder.location}
                    </p>
                  )}
                  {founder.experience && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {founder.experience}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {founder.bio}
              </p>

              {/* Skills */}
              {founder.skills && founder.skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {founder.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {founder.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">
                        +{founder.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Interests */}
              {founder.interests && founder.interests.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {founder.interests.slice(0, 2).map(interest => (
                      <span key={interest} className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                        {interest}
                      </span>
                    ))}
                    {founder.interests.length > 2 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">
                        +{founder.interests.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Looking for */}
              {founder.lookingFor && founder.lookingFor.length > 0 && (
                <div className="text-xs text-gray-500 mb-4">
                  <span className="font-medium">Looking for:</span>{' '}
                  {founder.lookingFor.join(', ')}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                {isConnected(founder.id) ? (
                  <button
                    onClick={(e) => handleMessage(e, founder.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleConnect(e, founder.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Connect
                  </button>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredFounders.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No founders found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or search query</p>
          <button
            onClick={clearFilters}
            className="text-indigo-600 font-medium hover:text-indigo-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
