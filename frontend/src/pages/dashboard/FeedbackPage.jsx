import React, { useState, useEffect } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown, FaComment, FaFilter, FaPlus, FaUser, FaCalendarAlt } from "react-icons/fa";
import { getUserFeedback, createFeedback } from "../../services/api/feedbackApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FeedbackPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        setLoading(true);
        const data = await getUserFeedback(user?.id);
        setFeedbackList(data || []);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        // Keep static data as fallback
        setFeedbackList([
          {
            id: 1,
            type: "trainer",
            targetName: "Sarah Johnson",
            rating: 5,
            comment: "Excellent personal trainer! Very knowledgeable and motivating.",
            date: "2024-12-28",
            status: "published",
            helpful: 12,
            category: "Personal Training"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeedback();
  }, [user?.id]);

  /* const staticFeedback = [
    {
      id: 1,
      type: "trainer",
      targetName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent personal trainer! Very knowledgeable and motivating. Sarah helped me achieve my fitness goals faster than I expected.",
      date: "2024-12-28",
      status: "published",
      helpful: 12,
      category: "Personal Training"
    },
    {
      id: 2,
      type: "class",
      targetName: "HIIT Bootcamp",
      rating: 4,
      comment: "Great workout class, very challenging but fun. The instructor was energetic and the music was perfect.",
      date: "2024-12-25",
      status: "published",
      helpful: 8,
      category: "Group Classes"
    },
    {
      id: 3,
      type: "facility",
      targetName: "Gym Equipment",
      rating: 3,
      comment: "Most equipment is in good condition, but some cardio machines need maintenance. Overall decent facility.",
      date: "2024-12-20",
      status: "pending",
      helpful: 3,
      category: "Facilities"
    },
    {
      id: 4,
      type: "service",
      targetName: "Customer Service",
      rating: 5,
      comment: "Outstanding customer service! The staff is always helpful and responsive to member needs.",
      date: "2024-12-15",
      status: "published",
      helpful: 15,
      category: "Service"
    }
  ]; */

  const [newFeedback, setNewFeedback] = useState({
    type: "trainer",
    targetName: "",
    rating: 5,
    comment: "",
    category: "Personal Training"
  });

  const [showNewFeedbackForm, setShowNewFeedbackForm] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredFeedback = feedbackList
    .filter(feedback => filterType === "all" || feedback.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "rating":
          return b.rating - a.rating;
        case "helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const averageRating = feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackList.length;

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const createdFeedback = await createFeedback({
        user_id: user?.id || 1,
        rating: newFeedback.rating,
        comment: newFeedback.comment,
        feedback_type: newFeedback.type,
        trainer_id: null, // TODO: Map trainer name to ID
        class_id: null, // TODO: Map class name to ID if applicable
        is_anonymous: false
      });
      
      // Update feedback list with new feedback
      setFeedbackList([createdFeedback.feedback, ...feedbackList]);
      
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
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            } ${interactive ? "hover:text-yellow-400 cursor-pointer" : ""}`}
            disabled={!interactive}
          >
            <FaStar className="w-5 h-5" />
          </button>
        ))}
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Feedback & Reviews</h1>
          <p className="text-gray-600">Share your experience and help us improve</p>
        </div>
        <button
          onClick={() => setShowNewFeedbackForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          <span>Write Review</span>
        </button>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-800">{feedbackList.length}</p>
            </div>
            <FaComment className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Rating</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
            </div>
            <FaStar className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Published</p>
              <p className="text-2xl font-bold text-gray-800">
                {feedbackList.filter(f => f.status === "published").length}
              </p>
            </div>
            <FaThumbsUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Helpful Votes</p>
              <p className="text-2xl font-bold text-gray-800">
                {feedbackList.reduce((sum, f) => sum + f.helpful, 0)}
              </p>
            </div>
            <FaThumbsUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div> */}

      {/* New Feedback Form Modal */}
      {showNewFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Write a Review</h3>
            
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Review Type</label>
                <select
                  value={newFeedback.type}
                  onChange={(e) => setNewFeedback({...newFeedback, type: e.target.value})}
                  className="w-full px-3 py-2 border text-white-300 bg-gray-800 border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                >
                  <option value="trainer">Trainer</option>
                  <option value="class">Class</option>
                  <option value="facility">Facility</option>
                  <option value="service">Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Name</label>
                <input
                  type="text"
                  value={newFeedback.targetName}
                  onChange={(e) => setNewFeedback({...newFeedback, targetName: e.target.value})}
                  placeholder="Enter trainer name, class name, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                {renderStars(newFeedback.rating, true, (rating) => setNewFeedback({...newFeedback, rating}))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({...newFeedback, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewFeedbackForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters and Sort */}
       

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getCategoryIcon(feedback.category)}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{feedback.targetName}</h3>
                  <p className="text-sm text-gray-600">{feedback.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                  {feedback.status}
                </span>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              {renderStars(feedback.rating)}
              <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
            </div>

            <p className="text-gray-700 mb-4">{feedback.comment}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
                  <FaThumbsUp className="w-4 h-4" />
                  <span>Helpful ({feedback.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <FaThumbsDown className="w-4 h-4" />
                  <span>Not Helpful</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaUser className="w-3 h-3" />
                <span>You</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <FaComment className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No reviews found</h3>
          <p className="text-gray-600 mb-4">No reviews match your current filters.</p>
          <button
            onClick={() => setFilterType("all")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
