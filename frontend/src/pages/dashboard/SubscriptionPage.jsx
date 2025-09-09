import React, { useState, useEffect } from "react";
import { FaIdCard, FaCalendarAlt, FaCrown, FaSync, FaHistory, FaGift, FaPlus, FaUser, FaStar, FaCheck } from "react-icons/fa";
import {
  getUserSubscription,
  getSubscriptionHistory,
  getAvailableUpgrades,
  createSubscription,
  getSubscriptionOptions,
} from "../../services/api/subscriptionApi";
import { getAllTrainers } from "../../services/api/trainerApi";
import pricingData from "../../component/pricingData";

const SubscriptionPage = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [_subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [_availableUpgrades, setAvailableUpgrades] = useState([]);
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
   
  

  
  const fetchAllUserData = React.useCallback(async () => {
    try {
      setLoading(true);
      const [sub, history, upgrades, options, trainersData] = await Promise.all([
        getUserSubscription(user?.id),
        // getSubscriptionHistory(user?.id),
        // getAvailableUpgrades(user?.id),
        getSubscriptionOptions(),
        getAllTrainers()
      ]);
  
      setSubscription(sub?.length ? sub[0] : null);
     
      
      setSubscriptionOptions(options || []);
      // If backend didn't return subscription options, fall back to local pricingData
      if ((!options || options.length === 0) && pricingData && pricingData.length) {
    // Assign numeric IDs to fallback pricing options so they can be used as membership_id when sent to backend.
    // We use a high offset to reduce the chance of colliding with real DB ids.
    const PRICING_ID_OFFSET = 100000;
          const mapped = pricingData.map((p, i) => {
            const priceStr = (p.menPrice || p.price || '').toString();
            const priceNum = Number(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
            const durationMonths = Math.max(1, Math.round((p.validity || 30) / 30));
            return {
              id: i + 1,
              membershipId: i + 1,
              name: p.title,
              duration: durationMonths,
              basePrice: priceNum,
              totalPrice: priceNum,
              features: p.features || [],
              raw: p,
            };
          });
          setSubscriptionOptions(mapped);
          if (!selectedOption && mapped.length) {
            setSelectedOption(mapped[0]);
            setNewSubscription({
              membershipType: mapped[0].name,
              duration: mapped[0].duration,
              autoRenew: false,
            });
          }
      }
      setTrainers(trainersData?.length ? trainersData : [
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
      ]);
      
      // Set default selected option
      if (options?.length && !selectedOption) {
        setSelectedOption(options[0]);
        setNewSubscription({
          membershipType: options[0].name,
          duration: options[0].duration,
          autoRenew: false
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Set fallback data on error
      setSubscriptionHistory([]);
      setAvailableUpgrades([]);
      setSubscriptionOptions([]);
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedOption]);

  useEffect(() => {
    if (user?.id) {
      fetchAllUserData();
    }
  }, [user?.id, fetchAllUserData]);

  // Handle subscription option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setNewSubscription({
      membershipType: option.name,
      duration: option.duration,
      autoRenew: newSubscription.autoRenew,
      trainerId: newSubscription.trainerId
    });
  };

  // If a real membership id (numeric) is selected, create subscription immediately
  const maybeCreateSubscriptionForMembership = async (option) => {
    // numeric id indicates existing membership record
    const membershipId = option?.id;
    if (!membershipId) return;
    // if id is numeric or string numeric, proceed
    if (/^\d+$/.test(String(membershipId))) {
      try {
        setLoading(true);
        const price = option.totalPrice || option.basePrice * option.duration || 0;
        await createSubscription({
          user_id: user?.id || 1,
          membership_id: Number(membershipId),
          start_date: new Date().toISOString().split('T')[0],
          end_date: new Date(Date.now() + (option.duration || 1) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'active',
          auto_renew: false,
          membership_type: option.name,
          price: price,
        });
        // Refresh user data
        await fetchAllUserData();
        alert('Subscription created from selected membership');
      } catch (err) {
        console.error('Auto-create subscription failed', err);
        alert('Failed to create subscription for selected membership');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle trainer selection
  const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer);
    setNewSubscription({
      ...newSubscription,
      trainerId: trainer.id
    });
    setShowTrainerSelection(false);
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  // Calculate pricing based on selected option
  const calculatePrice = () => {
    if (!selectedOption) return 0;
    return selectedOption.totalPrice || (selectedOption.basePrice * selectedOption.duration);
  };
  
  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    // Validate selection before sending to backend: accept only positive integer ids
    if (!/^\d+$/.test(String(selectedOption?.id || ''))){
      alert("Select a valid membership");
      return;
    }

    try {
      setLoading(true);
      const price = calculatePrice();
      await createSubscription({
        user_id: user?.id || 1,
        membership_id: Number(selectedOption?.id),
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + newSubscription.duration * 30 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0],
        status: 'active',
        auto_renew: newSubscription.autoRenew,
        membership_type: selectedOption?.name || newSubscription.membershipType,
        price: price,
        trainer_id: selectedTrainer?.id || null
      });
      // Reset form and close modal
      setNewSubscription({ membershipType: '', duration: 1, autoRenew: false, trainerId: null });
      setSelectedOption(subscriptionOptions[0] || null);
      setSelectedTrainer(null);
      setShowCreateForm(false);
      
      // Re-fetch user data to update the UI
      await fetchAllUserData();
      alert("Subscription created successfully!");
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert("Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };
  


  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-red-100 text-red-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getDaysRemainingColor = (days) => {
    if (days > 30) return "text-green-600";
    if (days > 7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Subscription</h1>
          <p className="text-gray-600">Manage your membership and billing</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          <span>New Subscription</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && !subscription && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      )}
      
      {/* Current Subscription Card */}
      {subscription && (
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <FaCrown className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">{subscription?.membershipType || 'No Membership'}</h2>
              <p className="text-red-100">Active Membership</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{subscription?.daysRemaining || 0}</p>
            <p className="text-red-100">days remaining</p>
          </div>
        </div>
        
        {/* Selected Trainer Section */}
        {subscription?.selectedTrainer && (
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                <FaUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Your Personal Trainer</h4>
                <p className="text-red-100">{subscription.selectedTrainer.first_name} {subscription.selectedTrainer.last_name}</p>
                <p className="text-red-200 text-sm">{subscription.selectedTrainer.specialization?.join(', ') || 'Fitness Specialist'}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(subscription.selectedTrainer.rating || 4.8) ? "text-yellow-300" : "text-white text-opacity-30"} 
                      size={14} 
                    />
                  ))}
                </div>
                <p className="text-red-100 text-sm">{subscription.selectedTrainer.rating || 4.8} rating</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-red-100 dark:text-gray-300 text-sm">Start Date</p>
            <p className="font-semibold">{subscription?.startDate ? new Date(subscription.startDate).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-red-100 dark:text-gray-300 text-sm">End Date</p>
            <p className="font-semibold">{subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-red-100 dark:text-gray-300 text-sm">Total Cost</p>
            <p className="font-semibold">{subscription?.price?.toLocaleString() || 'N/A'} {subscription?.currency || ''}</p>
          </div>
        </div>
      </div>
      )}

      

      {/* Membership Features */}
      {subscription?.selectedMembership && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Membership Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscription.selectedMembership.features?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FaCheck className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Subscription Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Subscription Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300">Membership ID</span>
              <span className="font-medium text-gray-800 dark:text-white">#{subscription?.id?.toString().padStart(6, '0') || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription?.status)}`}>
                {subscription?.status?.charAt(0).toUpperCase() + subscription?.status?.slice(1) || 'Unknown'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
              <span className="font-medium text-gray-800 dark:text-white">{subscription?.price?.toLocaleString() || 'N/A'} {subscription?.currency || ''}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Auto Renewal</span>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={subscription?.autoRenew || false}
                  onChange={() => setSubscription({...subscription, autoRenew: !subscription?.autoRenew})}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">
                  {subscription?.autoRenew ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Next Billing</span>
              <span className="font-medium text-gray-800">{subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Days Remaining</span>
              <span className={`font-medium ${getDaysRemainingColor(subscription?.daysRemaining)}`}>
                {subscription?.daysRemaining || 0} days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Upgrades */}
       

      {/* Subscription History */}
       

      {/* Create Subscription Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-0">Create New Subscription</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                aria-label="Close create subscription"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form id="createSubscriptionForm" onSubmit={handleCreateSubscription} className="space-y-4 p-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Membership Type</label>
                <select
                  value={String(selectedOption?.id ?? '')}
                  onChange={(e) => {
                    const option = subscriptionOptions.find(opt => String(opt.id) === e.target.value);
                    if (option) {
                      handleOptionSelect(option);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {subscriptionOptions.map(option => (
                    <option key={option.id} value={String(option.id)}>
                      {option.name} ({(option.totalPrice || option.basePrice * option.duration).toLocaleString()} ETB)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                <input
                  type="text"
                  value={`${selectedOption?.duration || newSubscription.duration} month${(selectedOption?.duration || newSubscription.duration) > 1 ? 's' : ''}`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                <input
                  type="text"
                  value={`${calculatePrice().toLocaleString()} ETB`}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold"
                />
              </div>

              {/* Trainer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Personal Trainer (Optional)</label>
                <div className="space-y-2">
                  {selectedTrainer ? (
                    <div className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <FaUser className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{selectedTrainer.name}</p>
                          <div className="flex items-center space-x-1">
                            {renderStars(selectedTrainer.rating)}
                            <span className="text-xs text-gray-500 ml-1">({selectedTrainer.rating})</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {setSelectedTrainer(null); setNewSubscription({...newSubscription, trainerId: null});}}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowTrainerSelection(true)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      + Select a Personal Trainer
                    </button>
                  )}
                </div>
              </div>

              {/* Features included */}
              {selectedOption?.features && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features Included</label>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <ul className="space-y-1">
                      {selectedOption.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRenew"
                  checked={newSubscription.autoRenew}
                  onChange={(e) => setNewSubscription({...newSubscription, autoRenew: e.target.checked})}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="autoRenew" className="text-sm text-gray-700 dark:text-gray-300">
                  Enable auto-renewal
                </label>
              </div>

            </form>

            <div className="p-4 border-t dark:border-gray-700 flex space-x-4">
              <button
                type="button"
                onClick={() => document.getElementById('createSubscriptionForm')?.requestSubmit()}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Subscription"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trainer Selection Modal */}
      {showTrainerSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Select a Personal Trainer</h3>
              <button
                onClick={() => setShowTrainerSelection(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  onClick={() => handleTrainerSelect(trainer)}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-red-500 hover:shadow-md transition-all"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaUser className="w-8 h-8 text-gray-400 dark:text-gray-300" />
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{trainer.name}</h4>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      {renderStars(trainer.rating)}
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {trainer.rating} ({trainer.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Specializations</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specialization.slice(0, 2).map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                        {trainer.specialization.length > 2 && (
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                            +{trainer.specialization.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-center py-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-300">{trainer.experience} years experience</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrainerSelect(trainer);
                      }}
                      className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Select Trainer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {trainers.length === 0 && (
              <div className="text-center py-8">
                <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No trainers available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
