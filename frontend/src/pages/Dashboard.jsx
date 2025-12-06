import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaHome, FaCreditCard, FaUserTie, FaAppleAlt, FaIdCard, FaComments, FaUsers, FaClipboardList, FaShieldAlt, FaBars, FaTimes } from "react-icons/fa";
import DashboardHeader from "../component/DashboardHeader";
import SmallProfileForm from "../components/SmallProfileForm";
import PaymentPage from "./dashboard/PaymentPage";
import SubscriptionPage from "./dashboard/SubscriptionPage";
// import TrainerPage from "./dashboard/TrainerPage";
import FeedbackPage from "./dashboard/FeedbackPage";
import AdminPage from "./dashboard/AdminPage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars

const Dashboard = ({ user, onLogout, onGoToWebsite }) => {
  const [activeSection, setActiveSection] = useState("subscription");
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mainContentRef = useRef(null);

  // Check if user needs to complete profile setup
  useEffect(() => {
    const hasCompletedProfile = localStorage.getItem(`profile-completed-${user?.id}`);
    if (!hasCompletedProfile && user) {
      setShowProfileSetup(true);
    } else {
      setProfileCompleted(true);
    }
  }, [user]);

  const handleProfileComplete = (profileData) => {
    // Save profile completion status
    localStorage.setItem(`profile-completed-${user?.id}`, 'true');
    localStorage.setItem(`profile-data-${user?.id}`, JSON.stringify(profileData));

    setShowProfileSetup(false);
    setProfileCompleted(true);

    // Here you would typically send the data to your admin API
    console.log('Profile data saved for admin review:', profileData);
  };

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000); // Reduced to 2s for better UX
    return () => clearTimeout(timer);
  }, []);

  const sections = useMemo(() => {
    const base = [
      { id: "subscription", label: "My Subscription", icon: FaIdCard, component: <SubscriptionPage user={user} /> },
      { id: "payments", label: "Payments", icon: FaCreditCard, component: <PaymentPage user={user} /> },
      { id: "feedback", label: "Feedback", icon: FaComments, component: <FeedbackPage user={user} /> },
    ];

    // If admin, show only the admin page
    if (user?.role === 'admin') {
      return [{ id: 'admin', label: 'Admin', icon: FaShieldAlt, component: <AdminPage /> }];
    }

    return base;
  }, [user]);

  // Scroll listener removed as we switched to tab-based navigation

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  };

  // Show profile setup if user hasn't completed it
  if (showProfileSetup && !profileCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
        <DashboardHeader user={user} onLogout={onLogout} onGoToWebsite={onGoToWebsite} />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <SmallProfileForm user={user} onComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden flex flex-col">
      <DashboardHeader user={user} onLogout={onLogout} onGoToWebsite={onGoToWebsite} />

      {/* Welcome Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">👋 Welcome back, {user?.first_name}!</h1>
            <p className="text-gray-500 dark:text-gray-400">Loading your personalized dashboard...</p>
          </motion.div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)]">
        {/* Sidebar for md+ */}
        <aside className="hidden md:flex w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col z-20 shadow-sm">
          <div className="p-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</h2>
            <nav className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${isActive
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                  >
                    <IconComponent className={`mr-3 transition-colors duration-200 ${isActive ? 'text-red-500 dark:text-red-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      }`} size={20} />
                    <span className="font-medium">{section.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 font-bold">
                {user?.first_name?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Button */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="md:hidden fixed bottom-24 right-6 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-64"
            >
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeSection === section.id
                        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      <IconComponent className="mr-3" size={20} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main
          ref={mainContentRef}
          className="flex-1 overflow-y-auto scroll-smooth bg-gray-50 dark:bg-gray-900 relative"
        >
          <div className="max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12">
            <AnimatePresence mode="wait">
              {sections.map((section) => {
                if (section.id !== activeSection) return null;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{section.label}</h2>
                      <div className="h-1 w-20 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                      {section.component}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Footer Spacer */}
            <div className="h-20"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
