import React, { useState } from 'react';

const SmallProfileForm = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    fitnessGoal: '',
    experienceLevel: '',
    preferredWorkout: '',
    availability: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage and send to admin (admin page to be created later)
    const profileData = {
      userId: user?.id,
      userName: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      ...formData,
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`user-profile-${user?.id}`, JSON.stringify(profileData));
    console.log('Profile data ready for admin:', profileData);
    
    if (onComplete) {
      onComplete(profileData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome to Fitness! 🏋️‍♂️
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Tell us about your fitness journey to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fitness Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What's your main fitness goal?
          </label>
          <select
            value={formData.fitnessGoal}
            onChange={(e) => handleChange('fitnessGoal', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select your goal</option>
            <option value="lose-weight">Lose Weight</option>
            <option value="build-muscle">Build Muscle</option>
            <option value="stay-fit">Stay Fit</option>
            <option value="improve-endurance">Improve Endurance</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your fitness experience level?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleChange('experienceLevel', level.toLowerCase())}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  formData.experienceLevel === level.toLowerCase()
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Workout */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred workout type?
          </label>
          <select
            value={formData.preferredWorkout}
            onChange={(e) => handleChange('preferredWorkout', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choose workout type</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength Training</option>
            <option value="yoga">Yoga</option>
            <option value="mixed">Mixed Training</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How often can you workout?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {['2-3 times/week', '4-5 times/week', '6-7 times/week', 'Daily'].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => handleChange('availability', freq)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  formData.availability === freq
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Start My Fitness Journey! 🚀
        </button>
      </form>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        Your information will be reviewed by our fitness experts
      </p>
    </div>
  );
};

export default SmallProfileForm;
