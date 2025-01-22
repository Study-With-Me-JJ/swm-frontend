'use client'
 
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import { useEffect, useRef } from 'react';
import Image from 'next/image'; 
import { NavigationOptions } from 'swiper/types';
import { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
interface StudyRoom {  
    studyRoomId: number;
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
    useSlider?: boolean;
}
 
export default function ListItem({ slideData, useSlider=false }: SlideItemProps) {
    // console.log('slideData type:', typeof slideData, 'value:', slideData);
  
    useEffect(() => {
        // Swiper 인스턴스가 생성된 후에 실행됩니다
        const swiperElement = document.querySelector('.swiper');
        const swiper =(swiperElement as unknown as { swiper: SwiperType })?.swiper;
        if (swiper) {
            swiper.update(); // Swiper 업데이트
        }
      }, [slideData]); // slideData가 변경될 때마다 실행

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null); 

    if(!slideData) {
        return <div>데이터가 없습니다.</div>;
    }

    if(slideData.length === 0) {
        return <div>표시할 데이터가 없습니다.</div>;
    } 

    interface ItemContentProps {
        item: StudyRoom;  
    }

    const ItemContent = ({item}:ItemContentProps) => {
        const handleCopy = (phoneNumber: string) => {
            navigator.clipboard.writeText(phoneNumber)
            .then(()=> { 
                alert('복사되었습니다.');
            })
            .catch(()=> {
                alert('복사에 실패했습니다.');
            })
        }
        return (
            <>
                <div>
                    <div className="rounded-[8px] relative w-full aspect-[4/1.55] overflow-hidden">
                        <Link href={`/studyroom/${item.studyRoomId}`}>
                        {item.thumbnail ? (
                            // <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                            <Image src={'/no-image.png'} alt={item.title} fill className="object-cover" />
                        ) : (
                            <Image src={'/no-image.png'} alt={item.title} fill className="object-cover" />
                        )}
                        </Link>
                    </div>
                    <div className="pt-[25px]">
                        <div className='flex items-center justify-between gap-1'>
                            <Link href={`/studyroom/${item.studyRoomId}`} className='text-[20px] font-bold text-black'>{item.title}</Link>
                            <div className='flex items-center gap-[10px]'>
                                <button className='text-[12px] font-semibold text-link-default px-[10px] py-[6px] rounded-[4px] border border-link-default'>홈페이지</button>
                                <button className='text-[12px] font-semibold text-link-default px-[10px] py-[6px] rounded-[4px] border border-link-default'>지도에서 보기</button>
                            </div>                            
                        </div>          
                        <div className='pt-[16px] flex gap-[6px] flex-col'>
                            <p className='flex items-center gap-[4px] text-[14px] font-regular text-black'><Image src={'/icons/icon_pin.svg'} alt="location" width={20} height={20}/>{item.locality}</p>
                            <p className='flex items-center gap-[4px] text-[14px] font-regular text-black'><Image src={'/icons/icon_call.svg'} alt="call" width={20} height={20}/>000-000-0000 <button onClick={()=> handleCopy('000-000-0000')}><Image src={'/icons/icon_blue_18_copy.svg'} alt="복사하기" width={20} height={20}/></button></p>
                        </div>
                        <div className='pt-[16px]'>
                            <p className='text-[12px] font-regular text-[#828282]'>종로3가 5번출구로 나오셔서 낙원동 98-1로 찾아오시면됩니다. 약 70m</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
     
    if (useSlider) {
        return (
            <div className="swiper-container max-w-screen-xl">
                <Swiper  
                    className="my-swiper"
                    modules={[Navigation]}
                    loop={true}  
                    spaceBetween={20}   
                    observer={true}
                    observeParents={true}
                    watchOverflow={true}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    } as NavigationOptions}
                    onSwiper={(swiper) => {
                        setTimeout(() => {
                            swiper.update();
                        }, 100);
                    }}
                    onBeforeInit={(swiper) => {
                        if (typeof swiper.params.navigation !== 'boolean') {
                            const nav = swiper.params.navigation;
                            if (nav) {
                                nav.prevEl = prevRef.current;
                                nav.nextEl = nextRef.current;
                            }
                        }
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
                {slideData.map((item, index) => (
                    <SwiperSlide key={`slide-${index}`}>          
                        <ItemContent item={item} />
                    </SwiperSlide>  
                ))}
                </Swiper>
            <div className="swiper-navigation top-4">
                <button ref={prevRef} className="swiper-button-prev"></button>
                <button ref={nextRef} className="swiper-button-next"></button>
                </div>
            </div>
        ) 
    } else {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl w-full">
                {slideData.map((item, index) => (
                    <div key={`item-${index}`}>
                        <div>{item.title}</div>
                    </div>
                ))}
            </div>
        )
    }
}