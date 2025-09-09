import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaHome, FaCreditCard, FaUserTie, FaAppleAlt, FaIdCard, FaComments, FaUsers, FaClipboardList, FaShieldAlt } from "react-icons/fa";
import DashboardHeader from "../component/DashboardHeader";
import SmallProfileForm from "../components/SmallProfileForm";
import PaymentPage from "./dashboard/PaymentPage";
import SubscriptionPage from "./dashboard/SubscriptionPage";
// import TrainerPage from "./dashboard/TrainerPage";
import FeedbackPage from "./dashboard/FeedbackPage";
import AdminPage from "./dashboard/AdminPage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
 
const Dashboard = ({ user, onLogout, onGoToWebsite }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
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
    }, 5000);
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

  // Handle scroll-based section highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;
      
      const scrollPosition = mainContentRef.current.scrollTop;
      const viewportHeight = mainContentRef.current.clientHeight;
      const threshold = viewportHeight * 0.3; // 30% of viewport height
      
      const sectionElements = sections.map(section => 
        document.getElementById(`section-${section.id}`)
      ).filter(Boolean);
      
      let currentSection = sections[0]?.id || '';
      
      // Find the section that's most visible in the viewport
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          // Check if section is in viewport with threshold
          if (scrollPosition + threshold >= elementTop && scrollPosition < elementBottom) {
            currentSection = element.id.replace('section-', '');
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      // Initial call to set correct section
      handleScroll();
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element && mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  };

   



  // Show profile setup if user hasn't completed it
  if (showProfileSetup && !profileCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardHeader user={user} onLogout={onLogout} onGoToWebsite={onGoToWebsite} />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <SmallProfileForm user={user} onComplete={handleProfileComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader user={user} onLogout={onLogout} onGoToWebsite={onGoToWebsite} />
      
      {/* Welcome Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-bold mb-2">👋 Welcome!</h1>
          <p className="text-gray-500">Loading your dashboard...</p>
        </DialogContent>
      </Dialog>
      
  <div className="flex pt-20">
        {/* Fixed Sidebar for md+ */}
  <div className="hidden md:block w-64 bg-gradient-to-b from-gray-900 to-gray-800 fixed h-full z-30 top-16 overflow-y-auto mt-4">
         
        <nav className="mt-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 group ${
                  activeSection === section.id
                    ? 'bg-red-600 text-white border-r-4 border-red-400'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:pl-8'
                }`}
              >
                <IconComponent className={`mr-3 transition-all duration-200 ${
                  activeSection === section.id ? 'text-white' : 'text-gray-400 group-hover:text-red-400'
                }`} size={18} />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </nav>
        </div>

        {/* Mobile top nav */}
  <div className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 z-30 border-b">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center space-x-2 overflow-x-auto">
            {sections.map((section) => (
              <button key={section.id} onClick={() => scrollToSection(section.id)} className={`px-3 py-2 rounded ${activeSection === section.id ? 'bg-red-600 text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
  <main ref={mainContentRef} className={`flex-1 ${/* account for sidebar on md+ */''} md:ml-64 overflow-y-auto h-screen bg-gray-50 dark:bg-gray-900 pt-20`}>
          {sections.map((section) => (
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="min-h-screen p-8"
            >
              <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">{section.label}</h1>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Manage your fitness journey</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                  {section.component}
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};


export default Dashboard;
