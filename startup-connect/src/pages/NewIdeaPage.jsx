import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  ArrowLeft,
  Lightbulb,
  Tag,
  Target,
  FileText,
  Send
} from 'lucide-react';

export default function NewIdeaPage() {
  const navigate = useNavigate();
  const { createIdea } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stage, setStage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Artificial Intelligence', 'Climate Tech', 'FinTech', 'HealthTech',
    'EdTech', 'B2B SaaS', 'Consumer', 'Web3', 'Developer Tools',
    'LegalTech', 'HR Tech', 'E-commerce', 'Cybersecurity', 'Gaming', 'Media'
  ];

  const stages = [
    { value: 'Idea', description: 'Just an idea, looking for feedback' },
    { value: 'Researching', description: 'Validating the problem and market' },
    { value: 'Building MVP', description: 'Actively building the product' },
    { value: 'Launched', description: 'Product is live with users' },
    { value: 'Looking for Co-founders', description: 'Need partners to build this' }
  ];

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (title.length < 10) newErrors.title = 'Title must be at least 10 characters';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    if (!category) newErrors.category = 'Please select a category';
    if (!stage) newErrors.stage = 'Please select a stage';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const idea = createIdea({
      title: title.trim(),
      description: description.trim(),
      category,
      stage
    });

    navigate(`/ideas/${idea.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/ideas')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Ideas
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Idea</h1>
        <p className="text-gray-600">Get feedback from the community and find co-founders</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <label className="block mb-4">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Lightbulb className="w-4 h-4" />
              Idea Title
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A catchy title for your startup idea..."
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.title ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </label>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <label className="block mb-4">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Description
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your idea in detail. What problem does it solve? Who is the target audience? What makes it unique?"
              rows={8}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="text-sm text-red-600">{errors.description}</p>
              ) : (
                <p className="text-sm text-gray-500">Minimum 50 characters</p>
              )}
              <p className="text-sm text-gray-400">{description.length} characters</p>
            </div>
          </label>
        </div>

        {/* Category */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Tag className="w-4 h-4" />
            Category
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  category === cat
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="mt-2 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Stage */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <Target className="w-4 h-4" />
            Current Stage
          </span>
          <div className="grid sm:grid-cols-2 gap-3">
            {stages.map(s => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStage(s.value)}
                className={`p-4 rounded-xl text-left transition-all ${
                  stage === s.value
                    ? 'bg-green-50 border-2 border-green-500'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                }`}
              >
                <h4 className={`font-medium ${stage === s.value ? 'text-green-700' : 'text-gray-900'}`}>
                  {s.value}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{s.description}</p>
              </button>
            ))}
          </div>
          {errors.stage && (
            <p className="mt-2 text-sm text-red-600">{errors.stage}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">
            Your idea will be visible to all users on the platform
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? (
              'Publishing...'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Publish Idea
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
