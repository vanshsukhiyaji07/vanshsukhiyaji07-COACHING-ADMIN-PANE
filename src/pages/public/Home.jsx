import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, GraduationCap, TrendingUp, CheckCircle, BookOpen, Play, ChevronRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-100 to-accent-50 border border-accent-200 rounded-full text-accent-700 text-sm font-semibold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                Admissions Open for 2025-26
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Empowering
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800"> Future Leaders</span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Comprehensive coaching programs for JEE, NEET, and Academic Foundation. Transform your dreams into reality with expert guidance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button size="lg" className="shadow-lg shadow-primary-500/25">
                  Explore Courses <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="ghost" className="border border-gray-200 hover:bg-gray-50">
                  <Play size={20} className="mr-2" /> View Results
                </Button>
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/40?img=${i + 10}`} alt="" className="w-10 h-10 rounded-full border-2 border-white" loading="lazy" />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-gray-500">4.9/5 from 2,800+ reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-accent-400 rounded-3xl blur-2xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"
                alt="Students celebrating success"
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                loading="eager"
                width="600"
                height="450"
              />

              {/* Floating Cards */}
              <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">98%</p>
                    <p className="text-sm text-gray-500">Success Rate</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-1/4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Award className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-500">IIT Selections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "5000+", label: "Students Enrolled", color: "bg-primary-600" },
              { icon: Award, value: "98%", label: "Success Rate", color: "bg-green-500" },
              { icon: GraduationCap, value: "50+", label: "Expert Faculty", color: "bg-accent-500" },
              { icon: Star, value: "15+", label: "Years Excellence", color: "bg-purple-500" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={28} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Excellence in Every Dimension</h2>
            <p className="text-lg text-gray-600">
              At EduPrime, we believe in a scientific approach to learning. Our methodology revolves around concept clarity, regular practice, and performance analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Structured Curriculum", desc: "Scientifically designed course material covering basic to advanced concepts with competitive exam focus." },
              { icon: Users, title: "Expert Faculty", desc: "Learn from IITians and Medical professionals with 10+ years of teaching experience." },
              { icon: TrendingUp, title: "AI-Powered Analytics", desc: "Weekly tests and AI-driven performance analysis for personalized improvement strategies." },
            ].map((feature, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Popular Programs
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Premium Courses</h2>
            </div>
            <Link to="/courses" className="inline-flex items-center text-primary-600 font-semibold hover:gap-3 transition-all gap-2">
              View All Courses <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "JEE Mains + Advanced", duration: "2 Years", price: "₹1,50,000", color: "from-blue-500 to-indigo-600", features: ["Complete PCM Coverage", "500+ Hours Live Classes", "AI Test Series"] },
              { name: "NEET Medical", duration: "2 Years", price: "₹1,20,000", color: "from-emerald-500 to-teal-600", features: ["PCB + NCERT Focus", "AIIMS Pattern Tests", "Biology Mastery"] },
              { name: "Foundation (8-10)", duration: "1 Year", price: "₹65,000", color: "from-orange-500 to-amber-600", features: ["Strong Fundamentals", "Olympiad Prep", "Board + Competitive"] },
            ].map((course, i) => (
              <div key={i} className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-500 mb-6">{course.duration} Program</p>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <p className="text-3xl font-bold text-gray-900">{course.price}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary-50">
                      Learn More <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
          <p className="text-xl text-primary-200 mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their dreams with EduPrime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-primary-50 shadow-lg">
              Explore Courses <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10">
              Book Free Counseling
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;