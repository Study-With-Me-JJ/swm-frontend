'use client'
 
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
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
    useSlider?:boolean;
}

export default function SlideItem({ slideData, useSlider=false }: SlideItemProps) {
    // console.log('slideData type:', typeof slideData, 'value:', slideData);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    if(!slideData) {
        return <div>데이터가 없습니다.</div>;
    }

    if(slideData.length === 0) {
        return <div>표시할 데이터가 없습니다.</div>;
    }

   const ItemContent = ({slideData}:SlideItemProps) => {
        return (
            <>
                {slideData.map((item, index) => (
                    <div key={`item-${index}`}>
                        <div>{item.title}</div>
                    </div>
                ))}
            </>
        );
    }
     
    return useSlider ? (
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
                {slideData.map((index) => (
                    <SwiperSlide key={`slide-${index}`}>          
                        <ItemContent slideData={slideData} />
                    </SwiperSlide>  
                ))}
            </Swiper>
            <div className="swiper-navigation top-4">
                <button ref={prevRef} className="swiper-button-prev"></button>
                <button ref={nextRef} className="swiper-button-next"></button>
            </div>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl w-full">
            <ItemContent slideData={slideData} />
        </div>
    )
}   
