import gym from "../assets/gym.jpeg";

const Home = ({ onJoinNow }) => {
  return (
    <div>
      <div
        className="min-h-[60vh] md:min-h-screen flex items-center justify-center bg-cover bg-center flex flex-col text-center space-y-6 bg-white text-gray-800 dark:bg-gray-900 dark:text-white p-6"
        style={{ backgroundImage: `url(${gym})` }}
      >
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            HAWASSA'S PREMIER <br />
            FITNESS & WELLNESS DESTINATION
          </h1>
          <h2 className="font-medium max-w-xl mt-4 text-sm md:text-lg">
            Where strength meets serenity. Transform your body, calm your mind.
          </h2>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onJoinNow}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
            >
              Become a Member
            </button>
            <button className="w-full sm:w-auto bg-transparent text-gray-800 border border-gray-800 rounded-full px-6 py-3 font-semibold hover:bg-gray-100 hover:text-gray-900 transition dark:text-white dark:border-white dark:hover:bg-white/10 dark:hover:text-white">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
