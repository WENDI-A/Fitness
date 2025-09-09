import React, { useState, useEffect } from "react";
import { FaCreditCard, FaCalendarAlt, FaDownload, FaFilter, FaSearch, FaCheckCircle, FaClock, FaTimes, FaTimesCircle, FaHistory } from "react-icons/fa";
import { getUserPayments, createPayment } from "../../services/api/paymentApi";

const PaymentPage = ({ user }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const staticPayments = [
    {
      id: 1,
      amount: 4000,
      currency: "ETB",
      method: "Card",
      status: "completed",
      date: "2025-01-15",
      description: "Monthly Membership - Individual",
      transactionId: "TXN123456789"
    },
    {
      id: 2,
      amount: 1500,
      currency: "ETB",
      method: "Cash",
      status: "completed",
      date: "2025-01-10",
      description: "Personal Training Session",
      transactionId: "TXN123456788"
    },
    {
      id: 3,
      amount: 4000,
      currency: "ETB",
      method: "Bank Transfer",
      status: "pending",
      date: "2025-01-01",
      description: "Monthly Membership - Individual",
      transactionId: "TXN123456787"
    }
  ];

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await getUserPayments(user?.id);
        setPayments(data || []);
      } catch (error) {
        console.error("Failed to load payments:", error);
        // Fallback to static data
        setPayments(staticPayments);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [user?.id]);

  const [activeTab, setActiveTab] = useState("history");
  // const [searchTerm, setSearchTerm] = useState("");
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
      const updatedPayments = await getUserPayments(user?.id);
      setPayments(updatedPayments || [...payments, createdPayment.payment]);
      
      // Reset form
      setNewPayment({
        amount: "",
        method: "credit_card",
        description: ""
      });
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
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
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalPaid = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your payments and billing history</p>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} ETB</p>
            </div>
            <FaCheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Pending Payments</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingAmount.toLocaleString()} ETB</p>
            </div>
            <FaClock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Payment Methods</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">3</p>
            </div>
            <FaCreditCard className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("history")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "history"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaHistory className="inline w-4 h-4 mr-2" />
              Payment History
            </button>
            <button
              onClick={() => setActiveTab("methods")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "methods"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaCreditCard className="inline w-4 h-4 mr-2" />
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "add"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaCalendarAlt className="inline w-4 h-4 mr-2" />
              Add Payment
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "history" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Payments</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <FaDownload className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-gray-800">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{payment.description}</p>
                            <p className="text-sm text-gray-500">ID: {payment.transactionId}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{payment.method}</td>
                        <td className="py-4 px-4 font-medium text-gray-800">
                          {payment.amount.toLocaleString()} {payment.currency}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payment.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "methods" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Saved Payment Methods</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FaCreditCard className="w-6 h-6 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-800">**** **** **** 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/26</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Primary
                    </span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <FaCreditCard className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-800">Bank Transfer</p>
                      <p className="text-sm text-gray-600">Commercial Bank of Ethiopia</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab("add")}
                className="w-full md:w-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Add Payment Method
              </button>
            </div>
          )}

          {activeTab === "add" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Add New Payment</h3>
              
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (ETB)
                    </label>
                    <input
                      type="number"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={newPayment.method}
                      onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="mobile">Mobile Money</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newPayment.description}
                    onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Payment description"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPayment.transactionId}
                    onChange={(e) => setNewPayment({...newPayment, transactionId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Transaction reference"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Add Payment"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
