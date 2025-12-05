import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Search,
  Filter,
  Building2,
  DollarSign,
  Users,
  Target,
  ChevronDown,
  Plus,
  X,
  Rocket,
  TrendingUp
} from 'lucide-react';

export default function StartupsPage() {
  const { currentUser, startups, users, expressInterest } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const industries = [
    'Artificial Intelligence', 'Climate Tech', 'FinTech', 'HealthTech',
    'EdTech', 'B2B SaaS', 'Consumer', 'Web3', 'Developer Tools',
    'E-commerce', 'Enterprise', 'Cybersecurity', 'Gaming', 'Media'
  ];

  const stages = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+'];

  const isVC = currentUser?.role === 'vc';
  const isFounder = currentUser?.role === 'founder';

  // Filter startups
  const filteredStartups = useMemo(() => {
    return startups.filter(startup => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = startup.name.toLowerCase().includes(query);
        const matchesTagline = startup.tagline?.toLowerCase().includes(query);
        const matchesDescription = startup.description?.toLowerCase().includes(query);
        const matchesIndustry = startup.industry?.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesDescription && !matchesIndustry) return false;
      }

      // Industry filter
      if (selectedIndustry && startup.industry !== selectedIndustry) return false;

      // Stage filter
      if (selectedStage && startup.stage !== selectedStage) return false;

      return true;
    });
  }, [startups, searchQuery, selectedIndustry, selectedStage]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('');
    setSelectedStage('');
  };

  const hasActiveFilters = selectedIndustry || selectedStage;

  const handleExpressInterest = (e, startupId) => {
    e.preventDefault();
    e.stopPropagation();
    expressInterest(startupId);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Startups</h1>
          <p className="text-gray-600">Discover promising startups and connect with founders</p>
        </div>
        {isFounder && (
          <Link
            to="/startups/new"
            className="inline-flex items-center gap-2 gradient-primary text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add Startup
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search startups..."
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
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <div className="flex flex-wrap gap-2">
                {industries.map(industry => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(selectedIndustry === industry ? '' : industry)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedIndustry === industry
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
              <div className="flex flex-wrap gap-2">
                {stages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(selectedStage === stage ? '' : stage)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedStage === stage
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedIndustry && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {selectedIndustry}
              <button onClick={() => setSelectedIndustry('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
          {selectedStage && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {selectedStage}
              <button onClick={() => setSelectedStage('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredStartups.length} startup{filteredStartups.length !== 1 ? 's' : ''}
      </div>

      {/* Startups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStartups.map((startup) => {
          const founders = startup.founders?.map(id => users.find(u => u.id === id)).filter(Boolean);
          const isInterestedVC = startup.interestedVCs?.includes(currentUser?.id);

          return (
            <Link
              key={startup.id}
              to={`/startups/${startup.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg truncate">{startup.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{startup.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {startup.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
                    {startup.industry}
                  </span>
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                    {startup.stage}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {startup.fundingRaised && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900">{startup.fundingRaised}</span>
                    </div>
                  )}
                  {startup.team && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">{startup.team.length} team members</span>
                    </div>
                  )}
                </div>

                {/* Open Roles */}
                {startup.openRoles && startup.openRoles.length > 0 && (
                  <div className="text-xs text-gray-500 mb-4">
                    <span className="font-medium">Hiring:</span>{' '}
                    {startup.openRoles.slice(0, 2).join(', ')}
                    {startup.openRoles.length > 2 && ` +${startup.openRoles.length - 2} more`}
                  </div>
                )}

                {/* Founders */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex -space-x-2">
                    {founders?.slice(0, 3).map(founder => (
                      <img
                        key={founder.id}
                        src={founder.avatar}
                        alt={founder.name}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        title={founder.name}
                      />
                    ))}
                    {founders && founders.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                        +{founders.length - 3}
                      </div>
                    )}
                  </div>

                  {isVC && (
                    <button
                      onClick={(e) => handleExpressInterest(e, startup.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isInterestedVC
                          ? 'bg-green-100 text-green-700'
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                    >
                      {isInterestedVC ? '✓ Interested' : 'Express Interest'}
                    </button>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredStartups.length === 0 && (
        <div className="text-center py-16">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No startups found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or add your own startup!</p>
          {isFounder && (
            <Link
              to="/startups/new"
              className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
            >
              <Plus className="w-5 h-5" />
              Add your startup
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
