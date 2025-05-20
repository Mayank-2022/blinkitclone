import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BannerProps {
  banners: Array<{
    id: number;
    image: string;
    alt: string;
  }>;
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-48 md:h-64 lg:h-80"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;