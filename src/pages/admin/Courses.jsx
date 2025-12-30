import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  BookOpen,
  Users,
  Clock,
  IndianRupee,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Video,
  FileText
} from 'lucide-react';

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'JEE Mains Complete Course',
      category: 'JEE',
      description: 'Comprehensive preparation for JEE Mains covering Physics, Chemistry, and Mathematics with expert faculty.',
      duration: '12 months',
      fee: 85000,
      students: 245,
      instructor: 'Dr. Rajesh Verma',
      rating: 4.8,
      status: 'active',
      features: ['Live Classes', 'Recorded Lectures', 'Test Series', 'Doubt Sessions'],
      schedule: 'Mon-Sat, 6 AM - 8 AM'
    },
    {
      id: 2,
      name: 'JEE Advanced Intensive',
      category: 'JEE',
      description: 'Advanced level preparation focusing on IIT JEE with rigorous problem-solving and concept building.',
      duration: '10 months',
      fee: 120000,
      students: 156,
      instructor: 'Prof. Anita Sharma',
      rating: 4.9,
      status: 'active',
      features: ['Live Classes', 'Personal Mentoring', 'Mock Tests', 'Doubt Sessions'],
      schedule: 'Mon-Sat, 4 PM - 7 PM'
    },
    {
      id: 3,
      name: 'NEET Complete Preparation',
      category: 'NEET',
      description: 'Full medical entrance preparation covering Biology, Physics, and Chemistry for NEET aspirants.',
      duration: '12 months',
      fee: 95000,
      students: 312,
      instructor: 'Dr. Priya Menon',
      rating: 4.7,
      status: 'active',
      features: ['Live Classes', 'NCERT Focus', 'Test Series', 'Medical Guidance'],
      schedule: 'Mon-Sat, 7 AM - 10 AM'
    },
    {
      id: 4,
      name: 'NEET Dropper Batch',
      category: 'NEET',
      description: 'Intensive one-year program for students who want to improve their NEET scores.',
      duration: '11 months',
      fee: 110000,
      students: 89,
      instructor: 'Dr. Suresh Kumar',
      rating: 4.6,
      status: 'active',
      features: ['Daily Classes', 'Weekly Tests', 'Revision Sessions', '1-on-1 Mentoring'],
      schedule: 'Mon-Sat, 9 AM - 1 PM'
    },
    {
      id: 5,
      name: 'Foundation Course (Class 9-10)',
      category: 'Foundation',
      description: 'Build strong fundamentals in Science and Mathematics for future competitive exams.',
      duration: '24 months',
      fee: 65000,
      students: 178,
      instructor: 'Ms. Kavita Singh',
      rating: 4.5,
      status: 'active',
      features: ['Board + Competition', 'Weekly Tests', 'Parent Meetings', 'Activity Based'],
      schedule: 'Mon-Fri, 4 PM - 6 PM'
    },
    {
      id: 6,
      name: 'Board + JEE Integrated',
      category: 'JEE',
      description: 'Balanced preparation for Class 11-12 boards along with JEE Mains & Advanced.',
      duration: '24 months',
      fee: 145000,
      students: 203,
      instructor: 'Prof. Amit Patel',
      rating: 4.8,
      status: 'active',
      features: ['Dual Focus', 'Flexible Schedule', 'Complete Material', 'Doubt Support'],
      schedule: 'Mon-Sat, 3 PM - 6 PM'
    },
    {
      id: 7,
      name: 'Crash Course - JEE Mains',
      category: 'JEE',
      description: 'Last-minute intensive preparation covering important topics and revision.',
      duration: '3 months',
      fee: 35000,
      students: 67,
      instructor: 'Dr. Rajesh Verma',
      rating: 4.4,
      status: 'inactive',
      features: ['Revision Focus', 'Mock Tests', 'Shortcut Techniques', 'PYQ Analysis'],
      schedule: 'Daily, 6 AM - 12 PM'
    },
    {
      id: 8,
      name: 'Board + NEET Integrated',
      category: 'NEET',
      description: 'Comprehensive program for Class 11-12 boards along with NEET preparation.',
      duration: '24 months',
      fee: 140000,
      students: 167,
      instructor: 'Dr. Priya Menon',
      rating: 4.7,
      status: 'active',
      features: ['NCERT Mastery', 'Board Excellence', 'NEET Focus', 'Complete Support'],
      schedule: 'Mon-Sat, 2 PM - 5 PM'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    duration: '',
    fee: '',
    instructor: '',
    status: 'active',
    features: [],
    schedule: ''
  });

  const [featureInput, setFeatureInput] = useState('');

  const categories = ['JEE', 'NEET', 'Foundation', 'Board'];
  const statusColors = {
    active: { bg: 'bg-green-100', text: 'text-green-700' },
    inactive: { bg: 'bg-gray-100', text: 'text-gray-700' }
  };

  // Filter and search
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (course) => {
    setSelectedCourse(course);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormData({ ...course, fee: course.fee.toString() });
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      duration: '',
      fee: '',
      instructor: '',
      status: 'active',
      features: [],
      schedule: ''
    });
    setModalMode('add');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      fee: parseInt(formData.fee),
      students: formData.students || 0,
      rating: formData.rating || 0
    };
    
    if (modalMode === 'add') {
      const newCourse = {
        ...courseData,
        id: Math.max(...courses.map(c => c.id)) + 1
      };
      setCourses([newCourse, ...courses]);
    } else if (modalMode === 'edit') {
      setCourses(courses.map(c => 
        c.id === selectedCourse.id ? { ...courseData, id: c.id, students: c.students, rating: c.rating } : c
      ));
    }
    setShowModal(false);
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const removeFeature = (feature) => {
    setFormData({ ...formData, features: formData.features.filter(f => f !== feature) });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal]);

  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
    avgRating: (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage all coaching courses and programs</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium"
          aria-label="Add new course"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Active Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              <p className="text-sm text-gray-500">Total Enrolled</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
              <p className="text-sm text-gray-500">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by course name or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
              aria-label="Search courses"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-2 ${course.category === 'JEE' ? 'bg-blue-500' : course.category === 'NEET' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[course.status].bg} ${statusColors[course.status].text}`}>
                  {course.status}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} className="text-gray-400" />
                  <span>{course.students} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IndianRupee size={16} className="text-gray-400" />
                  <span className="font-semibold text-gray-900">₹{course.fee.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleView(course)}
                  className="flex-1 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  aria-label={`View ${course.name} details`}
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label={`Edit ${course.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label={`Delete ${course.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                currentPage === i + 1
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              aria-label={`Page ${i + 1}`}
              aria-current={currentPage === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-100 z-10">
              <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                {modalMode === 'view' ? 'Course Details' : modalMode === 'edit' ? 'Edit Course' : 'Add New Course'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {modalMode === 'view' && selectedCourse ? (
              <div className="p-6 space-y-6">
                <div className={`h-3 rounded-full ${selectedCourse.category === 'JEE' ? 'bg-blue-500' : selectedCourse.category === 'NEET' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedCourse.status].bg} ${statusColors[selectedCourse.status].text}`}>
                        {selectedCourse.status}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                        {selectedCourse.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary-600">₹{selectedCourse.fee.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Course Fee</p>
                  </div>
                </div>

                <p className="text-gray-700">{selectedCourse.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">{selectedCourse.duration}</p>
                    <p className="text-xs text-gray-500">Duration</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900">{selectedCourse.students}</p>
                    <p className="text-xs text-gray-500">Students</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" fill="currentColor" />
                    <p className="font-semibold text-gray-900">{selectedCourse.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Calendar className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="font-semibold text-gray-900 text-sm">{selectedCourse.schedule.split(',')[0]}</p>
                    <p className="text-xs text-gray-500">Schedule</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Instructor</h4>
                  <p className="text-gray-700">{selectedCourse.instructor}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Course Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-gray-700 border border-gray-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setModalMode('edit'); setFormData({ ...selectedCourse, fee: selectedCourse.fee.toString() }); }}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label htmlFor="courseName" className="block text-sm font-semibold text-gray-700 mb-2">Course Name *</label>
                  <input
                    id="courseName"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    placeholder="Enter course name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-shadow"
                    placeholder="Enter course description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                    <input
                      id="duration"
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="e.g., 12 months"
                    />
                  </div>
                  <div>
                    <label htmlFor="fee" className="block text-sm font-semibold text-gray-700 mb-2">Fee (₹) *</label>
                    <input
                      id="fee"
                      type="number"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="Enter fee amount"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="instructor" className="block text-sm font-semibold text-gray-700 mb-2">Instructor *</label>
                    <input
                      id="instructor"
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="Instructor name"
                    />
                  </div>
                  <div>
                    <label htmlFor="schedule" className="block text-sm font-semibold text-gray-700 mb-2">Schedule</label>
                    <input
                      id="schedule"
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="e.g., Mon-Sat, 6 AM - 8 AM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Features</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="Add a feature and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium">
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="hover:text-primary-900"
                          aria-label={`Remove ${feature}`}
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {modalMode === 'add' ? 'Add Course' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
