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
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Enquiries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 98765 43210',
      course: 'JEE Advanced',
      message: 'I am interested in the JEE Advanced course. Can you provide details about the batch timings and fee structure?',
      status: 'new',
      date: '2024-01-15',
      source: 'Website'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      course: 'NEET Preparation',
      message: 'Looking for weekend batches for NEET preparation. Do you offer any crash courses?',
      status: 'contacted',
      date: '2024-01-14',
      source: 'Phone'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      course: 'Foundation (Class 9-10)',
      message: 'My son is in Class 9. I want to know about the foundation course curriculum.',
      status: 'converted',
      date: '2024-01-13',
      source: 'Walk-in'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.gupta@email.com',
      phone: '+91 65432 10987',
      course: 'JEE Mains',
      message: 'Is there any scholarship available for meritorious students?',
      status: 'new',
      date: '2024-01-12',
      source: 'Website'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 54321 09876',
      course: 'NEET Dropper Batch',
      message: 'I dropped a year for NEET. Looking for intensive coaching.',
      status: 'contacted',
      date: '2024-01-11',
      source: 'Referral'
    },
    {
      id: 6,
      name: 'Ananya Reddy',
      email: 'ananya.reddy@email.com',
      phone: '+91 43210 98765',
      course: 'JEE Advanced',
      message: 'What is the success rate of your JEE Advanced students?',
      status: 'closed',
      date: '2024-01-10',
      source: 'Website'
    },
    {
      id: 7,
      name: 'Karthik Menon',
      email: 'karthik.menon@email.com',
      phone: '+91 32109 87654',
      course: 'Board + JEE',
      message: 'Looking for integrated coaching for Class 11-12 boards along with JEE.',
      status: 'new',
      date: '2024-01-09',
      source: 'Website'
    },
    {
      id: 8,
      name: 'Divya Krishnan',
      email: 'divya.k@email.com',
      phone: '+91 21098 76543',
      course: 'NEET Preparation',
      message: 'Do you provide hostel facilities for outstation students?',
      status: 'contacted',
      date: '2024-01-08',
      source: 'Phone'
    },
    {
      id: 9,
      name: 'Rohan Joshi',
      email: 'rohan.joshi@email.com',
      phone: '+91 10987 65432',
      course: 'Foundation (Class 9-10)',
      message: 'Can I get a demo class before enrolling?',
      status: 'converted',
      date: '2024-01-07',
      source: 'Walk-in'
    },
    {
      id: 10,
      name: 'Meera Nair',
      email: 'meera.nair@email.com',
      phone: '+91 09876 54321',
      course: 'JEE Mains',
      message: 'What study material do you provide?',
      status: 'new',
      date: '2024-01-06',
      source: 'Website'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    status: 'new',
    source: 'Website'
  });

  const statusColors = {
    new: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Clock },
    contacted: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: MessageSquare },
    converted: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
    closed: { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle }
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

  const sources = ['Website', 'Phone', 'Walk-in', 'Referral', 'Social Media'];

  // Filter and search
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setModalMode('view');
    setShowModal(true);
  };

  const handleEdit = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setFormData(enquiry);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedEnquiry(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      message: '',
      status: 'new',
      source: 'Website'
    });
    setModalMode('add');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(enquiries.filter(e => e.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newEnquiry = {
        ...formData,
        id: Math.max(...enquiries.map(e => e.id)) + 1,
        date: new Date().toISOString().split('T')[0]
      };
      setEnquiries([newEnquiry, ...enquiries]);
    } else if (modalMode === 'edit') {
      setEnquiries(enquiries.map(e => 
        e.id === selectedEnquiry.id ? { ...formData, id: e.id, date: e.date } : e
      ));
    }
    setShowModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setEnquiries(enquiries.map(e => 
      e.id === id ? { ...e, status: newStatus } : e
    ));
  };

  const stats = {
    total: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    converted: enquiries.filter(e => e.status === 'converted').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-gray-600">Manage and track all student enquiries</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Add Enquiry
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total Enquiries</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
              <p className="text-xs text-gray-500">New</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.contacted}</p>
              <p className="text-xs text-gray-500">Contacted</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.converted}</p>
              <p className="text-xs text-gray-500">Converted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Course</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Source</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEnquiries.map((enquiry) => {
                const StatusIcon = statusColors[enquiry.status].icon;
                return (
                  <tr key={enquiry.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {enquiry.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{enquiry.name}</p>
                          <p className="text-sm text-gray-500">{enquiry.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-700">{enquiry.course}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600">{enquiry.source}</span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${statusColors[enquiry.status].bg} ${statusColors[enquiry.status].text} border-0 cursor-pointer`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-500">{new Date(enquiry.date).toLocaleDateString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleView(enquiry)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(enquiry)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium ${
                    currentPage === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'view' ? 'Enquiry Details' : modalMode === 'edit' ? 'Edit Enquiry' : 'Add New Enquiry'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {modalMode === 'view' && selectedEnquiry ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedEnquiry.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedEnquiry.name}</h3>
                    <p className="text-gray-600">{selectedEnquiry.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Phone size={16} />
                      <span className="text-sm">Phone</span>
                    </div>
                    <p className="font-medium">{selectedEnquiry.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <BookOpen size={16} />
                      <span className="text-sm">Course</span>
                    </div>
                    <p className="font-medium">{selectedEnquiry.course}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <Calendar size={16} />
                      <span className="text-sm">Date</span>
                    </div>
                    <p className="font-medium">{new Date(selectedEnquiry.date).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                      <User size={16} />
                      <span className="text-sm">Source</span>
                    </div>
                    <p className="font-medium">{selectedEnquiry.source}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <MessageSquare size={16} />
                    <span className="text-sm">Message</span>
                  </div>
                  <p className="text-gray-700">{selectedEnquiry.message}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setModalMode('edit'); setFormData(selectedEnquiry); }}
                    className="flex-1 bg-primary-600 text-white py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors"
                  >
                    Edit Enquiry
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-200 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Enter student name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Interest</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      {sources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {modalMode === 'edit' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                    placeholder="Enter enquiry details..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors"
                  >
                    {modalMode === 'add' ? 'Add Enquiry' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border border-gray-200 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-colors"
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

export default Enquiries;
