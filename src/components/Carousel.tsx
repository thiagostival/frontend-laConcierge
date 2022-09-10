import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

// STYLES Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface IProps {
  children: any;
}

export function Carousel({ children }: IProps) {
  return (
    <Swiper
      grabCursor={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      centeredSlides={true}
      effect="coverflow"
      slidesPerView="auto"
      modules={[EffectCoverflow, Pagination]}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
    >
      {children}
    </Swiper>
  );
}
