import React, { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import { FaCheck, FaTimes, FaUser } from 'react-icons/fa';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getUsersForAdmin();
      // support both { users: [...] } and [...] responses
      setUsers(data?.users ?? data ?? []);
    } catch (err) {
      setError(err.message || 'Unable to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateLocalUser = (id, patch) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  };

  const handleAccept = async (id) => {
    try {
      await ApiService.acceptUser(id);
      updateLocalUser(id, { status: 'accepted' });
    } catch (err) {
      console.error(err);
      setError('Action failed');
    }
  };

  const handleDecline = async (id) => {
    try {
      await ApiService.declineUser(id);
      updateLocalUser(id, { status: 'declined' });
    } catch (err) {
      console.error(err);
      setError('Action failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin — User Management</h2>
        <div className="text-sm text-gray-500">Approve or decline new users</div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading users...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm text-gray-600">Name</th>
                  <th className="px-4 py-2 text-sm text-gray-600">Email</th>
                  <th className="px-4 py-2 text-sm text-gray-600">Role</th>
                  <th className="px-4 py-2 text-sm text-gray-600">Status</th>
                  <th className="px-4 py-2 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id || u._id} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                          <FaUser />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">{u.first_name} {u.last_name}</div>
                          <div className="text-xs text-gray-500">{u.username ?? u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 capitalize">{u.role || 'member'}</td>
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
                        <button onClick={() => handleAccept(u.id ?? u._id)} className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                          <FaCheck className="mr-2" /> Accept
                        </button>
                        <button onClick={() => handleDecline(u.id ?? u._id)} className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                          <FaTimes className="mr-2" /> Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
