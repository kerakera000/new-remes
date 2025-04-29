import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import item1 from '../../assets/item/item1.jpg';
import item2 from '../../assets/item/item2.jpg';
import item3 from '../../assets/item/item3.jpg';

const ItemSwiperComp: React.FC = () => {
    const swiperRef = React.useRef<any>(null);

    React.useEffect(() => {
        const swiperElements = document.querySelectorAll('.swiper');
        swiperElements.forEach((e) => {
            e.addEventListener('mouseover', function () {
                const getTranslate = swiperRef.current?.getTranslate();
                swiperRef.current?.setTranslate(getTranslate);
                swiperRef.current?.setTransition(0);
            });
            e.addEventListener('mouseout', function () {
                const getTranslate = swiperRef.current?.getTranslate();
                const getSlideWidthMgLeft = parseFloat((document.querySelector('.swiper-slide-active') as HTMLElement)?.style.marginLeft || '0');
                const getSlideWidthMgRight = parseFloat((document.querySelector('.swiper-slide-active') as HTMLElement)?.style.marginRight || '0');
                const getSlideWidth = (document.querySelector('.swiper-slide-active') as HTMLElement)?.offsetWidth || 0;
                const getTotalSlideWidth = getSlideWidthMgLeft + getSlideWidthMgRight + getSlideWidth;
                const diff = -getTotalSlideWidth - (getTranslate % getTotalSlideWidth);
                const diffTime = diff / -getSlideWidth;
                swiperRef.current?.setTranslate(getTranslate + diff);
                swiperRef.current?.setTransition(7000 * diffTime);
            });
        });
    }, []);

    return (
        <Swiper
            spaceBetween={60}
            slidesPerView={2}
            breakpoints={{
                600: {
                    slidesPerView: 6,
                }
            }}
            centeredSlides={true}
            loop={true}
            speed={7000}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            modules={[Autoplay, Navigation, Pagination]}
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}
            className="item_swiper"
        >
            <SwiperSlide>
                <img src={item1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item3} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item1} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item2} alt="" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={item3} alt="" />
            </SwiperSlide>
        </Swiper>
    );
};

export default ItemSwiperComp;