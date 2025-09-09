const PricingCard = ({ title, menPrice, womenPrice, men_price, women_price, validity, validity_days, features, highlight, is_highlighted }) => {
  // Handle both static data format and API data format
  const displayMenPrice = menPrice || (men_price ? `${men_price} ETB` : '');
  const displayWomenPrice = womenPrice || (women_price ? `${women_price} ETB` : '');
  const displayValidity = validity || validity_days;
  const isHighlighted = highlight || is_highlighted;
  return (
    <div>
    <div
      className={`relative flex flex-col rounded-xl p-6 w-full text-white/70 bg-[#1c2536] ${
        isHighlighted ? "border-2 border-red-500" : "border border-gray-700"
      }`}
    >
      {isHighlighted && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Most Popular
        </span>
      )}

  <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

  <div className="flex flex-col sm:flex-row justify-between items-center bg-[#121926] p-2 rounded-full mb-3">
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold shadow-md mb-2 sm:mb-0">
          Men: {displayMenPrice}
        </span>
        <span className="text-sm">Women: {displayWomenPrice}</span>
      </div>

  <p className="text-sm md:text-base text-gray-400 mb-4 text-center">Valid for {displayValidity} days</p>

      <ul className="space-y-2">
        {features && Array.isArray(features) ? features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <span className="text-red-500 mr-2  font-normal" >✓</span> {feature}
          </li>
        )) : (
          <li className="flex items-center">
            <span className="text-red-500 mr-2  font-normal" >✓</span> No features available
          </li>
        )}
      </ul>
    
    </div>
    
    
    </div>
  );
};

export default PricingCard;