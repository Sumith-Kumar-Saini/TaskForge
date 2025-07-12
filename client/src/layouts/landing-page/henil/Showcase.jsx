import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Showcase = () => {
  return (
    <div className="mt-16 mb-10">
      <div className="hidden md:block">
        <Swiper
          navigation={true}
          pagination={true}
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          <SwiperSlide className="!flex flex-wrap items-center justify-center gap-8 pb-10">
            <div className="w-1/2 lg:w-2/5 h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
              Dashboard overview
            </div>
            <div className="w-1/2 lg:w-2/5 h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
              Task detail view
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex flex-wrap items-center justify-center gap-8 pb-10">
            <div className="w-1/2 lg:w-2/5 h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
              Team chat or collaboration page
            </div>
            <div className="w-1/2 lg:w-2/5 h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
              Settings & analytics
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="block md:hidden space-y-6 px-4">
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
          Dashboard overview
        </div>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
          Task detail view
        </div>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
          Team chat or collaboration page
        </div>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-400 border">
          Settings & analytics
        </div>
      </div>

    </div>
  )
}

export default Showcase
