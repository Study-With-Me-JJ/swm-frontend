'use client'

import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getStudy } from '@/app/_lib/getStudy';  
import FilterCategory from '@/components/FilterCategory';
// import Loading from '@/components/ui/Loading';
import StudyItem from '@/components/StudyItem';

export default function StudyRecruit() {
  const [selectOption,setSelectOption] = useState('카테고리 전체');

  // const { data: study, isLoading, error } = useQuery({
  //   queryKey: ['study'],
  //   queryFn: getStudy,
  //   staleTime: 1000 * 60 * 60,  
  //   gcTime: 1000 * 60 * 60 * 24,  
  // });

  // 더미 데이터 추가
  const dummyStudyData = [
    {
      userId: '1',
      studyId: 1,
      title: '리액트 스터디 모집합니다',
      content: '리액트 기초부터 심화까지 함께 공부해요',
      category: '프론트엔드',
      thumbnail: 'https://via.placeholder.com/150',
      likeCount: 0,
      commentCount: 0,
      status: '모집중',
      viewCount: 0,
      nickname: '김개발',
      profileImageUrl: 'https://via.placeholder.com/150',
      studyBookmarkId: null,
      tagInquiryListResponse: [
        {
          studyTagId: 0,
          name: "리액트"
        }
      ],
    }, 
    {
      userId: '2',
      studyId: 2,
      title: '자바 스터디 모집합니다',
      content: '자바 기초부터 심화까지 함께 공부해요',
      category: '백엔드',
      thumbnail: 'https://via.placeholder.com/150',
      likeCount: 0,
      commentCount: 0,
      status: '모집마감',
      viewCount: 0,
      nickname: '김개발',
      profileImageUrl: 'https://via.placeholder.com/150',
      studyBookmarkId: 2,
      tagInquiryListResponse: [
        {
          studyTagId: 0,
          name: "자바"
        },
        {
          studyTagId: 1,
          name: "스프링"
        }
      ],
    }, 
    {
      userId: '3',
      studyId: 3,
      title: '파이썬 스터디 모집합니다',
      content: '파이썬 기초부터 심화까지 함께 공부해요',
      category: '데이터분석',
      thumbnail: 'https://via.placeholder.com/150',
      likeCount: 0,
      commentCount: 0,
      status: '모집중',
      viewCount: 0,
      nickname: '이개발',
      profileImageUrl: 'https://via.placeholder.com/150',
      studyBookmarkId: null,
      tagInquiryListResponse: [
        {
          studyTagId: 0,
          name: "파이썬"
        }
      ],
    }, 
  ];
  // const studyData = study?.data;
  const studyData = dummyStudyData;
  // console.log('studyData type:', typeof studyData, 'value:', studyData);

  // if (isLoading) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'><Loading /></div>;
  // }

  // if (error) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>에러가 발생했습니다.</div>;
  // }

  // if (!studyData) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>데이터를 찾을 수 없습니다.</div>;
  // }

  return (
    <section className='pt-10 pb-[110px] max-w-screen-xl px-5 xl:px-0  mx-auto'>
      <h2 className='text-2xl font-semibold mb-[34px]'>스터디 모집</h2>
      <div className='flex justify-between items-end mb-[34px]'>
        <div className='flex items-center gap-5 justify-start'>
          <FilterCategory  />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[26px] max-w-screen-xl w-full'>
        {studyData.map((item) => (
          <StudyItem key={item.studyId} data={item} />
        ))}
      </div>
    </section>
  )
}