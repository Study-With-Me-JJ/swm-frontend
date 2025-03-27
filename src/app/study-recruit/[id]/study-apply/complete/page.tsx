'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getStudyDetail } from '@/lib/api/study/getStudyDetail';

export default function StudyApplyCompletePage() {
    const params = useParams();
    const { data} = useQuery({
        queryKey: ['study','studyDetail', params.id],
        queryFn: () => getStudyDetail(params.id as string),
    }); 

    return (
        <>
            <div className='mx-auto flex flex-col items-center gap-[40px] py-[160px] xl:px-0'>
                <div className='text-[24px] font-semibold text-black text-center'>스터디 참여 신청이 완료되었습니다.</div>
                <div className='w-[860px] text-left rounded-[10px] bg-[#E7F3FF] px-[40px] py-[50px]'>
                    <div className='text-[24px] font-semibold text-black'>{data?.data.title}</div>
                    <div className='my-[30px] border-t border-[#ababab]'></div>
                    <div className='flex flex-col gap-[16px]'>
                        <div className='flex gap-[16px] items-center'>
                            <div className='flex-1 flex gap-[20px]'>
                                <div className='text-[18px] font-regular text-[#6d6d6d]'>신청 직무</div>
                                <div className='text-[18px] font-medium text-black'>디자이너</div>
                            </div>
                            <div className='flex-1 flex gap-[10px]'>
                                <div className='text-[16px] font-medium text-black'>신청 직무</div>
                                <div className='text-[16px] font-medium text-black'>디자이너</div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}