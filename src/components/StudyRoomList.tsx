"use client"

import StudyroomItem from "./StudyroomItem";
import Link from "next/link";
import Image from "next/image";
import { getStudyRoom } from "@/app/_lib/getStudyRoom";
import { useQuery } from "@tanstack/react-query";

export default function StudyRoomList() {
    
    const { data: studyRooms, isLoading, error } = useQuery({
        queryKey: ['studyRooms'],
        queryFn: getStudyRoom,
        staleTime: 1000 * 60 * 60,  
        gcTime: 1000 * 60 * 60 * 24,  
    });
    const studyRoomsData = studyRooms?.data;
    // console.log('studyRoomsData type:', typeof studyRoomsData, 'value:', studyRoomsData);
    if (isLoading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!studyRoomsData) return null;

    return <>
        <article className='relative'>
          <div className='flex items-center justify-between mb-[40px]'>
            <div className='flex items-center gap-[20px] '>
              <h3 className='text-left text-2xl font-semibold text-black'>요즘 뜨는 스터디룸</h3>
              <Link href='/studyroom' className='flex items-center gap-[6px] text-base font-semibold text-gray-light'>전체보기 <Image src="/icons/icon_gry_18_back.svg" alt="arrow-right" width={14} height={14}/></Link>
            </div>
          </div>
          <div className='flex items-center gap-[20px] max-w-screen-xl w-full'>
            <StudyroomItem slideData={studyRoomsData.data} useSlider={true}/>
          </div>
        </article>
    </>
}