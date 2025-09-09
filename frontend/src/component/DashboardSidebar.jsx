// import React from "react";
// import { 
//   FaHome, 
//   FaCreditCard, 
//   FaCalendarAlt, 
//   FaUserTie, 
//   FaAppleAlt, 
//   FaIdCard, 
//   FaComments,
//   FaUsers,
//   FaBookOpen,
//   FaClipboardList
// } from "react-icons/fa";

// const DashboardSidebar = ({ activeTab, setActiveTab }) => {
//   const menuItems = [
//     { id: "home", label: "Dashboard", icon: FaHome },
//     { id: "subscription", label: "My Subscription", icon: FaIdCard },
//     { id: "subscription-flow", label: "Subscription Setup", icon: FaClipboardList },
//     { id: "schedule", label: "Classes & Schedule", icon: FaCalendarAlt },
//     { id: "bookings", label: "My Bookings", icon: FaBookOpen },
//     { id: "trainers", label: "Trainers", icon: FaUserTie },
//     { id: "nutrition", label: "Nutrition Plans", icon: FaAppleAlt },
//     { id: "payments", label: "Payments", icon: FaCreditCard },
//     { id: "membership", label: "Membership Plans", icon: FaUsers },
//     { id: "feedback", label: "Feedback", icon: FaComments },
//   ];

//   return (
//   <div className="hidden md:flex md:w-64 bg-[#1c2536] text-white min-h-full flex-col">
//       <div className="p-6 border-b border-gray-700">
//         <h2 className="text-2xl font-bold text-red-500">FitnessPro</h2>
//         <p className="text-gray-400 text-sm mt-1">Member Portal</p>
//       </div>
      
//   <nav className="flex-1 p-4 overflow-y-auto">
//         <ul className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <li key={item.id}>
//                 <button
//                   onClick={() => setActiveTab(item.id)}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                     activeTab === item.id
//                       ? "bg-red-500 text-white"
//                       : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                   }`}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span>{item.label}</span>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
      
//       <div className="p-4 border-t border-gray-700">
//         <div className="text-xs text-gray-400">
//           © 2025 FitnessPro. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardSidebar;
