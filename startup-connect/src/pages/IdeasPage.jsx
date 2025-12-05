import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  Search,
  Filter,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  ChevronDown,
  Plus,
  ArrowUp,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function IdeasPage() {
  const { currentUser, ideas, users, upvoteIdea } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Artificial Intelligence', 'Climate Tech', 'FinTech', 'HealthTech',
    'EdTech', 'B2B SaaS', 'Consumer', 'Web3', 'Developer Tools',
    'LegalTech', 'HR Tech', 'E-commerce', 'Cybersecurity', 'Gaming'
  ];

  const stages = ['Idea', 'Researching', 'Building MVP', 'Launched', 'Looking for Co-founders'];

  // Filter and sort ideas
  const filteredIdeas = useMemo(() => {
    let result = [...ideas];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(idea => 
        idea.title.toLowerCase().includes(query) ||
        idea.description.toLowerCase().includes(query) ||
        idea.category?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(idea => idea.category === selectedCategory);
    }

    // Stage filter
    if (selectedStage) {
      result = result.filter(idea => idea.stage === selectedStage);
    }

    // Sort
    switch (sortBy) {
      case 'trending':
        result.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'discussed':
        result.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0));
        break;
      default:
        break;
    }

    return result;
  }, [ideas, searchQuery, selectedCategory, selectedStage, sortBy]);

  const handleUpvote = (e, ideaId) => {
    e.preventDefault();
    e.stopPropagation();
    upvoteIdea(ideaId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStage('');
  };

  const hasActiveFilters = selectedCategory || selectedStage;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Ideas</h1>
          <p className="text-gray-600">Discover, share, and discuss startup ideas</p>
        </div>
        <Link
          to="/ideas/new"
          className="inline-flex items-center gap-2 gradient-primary text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Post Idea
        </Link>
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
              placeholder="Search ideas..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="discussed">Most Discussed</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
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
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('')}>
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

      {/* Ideas List */}
      <div className="space-y-4">
        {filteredIdeas.map((idea) => {
          const author = users.find(u => u.id === idea.author);
          const isUpvoted = idea.upvotedBy?.includes(currentUser?.id);

          return (
            <Link
              key={idea.id}
              to={`/ideas/${idea.id}`}
              className="block bg-white rounded-xl shadow-sm overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex gap-4">
                  {/* Upvote */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={(e) => handleUpvote(e, idea.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isUpvoted 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <span className={`text-sm font-semibold mt-1 ${isUpvoted ? 'text-indigo-600' : 'text-gray-700'}`}>
                      {idea.upvotes}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {idea.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {idea.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-xs font-medium">
                        {idea.category}
                      </span>
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-medium">
                        {idea.stage}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        {idea.comments?.length || 0} comments
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                      <img
                        src={author?.avatar}
                        alt={author?.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{author?.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredIdeas.length === 0 && (
        <div className="text-center py-16">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters or be the first to share an idea!</p>
          <Link
            to="/ideas/new"
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
          >
            <Plus className="w-5 h-5" />
            Post your first idea
          </Link>
        </div>
      )}
    </div>
  );
}
