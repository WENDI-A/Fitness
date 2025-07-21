import gym from "./assets/gym.jpeg";

const Home = () => {
  return (
    <div>
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center text-white flex flex-col text-center space-y-6 bg-black bg-opacity-60 p-6 rounded-lg"
        style={{ backgroundImage: `url(${gym})` }}
      >
      
          <h1 className="text-4xl font-bold">
            HAWASSA'S PREMIER <br />
            FITNESS & WELLNESS DESTINATION
          </h1>
          <h2 className="font-medium max-w-xl">
            Where strength meets serenity. Transform your body, calm your mind.
          </h2>
        <div className="flex flex-row gap-x-4">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg hover:opacity-90 transition">
            Become a Member
           </button>

             <button className="bg-transparent text-white border border-white rounded-full px-6 py-3 font-semibold hover:bg-white hover:text-black transition">
               Learn More</button>
             </div>
        </div>
      
    </div>
  );
};

export default Home;
