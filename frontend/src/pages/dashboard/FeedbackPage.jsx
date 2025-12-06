import React, { useState, useEffect } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown, FaComment, FaFilter, FaPlus, FaUser, FaCalendarAlt, FaTimes, FaQuoteLeft } from "react-icons/fa";
import { getUserFeedback, createFeedback } from "../../services/api/feedbackApi";
import { getAllTrainers } from "../../services/api/trainerApi";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

const staticTrainers = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Mike Wilson" },
  { id: 3, name: "David Brown" }
];

const FeedbackPage = ({ user }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showNewFeedbackForm, setShowNewFeedbackForm] = useState(false);
  const [filterType] = useState("all");



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [feedbackData, trainersData] = await Promise.all([
          getUserFeedback(user?.id),
          getAllTrainers()
        ]);
        setFeedbackList(feedbackData || []);
        setTrainers(trainersData && trainersData.length > 0 ? trainersData : staticTrainers);
      } catch (error) {
        console.error('Error fetching data:', error);
        setTrainers(staticTrainers);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const [newFeedback, setNewFeedback] = useState({
    type: "trainer",
    targetName: "",
    rating: 5,
    comment: "",
    category: "Personal Training"
  });

  const filteredFeedback = feedbackList
    .filter(feedback => filterType === "all" || feedback.type === filterType)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getTrainerIdByName = (name) => {
    const trainer = trainers.find((t) => t.name === name);
    return trainer ? trainer.id : null;
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!newFeedback.comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    try {
      setSubmitting(true);
      const trainerId = getTrainerIdByName(newFeedback.targetName);

      const createdFeedback = await createFeedback({
        user_id: user?.id || 1,
        rating: newFeedback.rating,
        comment: newFeedback.comment,
        feedback_type: newFeedback.type,
        trainer_id: trainerId,
        is_anonymous: false
      });

      // Update feedback list with new feedback
      // Handle both response formats (direct object or nested in 'feedback')
      const newFeedbackItem = createdFeedback.feedback || createdFeedback;
      setFeedbackList([newFeedbackItem, ...feedbackList]);

      // Reset form
      setNewFeedback({
        type: "trainer",
        targetName: "",
        rating: 5,
        comment: "",
        category: "Personal Training"
      });
      setShowNewFeedbackForm(false);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${star <= rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
              } ${interactive ? "hover:text-yellow-400 cursor-pointer transform hover:scale-110 transition-transform" : ""}`}
            disabled={!interactive}
          >
            <FaStar className={interactive ? "w-8 h-8" : "w-4 h-4"} />
          </button>
        ))}
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "published": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "rejected": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Personal Training": return "🏋️";
      case "Group Classes": return "👥";
      case "Facilities": return "🏢";
      case "Service": return "🎯";
      default: return "💬";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback & Reviews</h1>
          <p className="text-gray-500 dark:text-gray-400">Share your experience and help us improve</p>
        </div>
        <button
          onClick={() => setShowNewFeedbackForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 active:scale-95"
        >
          <FaPlus className="w-4 h-4" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Stats/Overview Cards could go here */}

      {/* Feedback List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredFeedback.map((feedback, index) => (
              <motion.div
                key={feedback.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl shadow-inner">
                      {getCategoryIcon(feedback.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{feedback.targetName || "General Feedback"}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{feedback.category}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                      {feedback.status || "Pending"}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>{new Date(feedback.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4 relative">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-100 dark:text-gray-700 w-8 h-8 -z-10" />
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed relative z-0">
                    {feedback.comment}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    {renderStars(feedback.rating)}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      <FaThumbsUp className="w-4 h-4" />
                      <span>{feedback.helpful || 0}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFeedback.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FaComment className="w-10 h-10 text-gray-300 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No reviews found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                You haven't submitted any feedback yet. Share your experience to help us improve!
              </p>
              <button
                onClick={() => setShowNewFeedbackForm(true)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Write First Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* New Feedback Form Modal */}
      <AnimatePresence>
        {showNewFeedbackForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Write a Review</h3>
                <button
                  onClick={() => setShowNewFeedbackForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmitFeedback} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Review Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewFeedback({ ...newFeedback, type: 'trainer' })}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${newFeedback.type === 'trainer'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      Trainer
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewFeedback({ ...newFeedback, type: 'general' })}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${newFeedback.type === 'general'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      General
                    </button>
                  </div>
                </div>

                {newFeedback.type === 'trainer' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Trainer</label>
                    <select
                      value={newFeedback.targetName}
                      onChange={(e) => setNewFeedback({ ...newFeedback, targetName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a trainer...</option>
                      {trainers.map((trainer) => (
                        <option key={trainer.id} value={trainer.name}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    {renderStars(newFeedback.rating, true, (rating) => setNewFeedback({ ...newFeedback, rating }))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                    placeholder="Share your experience..."
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                    required
                  />
                </div>

                <div className="pt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewFeedbackForm(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-red-500/30 disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
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

export default FeedbackPage;