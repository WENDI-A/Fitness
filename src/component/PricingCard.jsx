const PricingCard = ({ title, menPrice, womenPrice, validity, features, highlight }) => {
  return (
    <div>
    <div
      className={`relative flex flex-col rounded-xl p-6 w-full max-w-sm text-white/70 bg-[#1c2536] ${
        highlight ? "border-2 border-red-500" : "border border-gray-700"
      }`}
    >
      {highlight && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Most Popular
        </span>
      )}

      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex justify-between items-center bg-[#121926] p-2 rounded-full mb-3">
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full font-semibold shadow-md">
          Men: {menPrice}
        </span>
        <span className="text-sm">Women: {womenPrice}</span>
      </div>

      <p className="text-sm text-gray-400 mb-4 text-center">Valid for {validity} days</p>

      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <span className="text-red-500 mr-2  font-normal" >✓</span> {feature}
          </li>
        ))}
      </ul>
    
    </div>
    
    
    </div>
  );
};

export default PricingCard;