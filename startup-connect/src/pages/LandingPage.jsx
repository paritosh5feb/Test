import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Lightbulb, 
  MessageSquare, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Find Co-founders',
      description: 'Connect with talented individuals who share your vision and complement your skills.'
    },
    {
      icon: DollarSign,
      title: 'Meet Investors',
      description: 'Get in front of VCs and angel investors actively looking for promising startups.'
    },
    {
      icon: Lightbulb,
      title: 'Share Ideas',
      description: 'Post your startup ideas, get feedback, and find collaborators to bring them to life.'
    },
    {
      icon: MessageSquare,
      title: 'Collaborate',
      description: 'Built-in messaging and collaboration tools to work with your team effectively.'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Plan milestones, track funding rounds, and manage your startup journey.'
    },
    {
      icon: Rocket,
      title: 'Launch & Scale',
      description: 'From idea to IPO, we support every stage of your startup journey.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Founder, EcoTrack',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      quote: 'Found my technical co-founder within 2 weeks. StartupConnect made it incredibly easy to find someone who shared my vision.'
    },
    {
      name: 'James Wilson',
      role: 'Partner, Horizon Ventures',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      quote: 'As a VC, this platform has become my go-to for discovering promising early-stage startups and talented founders.'
    },
    {
      name: 'Alex Kumar',
      role: 'CTO, TechFlow',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      quote: 'The quality of founders on this platform is exceptional. Connected with my now CEO within the first month.'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Founders' },
    { value: '500+', label: 'VCs & Angels' },
    { value: '2,000+', label: 'Startups' },
    { value: '$500M+', label: 'Raised' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StartupConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="gradient-primary text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              The #1 Platform for Startup Founders
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Build Your Dream
              <span className="gradient-primary text-transparent bg-clip-text"> Startup </span>
              Together
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with co-founders, investors, and advisors. Share ideas, build your team, 
              and turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-primary text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From finding co-founders to securing funding, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow card-hover"
                >
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and start building your startup journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Your Profile', description: 'Sign up and showcase your skills, experience, and what you\'re looking for.' },
              { step: '02', title: 'Connect & Collaborate', description: 'Find co-founders, join discussions, and connect with investors.' },
              { step: '03', title: 'Build & Launch', description: 'Use our tools to plan, execute, and track your startup\'s progress.' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-bold text-indigo-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Loved by Founders & Investors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our community has to say about StartupConnect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.name}
                className="bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of founders and investors building the future together.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Free forever for founders
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">StartupConnect</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 StartupConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
