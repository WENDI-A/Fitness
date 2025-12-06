import nobody from "../assets/nobody.jpeg";
import spa from "../assets/spa.png";
import expert from "../assets/expert.avif";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

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
    <div className="py-20 bg-white text-gray-800 dark:bg-gray-900 dark:text-white overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          <span className="text-red-600 font-bold">FitnessPro</span> – Hawassa's most exclusive fitness and wellness sanctuary, where luxury meets health in perfect harmony.
        </motion.p>
      </div>

      {/* Image/Text Sections */}
      <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {images.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute inset-0 bg-red-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20"></div>
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2"
              />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-left space-y-6">
              <div className="inline-block p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-xl mb-2">
                0{index + 1}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
