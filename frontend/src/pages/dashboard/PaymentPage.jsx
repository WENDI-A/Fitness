import React, { useState, useEffect } from "react";
import { FaCreditCard, FaCalendarAlt, FaDownload, FaFilter, FaSearch, FaCheckCircle, FaClock, FaTimes, FaTimesCircle, FaHistory, FaMoneyBillWave, FaMobileAlt, FaUniversity, FaPlus } from "react-icons/fa";
import { getUserPayments, createPayment } from "../../services/api/paymentApi";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

const PaymentPage = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("history");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const loadPayments = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const data = await getUserPayments(user.id);
        setPayments(data || []);
      } catch (error) {
        console.error("Failed to load payments:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [user?.id]);

  const [newPayment, setNewPayment] = useState({
    amount: "",
    method: "card",
    description: "",
    transactionId: ""
  });

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const createdPayment = await createPayment({
        user_id: user?.id || 1,
        amount: parseFloat(newPayment.amount),
        currency: "ETB",
        payment_method: newPayment.method,
        description: newPayment.description,
        transaction_id: newPayment.transactionId,
        status: 'pending'
      });

      console.log('Payment created:', createdPayment);

      // Re-fetch payments to show updated list
      try {
        const updatedPayments = await getUserPayments(user?.id);
        setPayments(updatedPayments && updatedPayments.length > 0 ? updatedPayments : [...payments, createdPayment.payment || createdPayment]);
      } catch (error) {
        console.error("Error fetching payments:", error);
        // If fetch fails, manually add to list
        setPayments(prev => [createdPayment.payment || createdPayment, ...prev]);
      }

      // Reset form
      setNewPayment({
        amount: "",
        method: "card",
        description: "",
        transactionId: ""
      });
      setShowAddModal(false);
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <FaClock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <FaTimesCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FaClock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const totalPaid = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your payments and billing history</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 active:scale-95"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add Payment</span>
        </button>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Total Paid</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{totalPaid.toLocaleString()} <span className="text-sm text-gray-500 font-normal">ETB</span></p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Pending</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{pendingAmount.toLocaleString()} <span className="text-sm text-gray-500 font-normal">ETB</span></p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <FaClock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Methods</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">3</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <FaCreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === "history"
                ? "border-red-500 text-red-600 dark:text-red-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              <FaHistory className="inline w-4 h-4 mr-2" />
              Payment History
            </button>
            <button
              onClick={() => setActiveTab("methods")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === "methods"
                ? "border-red-500 text-red-600 dark:text-red-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
            >
              <FaCreditCard className="inline w-4 h-4 mr-2" />
              Payment Methods
            </button>
          </nav>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    <FaDownload className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">Description</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">Method</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">Amount</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="py-4 px-6 text-gray-900 dark:text-gray-200 whitespace-nowrap">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{payment.description}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">ID: {payment.transactionId}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{payment.method}</td>
                          <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                            {Number(payment.amount).toLocaleString()} {payment.currency}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(payment.status)}
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium transition-colors">
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                      {payments.length === 0 && (
                        <tr>
                          <td colSpan="6" className="py-12 text-center text-gray-500 dark:text-gray-400">
                            No payment history found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "methods" && (
              <motion.div
                key="methods"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Saved Payment Methods</h3>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="text-red-600 dark:text-red-400 font-medium hover:underline"
                  >
                    + Add New Method
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden shadow-lg group cursor-pointer">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <FaCreditCard className="w-8 h-8 text-white/80" />
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/10">
                        Primary
                      </span>
                    </div>
                    <div className="mb-4 relative z-10">
                      <p className="font-mono text-xl tracking-wider">**** **** **** 1234</p>
                    </div>
                    <div className="flex justify-between items-end relative z-10">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Card Holder</p>
                        <p className="font-medium">{user?.first_name} {user?.last_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Expires</p>
                        <p className="font-medium">12/26</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-4 h-full">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                        <FaUniversity className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">Bank Transfer</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Commercial Bank of Ethiopia</p>
                        <p className="text-xs text-gray-400 mt-1">Account ending in 8899</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAddModal(true)}
                    className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-red-500 hover:text-red-500 transition-all min-h-[180px]"
                  >
                    <FaPlus className="w-8 h-8 mb-2" />
                    <span className="font-medium">Add Payment Method</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Payment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Payment</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmitPayment} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount (ETB)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">ETB</span>
                    </div>
                    <input
                      type="number"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['card', 'mobile', 'bank', 'cash'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setNewPayment({ ...newPayment, method })}
                        className={`py-2 px-3 rounded-lg border text-sm font-medium capitalize transition-all ${newPayment.method === method
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                          : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newPayment.description}
                    onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g. Monthly Membership"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPayment.transactionId}
                    onChange={(e) => setNewPayment({ ...newPayment, transactionId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Transaction reference"
                  />
                </div>

                <div className="pt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-red-500/30 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Add Payment"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
