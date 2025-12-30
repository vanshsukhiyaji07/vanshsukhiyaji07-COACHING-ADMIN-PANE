import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  User,
  BookOpen,
  GraduationCap,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical
} from 'lucide-react';

const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 98765 43210',
      course: 'JEE Advanced',
      batch: '2025',
      joinDate: '2024-06-15',
      feeStatus: 'paid',
      parentName: 'Suresh Kumar',
      parentPhone: '+91 98765 43211',
      address: '123 Main Street, Mumbai'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      course: 'NEET Preparation',
      batch: '2025',
      joinDate: '2024-07-01',
      feeStatus: 'pending',
      parentName: 'Rajesh Sharma',
      parentPhone: '+91 87654 32110',
      address: '456 Park Avenue, Delhi'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      course: 'Foundation (Class 9-10)',
      batch: '2026',
      joinDate: '2024-04-10',
      feeStatus: 'paid',
      parentName: 'Vikram Patel',
      parentPhone: '+91 76543 21099',
      address: '789 College Road, Ahmedabad'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@email.com',
      phone: '+91 65432 10987',
      course: 'JEE Mains',
      batch: '2025',
      joinDate: '2024-05-20',
      feeStatus: 'partial',
      parentName: 'Anil Gupta',
      parentPhone: '+91 65432 10988',
      address: '321 Station Road, Pune'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 54321 09876',
      course: 'NEET Dropper Batch',
      batch: '2025',
      joinDate: '2024-08-01',
      feeStatus: 'paid',
      parentName: 'Harpreet Singh',
      parentPhone: '+91 54321 09877',
      address: '654 Garden Lane, Chandigarh'
    },
    {
      id: 6,
      name: 'Ananya Reddy',
      email: 'ananya.reddy@email.com',
      phone: '+91 43210 98765',
      course: 'JEE Advanced',
      batch: '2025',
      joinDate: '2024-06-01',
      feeStatus: 'paid',
      parentName: 'Venkat Reddy',
      parentPhone: '+91 43210 98766',
      address: '987 Lake View, Hyderabad'
    },
    {
      id: 7,
      name: 'Karthik Menon',
      email: 'karthik.menon@email.com',
      phone: '+91 32109 87654',
      course: 'Board + JEE',
      batch: '2026',
      joinDate: '2024-04-15',
      feeStatus: 'pending',
      parentName: 'Mohan Menon',
      parentPhone: '+91 32109 87655',
      address: '147 Beach Road, Kochi'
    },
    {
      id: 8,
      name: 'Divya Krishnan',
      email: 'divya.k@email.com',
      phone: '+91 21098 76543',
      course: 'NEET Preparation',
      batch: '2025',
      joinDate: '2024-07-15',
      feeStatus: 'paid',
      parentName: 'Krishna Krishnan',
      parentPhone: '+91 21098 76544',
      address: '258 Temple Street, Chennai'
    },
    {
      id: 9,
      name: 'Rohan Joshi',
      email: 'rohan.joshi@email.com',
      phone: '+91 10987 65432',
      course: 'Foundation (Class 9-10)',
      batch: '2027',
      joinDate: '2024-04-01',
      feeStatus: 'paid',
      parentName: 'Deepak Joshi',
      parentPhone: '+91 10987 65433',
      address: '369 Hill View, Jaipur'
    },
    {
      id: 10,
      name: 'Meera Nair',
      email: 'meera.nair@email.com',
      phone: '+91 09876 54321',
      course: 'JEE Mains',
      batch: '2025',
      joinDate: '2024-05-01',
      feeStatus: 'partial',
      parentName: 'Sunil Nair',
      parentPhone: '+91 09876 54322',
      address: '741 River Side, Trivandrum'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    batch: '',
    feeStatus: 'pending',
    parentName: '',
    parentPhone: '',
    address: ''
  });

  const feeStatusColors = {
    paid: { bg: 'bg-green-100', text: 'text-green-700' },
    pending: { bg: 'bg-red-100', text: 'text-red-700' },
    partial: { bg: 'bg-yellow-100', text: 'text-yellow-700' }
  };

  const courses = [
    'JEE Mains',
    'JEE Advanced',
    'NEET Preparation',
    'NEET Dropper Batch',
    'Foundation (Class 9-10)',
    'Board + JEE',
    'Board + NEET'
  ];

  const batches = ['2025', '2026', '2027'];

  // Filter and search
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.phone.includes(searchQuery);
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (student) => {
    setSelectedStudent(student);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedStudent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      batch: '2025',
      feeStatus: 'pending',
      parentName: '',
      parentPhone: '',
      address: ''
    });
    setModalMode('add');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newStudent = {
        ...formData,
        id: Math.max(...students.map(s => s.id)) + 1,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setStudents([newStudent, ...students]);
    } else if (modalMode === 'edit') {
      setStudents(students.map(s => 
        s.id === selectedStudent.id ? { ...formData, id: s.id, joinDate: s.joinDate } : s
      ));
    }
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Handle escape key to close modal
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
    total: students.length,
    jee: students.filter(s => s.course.includes('JEE')).length,
    neet: students.filter(s => s.course.includes('NEET')).length,
    foundation: students.filter(s => s.course.includes('Foundation')).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage all enrolled students</p>
        </div>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            aria-label="Export students data"
          >
            <Download size={20} />
            Export
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium"
            aria-label="Add new student"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.jee}</p>
              <p className="text-sm text-gray-500">JEE Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.neet}</p>
              <p className="text-sm text-gray-500">NEET Students</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.foundation}</p>
              <p className="text-sm text-gray-500">Foundation</p>
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
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
              aria-label="Search students"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
              aria-label="Filter by course"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th scope="col" className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student</th>
                <th scope="col" className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Course</th>
                <th scope="col" className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Batch</th>
                <th scope="col" className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Fee Status</th>
                <th scope="col" className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Join Date</th>
                <th scope="col" className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-700">{student.course}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-gray-900">{student.batch}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${feeStatusColors[student.feeStatus].bg} ${feeStatusColors[student.feeStatus].text}`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-500">{new Date(student.joinDate).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleView(student)}
                        className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        title="View details"
                        aria-label={`View ${student.name}'s details`}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit student"
                        aria-label={`Edit ${student.name}`}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete student"
                        aria-label={`Delete ${student.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
            </p>
            <nav className="flex items-center gap-2" aria-label="Pagination">
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
            </nav>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-gray-100 z-10">
              <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                {modalMode === 'view' ? 'Student Details' : modalMode === 'edit' ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {modalMode === 'view' && selectedStudent ? (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize mt-2 ${feeStatusColors[selectedStudent.feeStatus].bg} ${feeStatusColors[selectedStudent.feeStatus].text}`}>
                      {selectedStudent.feeStatus} Fee
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Phone size={16} />
                      <span className="text-sm font-medium">Phone</span>
                    </div>
                    <p className="font-semibold text-gray-900">{selectedStudent.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <BookOpen size={16} />
                      <span className="text-sm font-medium">Course</span>
                    </div>
                    <p className="font-semibold text-gray-900">{selectedStudent.course}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <GraduationCap size={16} />
                      <span className="text-sm font-medium">Batch</span>
                    </div>
                    <p className="font-semibold text-gray-900">{selectedStudent.batch}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">Join Date</span>
                    </div>
                    <p className="font-semibold text-gray-900">{new Date(selectedStudent.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User size={16} />
                    Parent/Guardian Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{selectedStudent.parentName}</span></p>
                    <p><span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-900">{selectedStudent.parentPhone}</span></p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-700">{selectedStudent.address}</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => { setModalMode('edit'); setFormData(selectedStudent); }}
                    className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Edit Student
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
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    placeholder="Enter student name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">Course *</label>
                    <select
                      id="course"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="batch" className="block text-sm font-semibold text-gray-700 mb-2">Batch *</label>
                    <select
                      id="batch"
                      value={formData.batch}
                      onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                    >
                      {batches.map(batch => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="feeStatus" className="block text-sm font-semibold text-gray-700 mb-2">Fee Status</label>
                  <select
                    id="feeStatus"
                    value={formData.feeStatus}
                    onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                  >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                
                <div className="border-t border-gray-100 pt-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Parent/Guardian Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-2">Parent Name</label>
                      <input
                        id="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                        placeholder="Parent name"
                      />
                    </div>
                    <div>
                      <label htmlFor="parentPhone" className="block text-sm font-semibold text-gray-700 mb-2">Parent Phone</label>
                      <input
                        id="parentPhone"
                        type="tel"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-shadow"
                    placeholder="Enter full address..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {modalMode === 'add' ? 'Add Student' : 'Save Changes'}
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

export default Students;
