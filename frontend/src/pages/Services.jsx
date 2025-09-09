import React from "react";
import PricingCard from "../component/PricingCard";
import pricingData from "../component/pricingData";

const Services = () => {

  return (
  <section id="service" className="py-16 px-4 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
    <h1 className="text-center text-3xl font-bold mb-8">💪 Membership Packages</h1>
    <h2 className="text-center text-xl mb-8">
          Choose the perfect plan to achieve your fitness goals
        </h2>

        {/* Individual Section */}
  <h1 className="text-center text-3xl font-bold mb-8 mt-20">Individual Packages</h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {pricingData
            .filter(item => item.category === "individual")
            .map((item, i) => <PricingCard key={i} {...item} />)}
        </div>

        {/* Group Section */}
  <h1 className="text-center text-3xl font-bold mb-8 mt-20">Group Package S&C Classes</h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {pricingData
            .filter(item => item.category === "group")
            .map((item, i) => <PricingCard key={i} {...item} />)}
        </div>

        {/* Family Section */}
  <h1 className="text-center text-3xl font-bold mb-8 mt-20">Family Packages</h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {pricingData
            .filter(item => item.category === "family")
            .map((item, i) => <PricingCard key={i} {...item} />)}
        </div>

        {/* Personalized Section */}
  <h1 className="text-center text-3xl font-bold mb-8 mt-20">Personalized Package</h1>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {pricingData
            .filter(item => item.category === "personalized")
            .map((item, i) => <PricingCard key={i} {...item} />)}
        </div>
      </section>
  );
};

export default Services;
