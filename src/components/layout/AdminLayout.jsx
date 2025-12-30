import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, FileText, Bell, Search, Menu, X, GraduationCap, ChevronRight } from 'lucide-react';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const notifications = [
    { id: 1, title: 'New Enquiry', message: 'Rahul Kumar submitted an enquiry for JEE Mains', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment Received', message: 'Payment of ₹45,000 received from Priya Sharma', time: '1 hour ago', unread: true },
    { id: 3, title: 'New Student', message: 'Amit Patel enrolled in Foundation Batch', time: '2 hours ago', unread: false },
    { id: 4, title: 'Class Reminder', message: 'Physics class starts in 30 minutes', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle keyboard navigation and escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showNotifications) {
        setShowNotifications(false);
        notificationButtonRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showNotifications]);

  // Focus trap for notification dropdown
  useEffect(() => {
    if (showNotifications && notificationRef.current) {
      const focusableElements = notificationRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [showNotifications]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/admin/dashboard' },
    { icon: Users, label: t('students'), path: '/admin/students' },
    { icon: BookOpen, label: t('courses'), path: '/admin/courses' },
    { icon: FileText, label: t('enquiries'), path: '/admin/enquiries' },
    { icon: Settings, label: t('settings'), path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-72 bg-primary-900 text-white z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-primary-800">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">EduPrime</h2>
                <p className="text-xs text-primary-300">Admin Portal</p>
              </div>
            </Link>
            <button
              className="md:hidden p-2 hover:bg-primary-800 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 mx-4 mt-4 bg-primary-800/50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center font-bold">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-primary-300 truncate">{user?.email || 'admin@eduprime.edu'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${isActive
                    ? 'bg-white text-primary-900 shadow-lg'
                    : 'text-primary-100 hover:bg-primary-800 hover:text-white'
                  }`}
              >
                <Icon size={20} />
                {item.label}
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-primary-200 hover:text-white hover:bg-primary-800 rounded-xl transition-all"
          >
            <LogOut size={20} />
            {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 md:h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Welcome back, {user?.name || 'Admin'}!</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                ref={notificationButtonRef}
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-expanded={showNotifications}
                aria-haspopup="true"
                aria-label={`${t('notifications')}, ${unreadCount} unread`}
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold" aria-hidden="true">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowNotifications(false)}
                    aria-hidden="true"
                  ></div>
                  <div 
                    ref={notificationRef}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-20 overflow-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="notification-menu"
                  >
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white">
                      <h3 id="notification-menu" className="font-bold text-gray-900">{t('notifications')}</h3>
                      <span className="text-xs text-primary-600 bg-primary-100 px-3 py-1 rounded-full font-semibold">
                        {unreadCount} {t('new')}
                      </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <button 
                            key={notification.id}
                            className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-primary-50 ${notification.unread ? 'bg-primary-50/40' : ''}`}
                            role="menuitem"
                            tabIndex={0}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${notification.unread ? 'bg-primary-500' : 'bg-gray-300'}`} aria-hidden="true"></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1.5">{notification.time}</p>
                              </div>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          <Bell size={32} className="mx-auto mb-2 opacity-30" />
                          <p>No notifications</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100">
                      <button 
                        className="w-full text-center text-sm text-primary-600 font-semibold hover:text-primary-700 transition-colors py-2 rounded-xl hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        onClick={() => {
                          setShowNotifications(false);
                          navigate('/admin/enquiries');
                        }}
                      >
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-gray-200">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;