'use client'

import axiosInstance from '@/lib/api/axios'; 
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import Link from 'next/link';
import Image from 'next/image'; 
import SlideItem from '@/components/SlideItem';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';

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

interface StudyRoomResponse {
    data: StudyRoom[];
    numberOfElements: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
}

export default function Home() {
  const [studyRooms, setStudyRooms] = useState<StudyRoomResponse>({
    data: [], 
    numberOfElements: 0,
    totalPages: 0,
    totalElements: 0,
    hasNext: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const response = await axiosInstance.get<{message: string, data: StudyRoomResponse}>(API_ENDPOINTS.STUDY_ROOM.LIST); 
        // console.log('API 응답:', response.data); 
        setStudyRooms({
          data: response.data.data.data,
          numberOfElements: response.data.data.numberOfElements,
          totalPages: response.data.data.totalPages,
          totalElements: response.data.data.totalElements,
          hasNext: response.data.data.hasNext
        });
        setIsLoading(false);
        
      } catch (error) {
        if(error instanceof AxiosError) {
          console.error(error.response?.data);
        } else {
          setError('스터디룸 데이터를 불러오는 중 오류가 발생했습니다.');
        }
        setIsLoading(false);
      }
    };
    fetchStudyRooms();
  }, []);

  // console.log('console',studyRooms.data);

  const categories = ['프론트엔드', '백엔드', '앱', '디자인', '머신러닝'];

  return (
    <>
    <div className='mt-[60px] py-[60px] bg-[linear-gradient(360deg,_#A8D3FF,_#2689EF)] max-w-screen-xl px-5 xl:px-0 mx-auto rounded-[8px]'>
        <h2 className='text-center text-2xl font-medium text-white '>함께 배우고 성장하며 꿈을 현실로 만드는 여정</h2>
        <p className='text-center text-lg font-normal text-white mt-[20px]'>다양한 분야의 팀원을 찾아보세요!</p>
        <div className='flex gap-[20px] justify-center items-center mt-[40px]'>
            {categories.map((category, index) => (
                <div key={index} className='flex items-center justify-center w-[140px] h-[140px] border border-[#e0e0e0] bg-white rounded-[16px]'>{category}</div>
            ))}  
        </div> 
    </div>
    <section className='pt-[100px] pb-[200px] max-w-screen-xl px-5 xl:px-0 mx-auto flex flex-col gap-[100px]'> 
        <article className='relative'>
          <div className='flex items-center justify-between mb-[40px]'>
            <div className='flex items-center gap-[20px] '>
              <h3 className='text-left text-2xl font-semibold text-black'>요즘 뜨는 스터디룸</h3>
              <Link href='/studyroom' className='flex items-center gap-[6px] text-base font-semibold text-gray-light'>전체보기 <Image src="/icons/icon_gry_18_back.svg" alt="arrow-right" width={14} height={14}/></Link>
            </div>
          </div>
          <div className='flex items-center gap-[20px]'>
          {isLoading ? (
              <div>로딩 중...</div>
            ) : error ? (
              <div>{error}</div>
            ) : studyRooms.data.length > 0 ? (
              <SlideItem slideData={studyRooms.data} />
            ) : (
              <div>스터디룸이 없습니다.</div>
            )}
          </div>
        </article>
        <article>
          <h3 className='text-left text-2xl font-semibold text-black mb-[40px]'>곧 마감되는 스터디</h3>
          <div className='flex items-center gap-[20px]'>
            <div className=' '></div>
          </div>
        </article>
    </section>
    </>
  );
}
