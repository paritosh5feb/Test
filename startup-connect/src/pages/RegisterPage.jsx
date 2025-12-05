import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Rocket, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Users,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Briefcase,
  Plus,
  X
} from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useData();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Basic Info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Role Selection
  const [role, setRole] = useState('');

  // Step 3: Profile Details (for founders)
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState([]);
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [lookingFor, setLookingFor] = useState([]);
  const [availability, setAvailability] = useState('');

  // Step 3: Profile Details (for VCs)
  const [firm, setFirm] = useState('');
  const [investmentFocus, setInvestmentFocus] = useState([]);
  const [checkSize, setCheckSize] = useState('');
  const [stage, setStage] = useState([]);

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

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const toggleArrayItem = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const userData = {
      email,
      password,
      name,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s/g, '')}`,
      bio,
      location,
      linkedin: '',
      ...(role === 'founder' ? {
        skills,
        interests,
        experience,
        lookingFor,
        availability
      } : {
        firm,
        investmentFocus,
        checkSize,
        stage,
        portfolio: []
      })
    };

    const result = register(userData);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!email || !password || !name) {
        setError('Please fill in all fields');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    if (step === 2 && !role) {
      setError('Please select a role');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">StartupConnect</span>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= s ? 'gradient-primary text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-1 mx-1 ${step > s ? 'bg-indigo-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
                <p className="text-gray-600 mt-1">Start your startup journey today</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={nextStep}
                className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Role Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Choose Your Role</h1>
                <p className="text-gray-600 mt-1">How do you want to participate?</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setRole('founder')}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${
                    role === 'founder' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    role === 'founder' ? 'gradient-primary' : 'bg-gray-100'
                  }`}>
                    <Users className={`w-7 h-7 ${role === 'founder' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">Founder</h3>
                  <p className="text-sm text-gray-500 mt-1">Find co-founders & build</p>
                </button>

                <button
                  onClick={() => setRole('vc')}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${
                    role === 'vc' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    role === 'vc' ? 'gradient-primary' : 'bg-gray-100'
                  }`}>
                    <DollarSign className={`w-7 h-7 ${role === 'vc' ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">VC / Investor</h3>
                  <p className="text-sm text-gray-500 mt-1">Discover & invest</p>
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={prevStep}
                  className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="flex-1 gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Profile Details */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
                <p className="text-gray-600 mt-1">Tell us more about yourself</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>

              {role === 'founder' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Add a skill..."
                      />
                      <button
                        onClick={addSkill}
                        className="p-2 gradient-primary text-white rounded-xl hover:opacity-90"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="hover:text-indigo-800">
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {domainOptions.map(domain => (
                        <button
                          key={domain}
                          onClick={() => toggleArrayItem(interests, setInterests, domain)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            interests.includes(domain)
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select experience</option>
                      <option value="0-2 years">0-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Looking For</label>
                    <div className="flex flex-wrap gap-2">
                      {lookingForOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => toggleArrayItem(lookingFor, setLookingFor, option)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            lookingFor.includes(option)
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select availability</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Weekends">Weekends only</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </>
              )}

              {role === 'vc' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firm Name</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={firm}
                        onChange={(e) => setFirm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Your VC firm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Focus</label>
                    <div className="flex flex-wrap gap-2">
                      {domainOptions.map(domain => (
                        <button
                          key={domain}
                          onClick={() => toggleArrayItem(investmentFocus, setInvestmentFocus, domain)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            investmentFocus.includes(domain)
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Check Size</label>
                    <select
                      value={checkSize}
                      onChange={(e) => setCheckSize(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select check size</option>
                      <option value="$50K - $250K">$50K - $250K</option>
                      <option value="$250K - $1M">$250K - $1M</option>
                      <option value="$1M - $5M">$1M - $5M</option>
                      <option value="$5M - $20M">$5M - $20M</option>
                      <option value="$20M+">$20M+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Investment Stage</label>
                    <div className="flex flex-wrap gap-2">
                      {stageOptions.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleArrayItem(stage, setStage, s)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            stage.includes(s)
                              ? 'bg-indigo-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={prevStep}
                  className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 gradient-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
