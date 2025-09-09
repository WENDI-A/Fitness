import nobody from "../assets/nobody.jpeg";
import spa from "../assets/spa.png";
import expert from "../assets/expert.avif";

const images = [
  {
    id: 1,
    img: nobody,
    name: "State-of-the-Art Equipment",
    description:
      "Our fitness center boasts the latest high-end equipment for every training style. From advanced cardio machines with integrated entertainment systems to premium free weights and specialized functional training zones, we provide the tools you need to achieve your fitness goals efficiently and safely. Each piece of equipment is meticulously maintained and strategically placed in our spacious facility to ensure optimal workout flow and comfort during your training sessions."
  },
  {
    id: 2,
    img: spa,
    name: "Luxury Spa Treatments",
    description:
      "Rejuvenate with our premium spa services delivered by certified wellness experts. Our spa sanctuary offers a comprehensive range of treatments designed to relax, restore, and revitalize your body and mind after intense workouts. From deep tissue and sports massages to aromatherapy and hydrotherapy, our wellness professionals customize each treatment to address your specific needs, helping you recover faster and perform better."
  },
  {
    id: 3,
    img: expert,
    name: "Expert Personal Trainers",
    description:
      "Transform your fitness journey with our dedicated personal training specialists. Our elite team of certified trainers brings diverse expertise in strength training, weight management, sports conditioning, rehabilitation, and holistic wellness. Each trainer is committed to creating personalized programs that align with your unique goals, preferences, and lifestyle. With their guidance, you'll experience accelerated results while learning proper techniques that prevent injury and ensure long-term success."
  }
];

const About = () => {
  return (
    <div className="pt-20 px-4 pb-12 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="max-w-xl mx-auto font-bold text-gray-500 dark:text-gray-300 mt-4">
          <span className="text-red-500">About Latest Fitness</span> – Hawassa's most exclusive fitness and wellness sanctuary, where luxury meets health in perfect harmony.
        </p>
      </div>

      {/* Image/Text Sections */}
      <div className="space-y-12">
        {images.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col md:flex-row items-center gap-8 p-6 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-56 md:h-80 object-cover rounded-xl"
            />

            {/* Text Content */}
            <div className="w-full text-left">
              <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
