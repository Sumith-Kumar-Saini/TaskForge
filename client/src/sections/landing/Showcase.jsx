import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slide data
const showcaseItems = [
  "Dashboard overview",
  "Task detail view",
  "Team chat or collaboration page",
  "Settings & analytics",
];

// Styles
const cardClass =
  "flex items-center justify-center bg-gray-100 text-gray-400 border text-center h-[300px] md:h-[400px]";

const Showcase = () => {
  return (
    <section className="mt-16 mb-10 px-4 md:px-10 xl:px-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: false, progressbarOpposite: true }}
        autoplay={{ delay: 5000 }}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
      >
        {showcaseItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={cardClass}>{item}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Showcase;
