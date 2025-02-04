'use client'

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { getStudy } from '@/app/_lib/getStudy';
import { getExternalStudy } from '@/app/_lib/getExternalStudy';
import ExternalStudyItem from '@/components/ExternalStudyItem';
import FilterCategory from '@/components/FilterCategory';
import Loading from '@/components/ui/loading';

export default function StudyRecruit() {
  const [selectOption,setSelectOption] = useState('카테고리 전체');

  // const study = useQuery({
  //   queryKey: ['study'],
  //   queryFn: getExternalStudy,
  //   staleTime: 1000 * 60 * 60,  
  //   gcTime: 1000 * 60 * 60 * 24,  
  // });
  const { data: externalStudy, isLoading, error } = useQuery({
    queryKey: ['externalStudy'],
    queryFn: getExternalStudy,
    staleTime: 1000 * 60 * 60,  
    gcTime: 1000 * 60 * 60 * 24,  
  });
  const externalStudyData = externalStudy?.data.externalStudies;  
  // console.log('externalStudyData type:', typeof externalStudyData, 'value:', externalStudyData);

  if (isLoading) {
    return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'><Loading /></div>;
  }

  if (error) {
    return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>에러가 발생했습니다.</div>;
  }

  if (!externalStudyData) {
    return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <section className='pt-10 pb-[110px] max-w-screen-xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-[34px]'>스터디 모집</h2>
      <div className='flex justify-between items-end mb-[34px]'>
        <div className='flex items-center gap-5 justify-start'>
          <FilterCategory  />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl w-full'>
        <ExternalStudyItem slideData={externalStudyData.content} useSlider={false}/>
      </div>
    </section>
  )
}