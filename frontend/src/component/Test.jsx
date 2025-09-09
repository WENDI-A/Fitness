import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Test = () => {
  const words = [
    {
      id: 0,
      name: "Yonas Tadesse",
      descriptions:
        "I've been a member of many gyms over the years, but Latest Fitness stands out for their attention to detail and personalized approach. The facilities are always clean and the atmosphere is motivating.",
    },
    {
      id: 1,
      name: "Kaleb Adem",
      descriptions:
        "Latest Fitness completely transformed my approach to working out. The trainers are knowledgeable and supportive, and the community keeps me motivated. I've lost 30 pounds and gained so much confidence!",
    },
    {
      id: 2,
      name: "Abenezer Mengistu",
      descriptions:
        "As someone who was intimidated by gyms, I can't believe how comfortable I feel at Latest Fitness. The staff is friendly, the equipment is top-notch, and the results speak for themselves.",
    },
    {
      id: 3,
      name: "Tigist Hailu",
      descriptions:
        "The nutrition coaching combined with personal training has been a game-changer for me. I've not only reached my fitness goals but also learned sustainable habits that I can maintain long-term.",
    },
  ];

  return (
    <div className="bg-black py-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">Testimonials</h1>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {words.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-[#0f172a] p-6 py-12 px-6 rounded-lg text-white shadow-lg flex flex-col md:flex-row items-start gap-4 h-full">
                {/* Profile Circle */}
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h2 className="text-lg font-bold">{item.name}</h2>

                  {/* Stars */}
                  <div className="flex text-yellow-400 my-1">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <FaStar key={i} />
                      ))}
                  </div>

                  <p className="italic text-gray-300 mt-2">"{item.descriptions}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Test;
