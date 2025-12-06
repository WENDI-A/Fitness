import PricingCard from "../component/PricingCard";
import pricingData from "../component/pricingData";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

const Services = () => {
  const categories = [
    { id: "individual", title: "Individual Packages" },
    { id: "group", title: "Group Package S&C Classes" },
    { id: "family", title: "Family Packages" },
    { id: "personalized", title: "Personalized Package" }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Membership <span className="text-red-600">Packages</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose the perfect plan to achieve your fitness goals. Flexible options for everyone.
          </motion.p>
        </div>

        <div className="space-y-20">
          {categories.map((category, index) => {
            const categoryItems = pricingData.filter(item => item.category === category.id);

            if (categoryItems.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                    {category.title}
                  </h2>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                  {categoryItems.map((item, i) => (
                    <div key={i} className="h-full">
                      <PricingCard {...item} />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
