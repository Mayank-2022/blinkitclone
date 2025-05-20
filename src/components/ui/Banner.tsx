import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,Pagination,Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerProps {
    banners:Array<{
        id:number,
        image: string,
        alt: string,
    }>;
}


const Banner: React.FC<BannerProps> = ({ banners }) => {
    return (
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-48 md:h-64 lg:h-80">
            {banners.map((banner) => (
                <SwiperSlide keys ={banner.id}>
                    <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
                        <img
                            src={banner.image}
                            alt={banner.alt}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        </div>
                        </SwiperSlide>
            ))}
        </Swiper>
    )
}
export default Banner;


