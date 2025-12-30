import React from 'react';
import { Users, DollarSign, BookOpen, AlertCircle, TrendingUp, TrendingDown, ArrowRight, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const StatCard = ({ title, value, subtext, icon: Icon, color, trend, trendValue }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
        <div className="flex items-center gap-1.5">
          {trend === 'up' ? (
            <TrendingUp size={16} className="text-green-500" />
          ) : (
            <TrendingDown size={16} className="text-red-500" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
          <span className="text-sm text-gray-400">{subtext}</span>
        </div>
      </div>
      <div className={`p-4 rounded-2xl ${color}`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { t } = useLanguage();
  const recentEnquiries = [
    { name: 'Rahul Kumar', course: 'JEE Mains', date: 'Dec 24, 2025', status: 'New', phone: '+91 98765...' },
    { name: 'Priya Sharma', course: 'NEET', date: 'Dec 23, 2025', status: 'Contacted', phone: '+91 87654...' },
    { name: 'Amit Patel', course: 'Foundation', date: 'Dec 23, 2025', status: 'Converted', phone: '+91 76543...' },
    { name: 'Sneha Gupta', course: 'JEE Advanced', date: 'Dec 22, 2025', status: 'New', phone: '+91 65432...' },
  ];

  const upcomingClasses = [
    { subject: 'Physics - Mechanics', time: '10:00 AM', batch: 'JEE 2025', instructor: 'Dr. Verma' },
    { subject: 'Chemistry - Organic', time: '12:00 PM', batch: 'NEET 2025', instructor: 'Prof. Sharma' },
    { subject: 'Mathematics - Calculus', time: '2:00 PM', batch: 'JEE 2025', instructor: 'Ms. Singh' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t('goodMorning')} 👋</h2>
            <p className="text-primary-100">{t('welcomeMessage')}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-xl">
            <Calendar size={18} />
            <span className="font-medium">Dec 25, 2025</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('totalStudents')}
          value="1,248"
          subtext={t('fromLastMonth')}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title={t('revenue')}
          value="₹45.2L"
          subtext={t('fromLastMonth')}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title={t('activeCourses')}
          value="24"
          subtext={t('newAdded')}
          icon={BookOpen}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          trend="up"
          trendValue="+3"
        />
        <StatCard
          title={t('pendingEnquiries')}
          value="38"
          subtext={t('needsAttention')}
          icon={AlertCircle}
          color="bg-gradient-to-br from-amber-500 to-orange-500"
          trend="down"
          trendValue="-5"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{t('recentEnquiries')}</h3>
              <p className="text-sm text-gray-500">Latest student enquiries from website</p>
            </div>
            <button className="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
              {t('viewAll')} <ArrowRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4 text-left">Student</th>
                  <th className="px-6 py-4 text-left">Course</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentEnquiries.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold">
                          {row.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-500">{row.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.course}</td>
                    <td className="px-6 py-4 text-gray-500">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${row.status === 'New' ? 'bg-blue-100 text-blue-700' :
                          row.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                        }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-lg">{t('upcomingClasses')}</h3>
            <p className="text-sm text-gray-500">Upcoming classes</p>
          </div>
          <div className="p-4 space-y-3">
            {upcomingClasses.map((cls, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-2 text-primary-600 text-sm font-semibold mb-2">
                  <Clock size={14} />
                  {cls.time}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{cls.subject}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-white px-2 py-1 rounded-md border">{cls.batch}</span>
                  <span>{cls.instructor}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors">
              View Full Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;