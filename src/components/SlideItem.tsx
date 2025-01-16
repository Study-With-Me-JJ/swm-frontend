'use client'
 
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useRef } from 'react';
 

interface StudyRoom {  
    title: string;
    thumbnail: string;
    locality: string;
    likeCount: number;
    reviewCount: number;
    entireMinPricePerHour: number;
    entireMaxHeadcount: number;
    starAvg: number;
    studyBookmarkId: number | null;
    tags: {
        studyRoomTagId: number;
        tag: string;
    }[];
}

interface SlideItemProps {  
    slideData: StudyRoom[];
}

export default function SlideItem({ slideData }: SlideItemProps) {
    // console.log('slideData type:', typeof slideData, 'value:', slideData);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    if(!slideData) {
        return <div>데이터가 없습니다.</div>;
    }

    if(slideData.length === 0) {
        return <div>표시할 데이터가 없습니다.</div>;
    }
    
    return (
        <div className="swiper-container max-w-screen-xl">
            <Swiper  
                className="my-swiper"
                modules={[Navigation, Autoplay]}
                loop={true}  
                spaceBetween={20}   
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                slidesPerView="auto"
                // autoplay={{
                //     delay: 2500,
                //     disableOnInteraction: false,  
                // }}
                breakpoints={{  
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }}
            >
                {slideData.map((item, index) => (
                    <SwiperSlide key={`slide-${index}`}>          
                        <div>
                            <div>{item.title}</div> 
                        </div>
                    </SwiperSlide>  
                ))}
            </Swiper>
            <div className="swiper-navigation">
                <button ref={prevRef} className="swiper-button-prev"> </button>
                <button ref={nextRef} className="swiper-button-next"></button>
            </div>
        </div>
    )
}   