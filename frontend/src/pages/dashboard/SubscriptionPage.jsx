import React, { useState, useEffect, useCallback } from "react";
import { FaIdCard, FaCalendarAlt, FaCrown, FaSync, FaHistory, FaGift, FaPlus, FaUser, FaStar, FaCheck, FaExclamationCircle } from "react-icons/fa";
import {
  getUserSubscription,
  createSubscription,
  getSubscriptionOptions,
} from "../../services/api/subscriptionApi";
import { getAllTrainers } from "../../services/api/trainerApi";

import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

const SubscriptionPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // const [_subscriptionHistory, setSubscriptionHistory] = useState([]);
  // const [_availableUpgrades, setAvailableUpgrades] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showTrainerSelection, setShowTrainerSelection] = useState(false);
  const [newSubscription, setNewSubscription] = useState({
    membershipType: 'Individual - 1 Month',
    duration: 1,
    autoRenew: false,
    trainerId: null
  });
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  const fetchAllUserData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch subscription options first to ensure we have them
      let options = [];
      try {
        options = await getSubscriptionOptions();
      } catch (err) {
        console.warn("Failed to fetch subscription options, using fallback", err);
      }

      // Fallback removed to ensure only DB memberships are used
      if (!options || options.length === 0) {
        console.warn("No subscription options available from API.");
      }

      setSubscriptionOptions(options);

      // Fetch other data in parallel
      const [sub, trainersData] = await Promise.all([
        getUserSubscription(user.id).catch(err => {
          console.error("Error fetching user subscription:", err);
          return [];
        }),
        getAllTrainers().catch(err => {
          console.error("Error fetching trainers:", err);
          return [];
        })
      ]);

      setSubscription(sub?.length ? sub[0] : null);

      const defaultTrainers = [
        {
          id: 1,
          name: "Sarah Johnson",
          specialization: ["Yoga", "Pilates", "Flexibility"],
          experience: 5,
          rating: 4.8,
          reviews: 124,
          bio: "Certified yoga instructor with 5+ years of experience.",
          certifications: ["RYT-500", "Pilates Certification", "First Aid"],
          availability: ["Monday", "Wednesday", "Friday"]
        },
        {
          id: 2,
          name: "Mike Wilson",
          specialization: ["HIIT", "Cardio", "Weight Loss"],
          experience: 8,
          rating: 4.9,
          reviews: 89,
          bio: "High-intensity interval training specialist.",
          certifications: ["NASM-CPT", "HIIT Specialist", "Nutrition Coach"],
          availability: ["Tuesday", "Thursday", "Saturday"]
        },
        {
          id: 3,
          name: "David Brown",
          specialization: ["Strength Training", "Bodybuilding", "Powerlifting"],
          experience: 10,
          rating: 4.7,
          reviews: 156,
          bio: "Former competitive bodybuilder with extensive knowledge.",
          certifications: ["CSCS", "Powerlifting Coach", "Sports Nutrition"],
          availability: ["Monday", "Tuesday", "Thursday", "Friday"]
        }
      ];

      setTrainers(trainersData?.length ? trainersData : defaultTrainers);

    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load subscription data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAllUserData();
  }, [fetchAllUserData]);

  // Initialize selected option when options are loaded
  useEffect(() => {
    if (subscriptionOptions.length > 0 && !selectedOption) {
      const defaultOption = subscriptionOptions[0];
      setSelectedOption(defaultOption);
      setNewSubscription(prev => ({
        ...prev,
        membershipType: defaultOption.name,
        duration: defaultOption.duration,
      }));
    }
  }, [subscriptionOptions, selectedOption]);

  // Handle subscription option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setNewSubscription(prev => ({
      ...prev,
      membershipType: option.name,
      duration: option.duration,
    }));
  };

  // Handle trainer selection
  const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer);
    setNewSubscription(prev => ({
      ...prev,
      trainerId: trainer.id
    }));
    setShowTrainerSelection(false);
  };

  // Render star rating
  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, i) => (
  //     <FaStar
  //       key={i}
  //       className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
  //     />
  //   ));
  // };

  // Calculate pricing based on selected option
  const calculatePrice = () => {
    if (!selectedOption) return 0;
    return selectedOption.totalPrice || (selectedOption.basePrice * selectedOption.duration);
  };

  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    if (!selectedOption) return;

    try {
      setLoading(true);
      const price = calculatePrice();

      await createSubscription({
        user_id: user?.id || 1,
        membership_id: Number(selectedOption.id),
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + (newSubscription.duration || 1) * 30 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0],
        status: 'active',
        auto_renew: newSubscription.autoRenew,
        membership_type: selectedOption.name,
        price: price,
        trainer_id: selectedTrainer?.id || null
      });

      // Reset form and close modal
      setNewSubscription({ membershipType: '', duration: 1, autoRenew: false, trainerId: null });
      setSelectedTrainer(null);
      setShowCreateForm(false);

      // Re-fetch user data to update the UI
      await fetchAllUserData();
      // Ideally show a toast notification here instead of alert
      alert("Subscription created successfully!");
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert("Failed to create subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const getStatusColor = (status) => {
  //   switch (status?.toLowerCase()) {
  //     case "active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  //     case "expired": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  //     case "cancelled": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  //     default: return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  //   }
  // };

  // const getDaysRemainingColor = (days) => {
  //   if (days > 30) return "text-green-600 dark:text-green-400";
  //   if (days > 7) return "text-yellow-600 dark:text-yellow-400";
  //   return "text-red-600 dark:text-red-400";
  // };

  if (loading && !subscription && !subscriptionOptions.length) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Subscription</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your membership plan and billing details</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30 active:scale-95"
        >
          <FaPlus className="w-4 h-4" />
          <span>New Subscription</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
          <FaExclamationCircle />
          <p>{error}</p>
        </div>
      )}

      {/* Current Subscription Card */}
      {subscription ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-xl backdrop-blur-sm">
                  <FaCrown className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{subscription.membershipType || 'Active Membership'}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30`}>
                      Active
                    </span>
                    <span className="text-gray-400 text-sm">ID: #{subscription.id?.toString().padStart(6, '0')}</span>
                  </div>
                </div>
              </div>

              <div className="text-left md:text-right">
                <p className="text-gray-400 text-sm mb-1">Time Remaining</p>
                <p className="text-4xl font-bold tracking-tight">{subscription.daysRemaining || 0}</p>
                <p className="text-gray-400 text-sm">days left</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Start Date</p>
                <p className="font-semibold text-lg">{subscription.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">End Date</p>
                <p className="font-semibold text-lg">{subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Plan Value</p>
                <p className="font-semibold text-lg">{subscription.price?.toLocaleString() || '0'} {subscription.currency || 'ETB'}</p>
              </div>
            </div>

            {/* Selected Trainer Section */}
            {subscription.selectedTrainer && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                  <FaUser className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Personal Trainer</p>
                  <h4 className="font-semibold text-lg">{subscription.selectedTrainer.first_name} {subscription.selectedTrainer.last_name}</h4>
                  <p className="text-gray-400 text-sm">{subscription.selectedTrainer.specialization?.join(', ')}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaIdCard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Subscription</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">You don't have an active membership plan. Choose a plan to get started with your fitness journey.</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/30"
          >
            Choose a Plan
          </button>
        </div>
      )}

      {/* Create Subscription Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create New Subscription</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Select a plan that fits your goals</p>
                </div>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Plan Selection */}
                <section>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">1. Choose Membership</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {subscriptionOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${String(selectedOption?.id) === String(option.id)
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-900/30'
                          }`}
                      >
                        {String(selectedOption?.id) === String(option.id) && (
                          <div className="absolute top-3 right-3 text-red-500">
                            <FaCheck className="w-4 h-4" />
                          </div>
                        )}
                        <h5 className="font-bold text-gray-900 dark:text-white mb-1">{option.name}</h5>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                          {(option.totalPrice || option.basePrice * option.duration).toLocaleString()} ETB
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Duration: {option.duration} Month(s)</p>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Trainer Selection */}
                <section>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">2. Personal Trainer (Optional)</h4>

                  {selectedTrainer ? (
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                          <FaUser className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{selectedTrainer.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                            <FaStar className="text-yellow-400 w-3 h-3" />
                            <span>{selectedTrainer.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span>{selectedTrainer.specialization?.[0]}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => { setSelectedTrainer(null); setNewSubscription(prev => ({ ...prev, trainerId: null })); }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowTrainerSelection(true)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-2 group"
                    >
                      <FaPlus className="group-hover:scale-110 transition-transform" />
                      <span>Add a Personal Trainer</span>
                    </button>
                  )}
                </section>

                {/* Summary */}
                <section className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300">
                      <span>Membership ({selectedOption?.name || 'Select a plan'})</span>
                      <span>{calculatePrice().toLocaleString()} ETB</span>
                    </div>
                    {selectedTrainer && (
                      <div className="flex justify-between text-gray-600 dark:text-gray-300">
                        <span>Personal Trainer</span>
                        <span>Included in plan</span>
                      </div>
                    )}
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white text-lg">Total</span>
                      <span className="font-bold text-red-600 dark:text-red-400 text-xl">{calculatePrice().toLocaleString()} ETB</span>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex gap-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSubscription}
                  disabled={loading || !selectedOption}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <FaSync className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Confirm Subscription</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Trainer Selection Modal */}
      <AnimatePresence>
        {showTrainerSelection && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Select a Personal Trainer</h3>
                <button
                  onClick={() => setShowTrainerSelection(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainers.map((trainer) => (
                    <div
                      key={trainer.id}
                      onClick={() => handleTrainerSelect(trainer)}
                      className="group border border-gray-200 dark:border-gray-700 rounded-xl p-5 cursor-pointer hover:border-red-500 dark:hover:border-red-500 hover:shadow-md transition-all bg-white dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                          <FaUser className="w-6 h-6 text-gray-400 dark:text-gray-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">{trainer.name}</h4>
                          <div className="flex items-center gap-1 text-sm">
                            <FaStar className="text-yellow-400 w-3 h-3" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">{trainer.rating}</span>
                            <span className="text-gray-400">({trainer.reviews})</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {trainer.specialization.slice(0, 3).map((spec, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                              {spec}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{trainer.bio}</p>
                        <button className="w-full py-2 mt-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium group-hover:bg-red-600 group-hover:text-white transition-all">
                          Select Trainer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {trainers.length === 0 && (
                  <div className="text-center py-12">
                    <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No trainers available at the moment.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper component for icons (if needed)
const FaTimes = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
  </svg>
);

export default SubscriptionPage;
