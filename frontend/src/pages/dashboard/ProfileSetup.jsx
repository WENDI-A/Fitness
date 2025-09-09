import React, { useState } from 'react';
import { FaUser, FaWeight, FaRuler, FaCalendarAlt, FaBullseye, FaDumbbell } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const ProfileSetup = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    fitnessLevel: '',
    goals: [],
    medicalConditions: '',
    preferredWorkoutTime: '',
    workoutDays: []
  });

  const fitnessGoals = [
    'Weight Loss', 'Muscle Gain', 'Strength Training', 'Cardio Fitness',
    'Flexibility', 'Endurance', 'General Health', 'Sports Performance'
  ];

  const workoutDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workoutDays: prev.workoutDays.includes(day)
        ? prev.workoutDays.filter(d => d !== day)
        : [...prev.workoutDays, day]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send data to admin (will be implemented later)
    const profileData = {
      userId: user?.id,
      userName: user?.first_name + ' ' + user?.last_name,
      email: user?.email,
      ...formData,
      submittedAt: new Date().toISOString()
    };

    console.log('Profile data to be sent to admin:', profileData);
    
    // For now, just complete the setup
    onComplete(profileData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <FaUser className="w-5 h-5" />
            Complete Your Fitness Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Help us personalize your fitness journey
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Age</label>
                <Input
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Height (cm)</label>
                <Input
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Weight (kg)</label>
                <Input
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Fitness Level */}
            <div>
              <label className="text-sm font-medium mb-2 block">Fitness Level</label>
              <Select value={formData.fitnessLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your fitness level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fitness Goals */}
            <div>
              <label className="text-sm font-medium mb-2 block">Fitness Goals</label>
              <div className="flex flex-wrap gap-2">
                {fitnessGoals.map(goal => (
                  <Badge
                    key={goal}
                    variant={formData.goals.includes(goal) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleGoalToggle(goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preferred Workout Time */}
            <div>
              <label className="text-sm font-medium mb-2 block">Preferred Workout Time</label>
              <Select value={formData.preferredWorkoutTime} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredWorkoutTime: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="When do you prefer to workout?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early-morning">Early Morning (5-7 AM)</SelectItem>
                  <SelectItem value="morning">Morning (7-10 AM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12-3 PM)</SelectItem>
                  <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                  <SelectItem value="night">Night (8-10 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Workout Days */}
            <div>
              <label className="text-sm font-medium mb-2 block">Preferred Workout Days</label>
              <div className="flex flex-wrap gap-2">
                {workoutDays.map(day => (
                  <Badge
                    key={day}
                    variant={formData.workoutDays.includes(day) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleDayToggle(day)}
                  >
                    {day.slice(0, 3)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Medical Conditions */}
            <div>
              <label className="text-sm font-medium mb-2 block">Medical Conditions or Injuries (Optional)</label>
              <Textarea
                placeholder="Any medical conditions, injuries, or limitations we should know about..."
                value={formData.medicalConditions}
                onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full">
              Complete Profile Setup
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;
