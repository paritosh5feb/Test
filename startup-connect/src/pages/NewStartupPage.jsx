import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import {
  ArrowLeft,
  Rocket,
  Building2,
  FileText,
  Target,
  DollarSign,
  Globe,
  Briefcase,
  Plus,
  X
} from 'lucide-react';

export default function NewStartupPage() {
  const navigate = useNavigate();
  const { createStartup } = useData();

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    industry: '',
    stage: '',
    fundingRaised: '',
    fundingGoal: '',
    website: '',
    pitch: '',
    founderRole: '',
    openRoles: []
  });

  const [newRole, setNewRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const industries = [
    'Artificial Intelligence', 'Climate Tech', 'FinTech', 'HealthTech',
    'EdTech', 'B2B SaaS', 'Consumer', 'Web3', 'Developer Tools',
    'E-commerce', 'Enterprise', 'Cybersecurity', 'Gaming', 'Media'
  ];

  const stages = [
    { value: 'Pre-seed', description: 'Pre-product, validating idea' },
    { value: 'Seed', description: 'Early traction, building product' },
    { value: 'Series A', description: 'Product-market fit, scaling' },
    { value: 'Series B', description: 'Growth stage, expanding' },
    { value: 'Series C+', description: 'Late stage, preparing for exit' }
  ];

  const addRole = () => {
    if (newRole.trim() && !formData.openRoles.includes(newRole.trim())) {
      setFormData(prev => ({
        ...prev,
        openRoles: [...prev.openRoles, newRole.trim()]
      }));
      setNewRole('');
    }
  };

  const removeRole = (role) => {
    setFormData(prev => ({
      ...prev,
      openRoles: prev.openRoles.filter(r => r !== role)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Startup name is required';
    if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    if (!formData.industry) newErrors.industry = 'Please select an industry';
    if (!formData.stage) newErrors.stage = 'Please select a stage';
    if (!formData.founderRole.trim()) newErrors.founderRole = 'Your role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const startup = createStartup({
      name: formData.name.trim(),
      tagline: formData.tagline.trim(),
      description: formData.description.trim(),
      industry: formData.industry,
      stage: formData.stage,
      fundingRaised: formData.fundingRaised || null,
      fundingGoal: formData.fundingGoal || null,
      website: formData.website || null,
      pitch: formData.pitch || null,
      founderRole: formData.founderRole.trim(),
      openRoles: formData.openRoles,
      milestones: []
    });

    navigate(`/startups/${startup.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('/startups')}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Startups
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Startup</h1>
        <p className="text-gray-600">Share your startup with the community and find co-founders or investors</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-600" />
            Basic Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Startup Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., TechCo"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                placeholder="A short, catchy description..."
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.tagline ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.tagline && <p className="mt-1 text-sm text-red-600">{errors.tagline}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your startup in detail..."
                rows={5}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Industry & Stage */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Industry & Stage
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Industry</label>
              <div className="flex flex-wrap gap-2">
                {industries.map(ind => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, industry: ind }))}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      formData.industry === ind
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              {errors.industry && <p className="mt-2 text-sm text-red-600">{errors.industry}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Stage</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {stages.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, stage: s.value }))}
                    className={`p-4 rounded-xl text-left transition-all ${
                      formData.stage === s.value
                        ? 'bg-green-50 border-2 border-green-500'
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    <h4 className={`font-medium ${formData.stage === s.value ? 'text-green-700' : 'text-gray-900'}`}>
                      {s.value}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{s.description}</p>
                  </button>
                ))}
              </div>
              {errors.stage && <p className="mt-2 text-sm text-red-600">{errors.stage}</p>}
            </div>
          </div>
        </div>

        {/* Funding */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-600" />
            Funding (Optional)
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Raised
              </label>
              <input
                type="text"
                value={formData.fundingRaised}
                onChange={(e) => setFormData(prev => ({ ...prev, fundingRaised: e.target.value }))}
                placeholder="e.g., $500K"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Goal
              </label>
              <input
                type="text"
                value={formData.fundingGoal}
                onChange={(e) => setFormData(prev => ({ ...prev, fundingGoal: e.target.value }))}
                placeholder="e.g., $2M"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Team & Roles */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Team
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Role
              </label>
              <input
                type="text"
                value={formData.founderRole}
                onChange={(e) => setFormData(prev => ({ ...prev, founderRole: e.target.value }))}
                placeholder="e.g., CEO & Co-founder"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.founderRole ? 'border-red-300' : 'border-gray-200'
                }`}
              />
              {errors.founderRole && <p className="mt-1 text-sm text-red-600">{errors.founderRole}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Open Positions (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRole())}
                  placeholder="e.g., CTO, Full-stack Developer"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addRole}
                  className="p-2 gradient-primary text-white rounded-xl hover:opacity-90"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.openRoles.map(role => (
                  <span key={role} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {role}
                    <button type="button" onClick={() => removeRole(role)} className="hover:text-indigo-900">
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            Links (Optional)
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourcompany.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pitch Deck
              </label>
              <input
                type="url"
                value={formData.pitch}
                onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                placeholder="https://pitch.com/deck"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/startups')}
            className="px-6 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? (
              'Creating...'
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                Create Startup
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
