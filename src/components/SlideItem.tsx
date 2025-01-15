'use client'
 
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
 

interface StudyRoom {
    id: number;
    title: string;
    thumbnail: string;
    locality: string;
    likeCount: number;
    reviewCount: number;
    entireMinPricePerHour: number;
    entireMaxHeadcount: number;
    starAvg: number;
    studyBookmarkId: number;
    tags: {
        studyRoomTagId: number;
        tag: string;
    }[];
}

interface SlideItemProps {  
    slideData: {
        data: StudyRoom[];
    }
}

export default function SlideItem({ slideData }: SlideItemProps) {
    // console.log('slideData type:', typeof slideData.data, 'value:', slideData.data);

    const slides = Array.isArray(slideData) ? slideData : Object.values(slideData.data); 

    if(!slideData.data) {
        return <div>데이터가 없습니다.</div>;
    }

    if(slideData.data.length === 0) {
        return <div>표시할 데이터가 없습니다.</div>;
    }
    
    return (
        <div className="swiper-container max-w-screen-xl">
            <Swiper  
                className="my-swiper"
                modules={[Navigation, Autoplay]}
                loop={true}  
                spaceBetween={20}   
                navigation={true}  
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
                {slides.map((slide: StudyRoom, index: number) => (
                    <SwiperSlide key={`slide-${index}`}>          
                        <div>
                            <div>{slide.title}</div> 
                        </div>
                    </SwiperSlide>  
                ))}
            </Swiper>
        </div>
    )
}   