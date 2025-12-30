import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Save,
  Building,
  Mail,
  Phone,
  MapPin,
  Camera,
  Eye,
  EyeOff,
  Check,
  Moon,
  Sun
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Settings = () => {
  const { language, t, changeLanguage, availableLanguages, languageNames } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode is saved in localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode on mount and when darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@eduprime.com',
    phone: '+91 98765 43210',
    role: 'Administrator'
  });

  const [institute, setInstitute] = useState({
    name: 'EduPrime Coaching Institute',
    email: 'contact@eduprime.com',
    phone: '+91 1800 123 4567',
    address: '123 Education Street, Knowledge Park, Mumbai - 400001',
    website: 'www.eduprime.com',
    description: 'Leading coaching institute for JEE & NEET preparation with expert faculty and proven results.'
  });

  const [notifications, setNotifications] = useState({
    emailEnquiries: true,
    emailPayments: true,
    emailStudents: false,
    pushEnquiries: true,
    pushPayments: true,
    pushReminders: true,
    smsEnquiries: false,
    smsPayments: true
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'institute', label: 'Institute', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match!');
      return;
    }
    if (passwords.new.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    handleSave();
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" aria-label="Settings navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors ${activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Profile Settings</h2>
                    <p className="text-sm text-gray-500">Update your personal information</p>
                  </div>
                  {saved && (
                    <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check size={16} /> Saved successfully
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                      {profile.name.charAt(0)}
                    </div>
                    <button
                      className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                      aria-label="Change profile picture"
                    >
                      <Camera size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
                    <p className="text-gray-500">{profile.role}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="profileName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      id="profileName"
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="profileEmail" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      id="profileEmail"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="profilePhone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      id="profilePhone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label htmlFor="profileRole" className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                    <input
                      id="profileRole"
                      type="text"
                      value={profile.role}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Institute Settings */}
            {activeTab === 'institute' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Institute Settings</h2>
                    <p className="text-sm text-gray-500">Manage your institute information</p>
                  </div>
                  {saved && (
                    <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check size={16} /> Saved successfully
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="instituteName" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Building size={16} className="inline mr-2" />
                      Institute Name
                    </label>
                    <input
                      id="instituteName"
                      type="text"
                      value={institute.name}
                      onChange={(e) => setInstitute({ ...institute, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="instituteEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Contact Email
                      </label>
                      <input
                        id="instituteEmail"
                        type="email"
                        value={institute.email}
                        onChange={(e) => setInstitute({ ...institute, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      />
                    </div>
                    <div>
                      <label htmlFor="institutePhone" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Contact Phone
                      </label>
                      <input
                        id="institutePhone"
                        type="tel"
                        value={institute.phone}
                        onChange={(e) => setInstitute({ ...institute, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="instituteWebsite" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Globe size={16} className="inline mr-2" />
                      Website
                    </label>
                    <input
                      id="instituteWebsite"
                      type="text"
                      value={institute.website}
                      onChange={(e) => setInstitute({ ...institute, website: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="instituteAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-2" />
                      Address
                    </label>
                    <textarea
                      id="instituteAddress"
                      value={institute.address}
                      onChange={(e) => setInstitute({ ...institute, address: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-shadow"
                    />
                  </div>

                  <div>
                    <label htmlFor="instituteDescription" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      id="instituteDescription"
                      value={institute.description}
                      onChange={(e) => setInstitute({ ...institute, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-shadow"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                    <p className="text-sm text-gray-500">Choose how you want to be notified</p>
                  </div>
                  {saved && (
                    <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check size={16} /> Saved successfully
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Mail size={18} /> Email Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        { key: 'emailEnquiries', label: 'New enquiry notifications' },
                        { key: 'emailPayments', label: 'Payment confirmations' },
                        { key: 'emailStudents', label: 'Student activity updates' }
                      ].map(item => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Bell size={18} /> Push Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        { key: 'pushEnquiries', label: 'New enquiry alerts' },
                        { key: 'pushPayments', label: 'Payment alerts' },
                        { key: 'pushReminders', label: 'Class reminders' }
                      ].map(item => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Phone size={18} /> SMS Notifications
                    </h3>
                    <div className="space-y-3">
                      {[
                        { key: 'smsEnquiries', label: 'New enquiry SMS' },
                        { key: 'smsPayments', label: 'Payment SMS' }
                      ].map(item => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <span className="text-gray-700">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Security Settings</h2>
                    <p className="text-sm text-gray-500">Manage your account security</p>
                  </div>
                  {saved && (
                    <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check size={16} /> Password updated successfully
                    </span>
                  )}
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none pr-12 transition-shadow"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                        required
                        minLength={8}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none pr-12 transition-shadow"
                        placeholder="Enter new password (min 8 characters)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Lock size={18} />
                    Update Password
                  </button>
                </form>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Login Sessions</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Current Session</p>
                        <p className="text-sm text-gray-500">Windows • Chrome • Mumbai, India</p>
                        <p className="text-xs text-green-600 mt-1">Active now</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Current</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{t('appearanceSettings')}</h2>
                    <p className="text-sm text-gray-500">{t('customizeLook')}</p>
                  </div>
                  {saved && (
                    <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check size={16} /> {t('savedSuccessfully')}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('theme')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          setDarkMode(false);
                          localStorage.setItem('darkMode', 'false');
                          document.documentElement.classList.remove('dark');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${!darkMode ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                        aria-pressed={!darkMode}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                            <Sun className="text-yellow-500" size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{t('lightMode')}</p>
                            <p className="text-sm text-gray-500">{t('defaultTheme')}</p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setDarkMode(true);
                          localStorage.setItem('darkMode', 'true');
                          document.documentElement.classList.add('dark');
                        }}
                        className={`p-4 rounded-xl border-2 transition-all ${darkMode ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}
                        aria-pressed={darkMode}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                            <Moon className="text-gray-200" size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{t('darkMode')}</p>
                            <p className="text-sm text-gray-500">{t('easyOnEyes')}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Globe size={18} /> {t('language')}
                    </h3>
                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className="w-full max-w-xs px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      aria-label="Select language"
                    >
                      {availableLanguages.map((lang) => (
                        <option key={lang} value={lang}>
                          {languageNames[lang]}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">{t('selectLanguage')}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Save size={18} />
                    {t('savePreferences')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
