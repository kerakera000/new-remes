import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import swiper1 from '../../assets/swiper/swiper1.jpg';
import swiper2 from '../../assets/swiper/swiper2.jpg';
import swiper3 from '../../assets/swiper/swiper3.jpg';

const LineupSwiperComp: React.FC = () => {
    return (
        <Swiper
            spaceBetween={60}
            slidesPerView={1.9}
            centeredSlides={true}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide>
                <img src={swiper1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={swiper3} alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default LineupSwiperComp;