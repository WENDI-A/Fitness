import React, { useState, useEffect } from "react";
import { FaUser, FaStar, FaCertificate } from "react-icons/fa";
import { getAllTrainers } from "../../services/api/trainerApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TrainerPage = ({ user }) => {
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  
  





  const staticTrainers = React.useMemo(() => [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: ["Yoga", "Pilates", "Flexibility"],
      experience: 5,
      rating: 4.8,
      reviews: 124,
      bio: "Certified yoga instructor with 5+ years of experience. Specializes in Hatha and Vinyasa yoga styles.",
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
      bio: "High-intensity interval training specialist. Helps clients achieve rapid fitness results through structured programs.",
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
      bio: "Former competitive bodybuilder with extensive knowledge in strength training and muscle building.",
      certifications: ["CSCS", "Powerlifting Coach", "Sports Nutrition"],
      availability: ["Monday", "Tuesday", "Thursday", "Friday"]
    }
  ], []);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await getAllTrainers();
        setTrainers(data.length > 0 ? data : staticTrainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        setTrainers(staticTrainers);
      }
    };

    fetchTrainers();
  }, [staticTrainers]);

  const specializations = [
    "all", "Yoga", "HIIT", "Strength Training", "Pilates", "Cardio", "Bodybuilding"
  ];

  const filteredTrainers = trainers
    .filter(trainer => 
      filterSpecialization === "all" || 
      trainer.specialization.some(spec => spec.toLowerCase().includes(filterSpecialization.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "experience": return b.experience - a.experience;
        default: return 0;
      }
    });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Meet Our Trainers</h2>
        <p className="text-gray-600 dark:text-gray-300">Discover certified fitness professionals to guide your journey</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Specialization</label>
              <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>
                      {spec === "all" ? "All Specializations" : spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <Card 
            key={trainer.id}
            onClick={() => setSelectedTrainer(trainer)}
            className={`cursor-pointer transition-all duration-200 ${
              selectedTrainer?.id === trainer.id ? "shadow-lg" : ""
            }`}
          >
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUser className="w-10 h-10 text-gray-400 dark:text-gray-300" />
              </div>
              <CardTitle className="text-lg">{trainer.name}</CardTitle>
              <div className="flex items-center justify-center space-x-1">
                {renderStars(trainer.rating)}
                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                  {trainer.rating} ({trainer.reviews} reviews)
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1">
                  {trainer.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-center py-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{trainer.experience} years experience</p>
              </div>

              <p className="text-sm text-gray-600 text-center leading-relaxed">{trainer.bio}</p>

              <Button
                onClick={() => setSelectedTrainer(trainer)}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trainer Detail Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaUser className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedTrainer.name}</h2>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(selectedTrainer.rating)}
                      </div>
                      <span className="text-gray-600 ml-2">
                        {selectedTrainer.rating} ({selectedTrainer.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600">{selectedTrainer.experience} years of experience</p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedTrainer(null)}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedTrainer.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrainer.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Certifications</h3>
                    <div className="space-y-3">
                      {selectedTrainer.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="flex items-center space-x-3 p-3 bg-blue-50 border-blue-200 justify-start">
                          <FaCertificate className="w-5 h-5 text-blue-500" />
                          <span className="text-gray-700 font-medium">{cert}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Available Days</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrainer.availability.map((day, index) => (
                        <Badge key={index} variant="secondary" className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 text-center">
                <p className="text-gray-600 mb-2">Ready to start your fitness journey?</p>
                <p className="text-lg text-gray-800">Contact {selectedTrainer.name} through your membership portal</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainerPage;
