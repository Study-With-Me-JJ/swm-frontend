"use client"

import ExternalStudyItem from "./ExternalStudyItem";
import Link from "next/link";
import Image from "next/image";
import { getExternalStudy } from "@/lib/api/study/getExternalStudy";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/Loading";

export default function ExternalStudySection() {
    
    const { data: externalStudy, isLoading, error } = useQuery({
        queryKey: ['externalStudy'],
        queryFn: getExternalStudy,
        staleTime: 1000 * 60 * 60,  
        gcTime: 1000 * 60 * 60 * 24,  
    });
    const externalStudyData = externalStudy?.data.externalStudies;  
    // console.log('externalStudyData type:', typeof externalStudyData, 'value:', externalStudyData);
    if (error) return <div>에러가 발생했습니다</div>;

    return <>
        <article className='relative'>
          <div className='flex items-center justify-between mb-[40px]'>
            <div className='flex items-center gap-[20px] '>
              <h3 className='text-left text-2xl font-semibold text-black'>곧 마감되는 스터디</h3>
              <Link href='/external-studies' className='flex items-center gap-[6px] text-base font-semibold text-gray-light'>전체보기 <Image src="/icons/icon_gry_18_back.svg" alt="arrow-right" width={14} height={14}/></Link>
            </div>
          </div>
          {isLoading ? (
            <div className='flex justify-center items-center max-w-screen-xl mx-auto'><Loading /></div>
          ) : externalStudyData && (
            <div className='flex items-center gap-[20px] max-w-screen-xl w-full'>
              <ExternalStudyItem slideData={externalStudyData.content} useSlider={true}/>
            </div>
          )}
        </article>
    </>
}