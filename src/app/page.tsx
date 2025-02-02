'use client'

import axiosInstance from '@/lib/api/axios'; 
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import Link from 'next/link';
import Image from 'next/image'; 
import StudyroomItem from '@/components/StudyroomItem';
import ExternalStudyItem from '@/components/ExternalStudyItem';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { StudyRoomResponse } from '@/types/api/study-rooms';
import { ExternalStudyResponse } from '@/types/api/external-study';

export default function Home() {
  //스터디룸
  const [studyRooms, setStudyRooms] = useState<StudyRoomResponse>({
    data: [], 
    numberOfElements: 0,
    totalPages: 0,
    totalElements: 0,
    hasNext: false
  });

  //외부스터디
  const [externalStudy, setExternalStudy] = useState<ExternalStudyResponse>({
    externalStudies: {
      content: [],
      deadlineDate: [],
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const studyRoomsResponse = await axiosInstance.get<{message: string, data: StudyRoomResponse}>(
          API_ENDPOINTS.STUDY_ROOM.LIST
        );
        
        const sortedData = studyRoomsResponse.data.data.data.sort((a, b) => b.likeCount - a.likeCount);
        setStudyRooms({
          data: sortedData,
          numberOfElements: studyRoomsResponse.data.data.numberOfElements,
          totalPages: studyRoomsResponse.data.data.totalPages,
          totalElements: studyRoomsResponse.data.data.totalElements,
          hasNext: studyRoomsResponse.data.data.hasNext
        });
 
        try {
          const externalStudyResponse = await axiosInstance.get<{message: string, data: ExternalStudyResponse}>(
            API_ENDPOINTS.EXTERNAL_STUDY.LIST
          );
          
          console.log('외부 스터디 요청 URL:', API_ENDPOINTS.EXTERNAL_STUDY.LIST);
          console.log('외부 스터디 응답 전체:', externalStudyResponse);
          
          if (externalStudyResponse.data?.data) {
            setExternalStudy(externalStudyResponse.data.data);
          } else {
            console.error('외부 스터디 데이터 구조:', externalStudyResponse.data);
            setError('외부 스터디 데이터 구조가 올바르지 않습니다.');
          }
        } catch (externalError) {
          console.error('외부 스터디 API 에러:', externalError);
          if (externalError instanceof AxiosError) {
            console.error('외부 스터디 상세 에러:', {
              status: externalError.response?.status,
              data: externalError.response?.data,
              config: externalError.config
            });
          }
          setError('외부 스터디 데이터를 불러오는데 실패했습니다.');
        }

      } catch (error) {
        console.error('외부 스터디 데이터 불러오기 오류:', error);
        setError('외부 스터디 데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    <section className='pt-[100px] pb-[200px] max-w-screen-xl px-5 xl:px-0 mx-auto flex flex-col gap-[80px]'> 
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
              <StudyroomItem slideData={studyRooms.data} useSlider={true}/>
            ) : (
              <div>스터디룸이 없습니다.</div>
            )}
          </div>
        </article>
        <article className='relative'>
          <div className='flex items-center justify-between mb-[40px]'>
            <div className='flex items-center gap-[20px] '>
              <h3 className='text-left text-2xl font-semibold text-black'>곧 마감되는 스터디</h3>
              <Link href='/external-studies' className='flex items-center gap-[6px] text-base font-semibold text-gray-light'>전체보기 <Image src="/icons/icon_gry_18_back.svg" alt="arrow-right" width={14} height={14}/></Link>
            </div>
          </div>
          <div className='flex items-center gap-[20px]'>
            {isLoading ? (
              <div>로딩 중...</div>
            ) : error ? (
              <div>{error}</div>
            ) : externalStudy.externalStudies.content && externalStudy.externalStudies.content.length > 0 ? (
              <ExternalStudyItem slideData={externalStudy.externalStudies.content} useSlider={true}/>
            ) : (
              <div>스터디가 없습니다.</div>
            )}
          </div>
        </article>
    </section>
    </>
  );
}
