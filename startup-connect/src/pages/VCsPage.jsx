import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  ChevronDown,
  UserPlus,
  MessageSquare,
  X,
  Building,
  Target,
  Briefcase
} from 'lucide-react';

export default function VCsPage() {
  const { currentUser, getVCs, sendConnectionRequest, startConversation } = useData();
  const vcs = getVCs();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFocus, setSelectedFocus] = useState([]);
  const [selectedStage, setSelectedStage] = useState([]);
  const [selectedCheckSize, setSelectedCheckSize] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique investment focus areas
  const allFocusAreas = useMemo(() => {
    const areas = new Set();
    vcs.forEach(vc => vc.investmentFocus?.forEach(f => areas.add(f)));
    return Array.from(areas).sort();
  }, [vcs]);

  const stages = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C+'];
  const checkSizes = ['$50K - $250K', '$250K - $1M', '$1M - $5M', '$5M - $20M', '$20M+'];

  // Filter VCs
  const filteredVCs = useMemo(() => {
    return vcs.filter(vc => {
      // Exclude current user if they are a VC
      if (vc.id === currentUser?.id) return false;

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = vc.name.toLowerCase().includes(query);
        const matchesFirm = vc.firm?.toLowerCase().includes(query);
        const matchesBio = vc.bio?.toLowerCase().includes(query);
        const matchesFocus = vc.investmentFocus?.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesFirm && !matchesBio && !matchesFocus) return false;
      }

      // Focus filter
      if (selectedFocus.length > 0) {
        if (!vc.investmentFocus?.some(f => selectedFocus.includes(f))) return false;
      }

      // Stage filter
      if (selectedStage.length > 0) {
        if (!vc.stage?.some(s => selectedStage.includes(s))) return false;
      }

      // Check size filter
      if (selectedCheckSize && vc.checkSize !== selectedCheckSize) return false;

      return true;
    });
  }, [vcs, currentUser, searchQuery, selectedFocus, selectedStage, selectedCheckSize]);

  const toggleFocus = (focus) => {
    setSelectedFocus(prev => 
      prev.includes(focus) ? prev.filter(f => f !== focus) : [...prev, focus]
    );
  };

  const toggleStage = (stage) => {
    setSelectedStage(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSelectedFocus([]);
    setSelectedStage([]);
    setSelectedCheckSize('');
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

  const hasActiveFilters = selectedFocus.length > 0 || selectedStage.length > 0 || selectedCheckSize;

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VCs & Investors</h1>
        <p className="text-gray-600">Connect with investors looking to fund promising startups</p>
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
              placeholder="Search by name, firm, investment focus..."
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
                {selectedFocus.length + selectedStage.length + (selectedCheckSize ? 1 : 0)}
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

            {/* Investment Focus */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Focus</label>
              <div className="flex flex-wrap gap-2">
                {allFocusAreas.map(focus => (
                  <button
                    key={focus}
                    onClick={() => toggleFocus(focus)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedFocus.includes(focus)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {focus}
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Stage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Stage</label>
              <div className="flex flex-wrap gap-2">
                {stages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => toggleStage(stage)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedStage.includes(stage)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Size</label>
              <select
                value={selectedCheckSize}
                onChange={(e) => setSelectedCheckSize(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Any check size</option>
                {checkSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedFocus.map(focus => (
            <span key={focus} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {focus}
              <button onClick={() => toggleFocus(focus)}>
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          {selectedStage.map(stage => (
            <span key={stage} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {stage}
              <button onClick={() => toggleStage(stage)}>
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          {selectedCheckSize && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
              {selectedCheckSize}
              <button onClick={() => setSelectedCheckSize('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredVCs.length} investor{filteredVCs.length !== 1 ? 's' : ''}
      </div>

      {/* VCs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVCs.map((vc) => (
          <Link
            key={vc.id}
            to={`/profile/${vc.id}`}
            className="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={vc.avatar}
                  alt={vc.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg">{vc.name}</h3>
                  {vc.firm && (
                    <p className="text-sm text-indigo-600 font-medium flex items-center gap-1 mt-1">
                      <Building className="w-4 h-4" />
                      {vc.firm}
                    </p>
                  )}
                  {vc.location && (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {vc.location}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {vc.bio}
              </p>

              {/* Check Size */}
              {vc.checkSize && (
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900">{vc.checkSize}</span>
                </div>
              )}

              {/* Investment Focus */}
              {vc.investmentFocus && vc.investmentFocus.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {vc.investmentFocus.slice(0, 3).map(focus => (
                      <span key={focus} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
                        {focus}
                      </span>
                    ))}
                    {vc.investmentFocus.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs">
                        +{vc.investmentFocus.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Investment Stages */}
              {vc.stage && vc.stage.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {vc.stage.map(s => (
                      <span key={s} className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio */}
              {vc.portfolio && vc.portfolio.length > 0 && (
                <div className="text-xs text-gray-500 mb-4">
                  <span className="font-medium">Portfolio:</span>{' '}
                  {vc.portfolio.slice(0, 3).join(', ')}
                  {vc.portfolio.length > 3 && ` +${vc.portfolio.length - 3} more`}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                {isConnected(vc.id) ? (
                  <button
                    onClick={(e) => handleMessage(e, vc.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleConnect(e, vc.id)}
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
      {filteredVCs.length === 0 && (
        <div className="text-center py-16">
          <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No investors found</h3>
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
