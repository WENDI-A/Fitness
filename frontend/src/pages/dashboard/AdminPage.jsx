import React, { useEffect, useState } from 'react';
import { 
  getUsersForAdmin, 
  acceptUser, 
  declineUser,
  getAllSubscriptions,
  updateSubscriptionStatus,
  getAllPayments,
  updatePaymentStatus,
  getAllFeedback,
  acceptFeedback,
  declineFeedback
} from '../../services/api/adminApi';
import { 
  FaCheck, 
  FaTimes, 
  FaUser, 
  FaUsers, 
  FaIdCard, 
  FaCreditCard, 
  FaComments,
  FaEdit,
  FaStar
} from 'react-icons/fa';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'subscriptions', label: 'Subscriptions', icon: FaIdCard },
    { id: 'payments', label: 'Payments', icon: FaCreditCard },
    { id: 'feedback', label: 'Feedback', icon: FaComments }
  ];

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      switch (activeTab) {
        case 'users': {
          const userData = await getUsersForAdmin();
          if (userData && userData.users) {
            setUsers(Array.isArray(userData.users) ? userData.users : []);
          } else {
            setUsers([]);
            console.warn('Unexpected users data format:', userData);
          }
          break;
        }
        case 'subscriptions': {
          const subData = await getAllSubscriptions();
          if (subData && subData.subscriptions) {
            setSubscriptions(Array.isArray(subData.subscriptions) ? subData.subscriptions : []);
          } else {
            setSubscriptions([]);
            console.warn('Unexpected subscriptions data format:', subData);
          }
          break;
        }
        case 'payments': {
          const payData = await getAllPayments();
          if (payData && payData.payments) {
            setPayments(Array.isArray(payData.payments) ? payData.payments : []);
          } else {
            setPayments([]);
            console.warn('Unexpected payments data format:', payData);
          }
          break;
        }
        case 'feedback': {
          const feedData = await getAllFeedback();
          if (feedData && feedData.feedback) {
            setFeedback(Array.isArray(feedData.feedback) ? feedData.feedback : []);
          } else {
            setFeedback([]);
            console.warn('Unexpected feedback data format:', feedData);
          }
          break;
        }
      }
    } catch (err) {
      setError(err.message || 'Unable to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  // User Management Functions
  const updateLocalUser = (id, patch) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  };

  const handleAcceptUser = async (id) => {
    try {
      await acceptUser(id);
      updateLocalUser(id, { status: 'accepted' });
    } catch {
      setError('Failed to accept user');
    }
  };

  const handleDeclineUser = async (id) => {
    try {
      await declineUser(id);
      updateLocalUser(id, { status: 'declined' });
    } catch {
      setError('Failed to decline user');
    }
  };

  // Subscription Management Functions
  const updateLocalSubscription = (id, patch) => {
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const handleUpdateSubscription = async (id, status, payment_status) => {
    try {
      await updateSubscriptionStatus(id, status, payment_status);
      updateLocalSubscription(id, { status, payment_status });
    } catch {
      setError('Failed to update subscription');
    }
  };

  // Payment Management Functions
  const updateLocalPayment = (id, patch) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const handleUpdatePayment = async (id, status, notes = '') => {
    try {
      await updatePaymentStatus(id, status, notes);
      updateLocalPayment(id, { status, notes });
    } catch {
      setError('Failed to update payment');
    }
  };

  // Feedback Management Functions
  const updateLocalFeedback = (id, patch) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const handleAcceptFeedback = async (id) => {
    try {
      await acceptFeedback(id);
      updateLocalFeedback(id, { status: 'reviewed' });
    } catch {
      setError('Failed to accept feedback');
    }
  };

  const handleDeclineFeedback = async (id) => {
    try {
      await declineFeedback(id);
      updateLocalFeedback(id, { status: 'resolved' });
    } catch {
      setError('Failed to resolve feedback');
    }
  };

  const renderUsers = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Name</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Email</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Role</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-gray-100 dark:border-gray-700">
              <td className="px-4 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <FaUser />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">{u.first_name} {u.last_name}</div>
                    <div className="text-xs text-gray-500">ID: {u.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{u.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">{u.role || 'member'}</td>
              <td className="px-4 py-3 text-sm">
                {u.status === 'accepted' ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Accepted</span>
                ) : u.status === 'declined' ? (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Declined</span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleAcceptUser(u.id)} 
                    className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    <FaCheck className="mr-1" /> Accept
                  </button>
                  <button 
                    onClick={() => handleDeclineUser(u.id)} 
                    className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    <FaTimes className="mr-1" /> Decline
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">User</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Membership</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Price</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Payment</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s) => (
            <tr key={s.id} className="border-t border-gray-100 dark:border-gray-700">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800 dark:text-white">
                  {s.User ? `${s.User.first_name} ${s.User.last_name}` : 'Unknown User'}
                </div>
                <div className="text-xs text-gray-500">{s.User?.email}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {s.membership_type || s.Membership?.name || 'N/A'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                ${s.price || s.Membership?.price || 'N/A'}
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  s.status === 'active' ? 'bg-green-100 text-green-700' :
                  s.status === 'expired' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {s.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  s.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                  s.payment_status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {s.payment_status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleUpdateSubscription(s.id, 'active', 'paid')} 
                    className="flex items-center px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    <FaCheck className="mr-1" /> Approve
                  </button>
                  <button 
                    onClick={() => handleUpdateSubscription(s.id, 'cancelled', 'failed')} 
                    className="flex items-center px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    <FaTimes className="mr-1" /> Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPayments = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">User</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Amount</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Method</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Date</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t border-gray-100 dark:border-gray-700">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800 dark:text-white">
                  {p.User ? `${p.User.first_name} ${p.User.last_name}` : 'Unknown User'}
                </div>
                <div className="text-xs text-gray-500">{p.User?.email}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {p.amount} {p.currency}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">
                {p.payment_method?.replace('_', ' ')}
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  p.status === 'completed' ? 'bg-green-100 text-green-700' :
                  p.status === 'failed' ? 'bg-red-100 text-red-700' :
                  p.status === 'refunded' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {p.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {new Date(p.payment_date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleUpdatePayment(p.id, 'completed')} 
                    className="flex items-center px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    <FaCheck className="mr-1" /> Approve
                  </button>
                  <button 
                    onClick={() => handleUpdatePayment(p.id, 'failed')} 
                    className="flex items-center px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  >
                    <FaTimes className="mr-1" /> Decline
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderFeedback = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">User</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Type</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Rating</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Comment</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Status</th>
            <th className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((f) => (
            <tr key={f.id} className="border-t border-gray-100 dark:border-gray-700">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800 dark:text-white">
                  {f.is_anonymous ? 'Anonymous' : f.User ? `${f.User.first_name} ${f.User.last_name}` : 'Unknown User'}
                </div>
                {!f.is_anonymous && f.User && (
                  <div className="text-xs text-gray-500">{f.User.email}</div>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 capitalize">
                {f.feedback_type}
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center">
                  {[...Array(f.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                  <span className="ml-1 text-gray-600 dark:text-gray-300">({f.rating}/5)</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                <div className="truncate">{f.comment || 'No comment'}</div>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  f.status === 'reviewed' ? 'bg-green-100 text-green-700' :
                  f.status === 'resolved' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {f.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleAcceptFeedback(f.id)} 
                    className="flex items-center px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                  >
                    <FaCheck className="mr-1" /> Review
                  </button>
                  <button 
                    onClick={() => handleDeclineFeedback(f.id)} 
                    className="flex items-center px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                  >
                    <FaCheck className="mr-1" /> Resolve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    const data = {
      users,
      subscriptions,
      payments,
      feedback
    }[activeTab];

    if (loading) {
      return <div className="text-center py-8 text-gray-500">Loading...</div>;
    }

    if (error) {
      return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    if (!data || data.length === 0) {
      return <div className="text-center py-8 text-gray-500">No {activeTab} found</div>;
    }

    switch (activeTab) {
      case 'users':
        return renderUsers();
      case 'subscriptions':
        return renderSubscriptions();
      case 'payments':
        return renderPayments();
      case 'feedback':
        return renderFeedback();
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h2>
        <div className="text-sm text-gray-500">Manage users, subscriptions, payments, and feedback</div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              <IconComponent className="mr-2" size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
