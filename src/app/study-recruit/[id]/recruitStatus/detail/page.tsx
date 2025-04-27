'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getStudyDetail } from '@/lib/api/study/getStudyDetail';
import {
    GetRecruitmentPositionResponse,
    GetTagResponse,
  } from '@/types/api/study-recruit/getStudyDetail';
  import { getPositionOptions } from '@/types/api/study-recruit/study'; 
  import { getApplyStudyDetail } from '@/lib/api/study/getApplyStudyDetail'; 
  import { getStudyParticipation } from '@/lib/api/study/recruitmentPosition';
  import { StudyParticipationStatus } from '@/types/api/study-recruit/recruitmentPosition';
  import { useState } from 'react';

import Image from 'next/image';
export default function StudyRecruitStatusDetailPage() { 
    const params = useParams();  
    const { data} = useQuery({
        queryKey: ['study','studyDetail', params.id],
        queryFn: () => getStudyDetail(params.id as string),
    });
    const [pageNo, setPageNo] = useState(0);

    const recruitmentPositionId = data?.data?.getRecruitmentPositionResponses[0]?.recruitmentPositionId;
    const { data: participationData, isLoading: participationLoading } = useQuery({
        queryKey: ['study', 'studyParticipation', params.id, pageNo],
        queryFn: () =>
            getStudyParticipation(String(recruitmentPositionId), {
                status: StudyParticipationStatus.PENDING,
                pageNo,
            }),
        enabled: !!recruitmentPositionId,
    });

    const participationId = participationData?.data?.data[0].participationId as string | undefined;
    const {data:applyDetailData} = useQuery({ 
        queryKey: ['study','studyApplyDetail', params.id],
        queryFn: () => getApplyStudyDetail(participationId as string),
        enabled: !!participationId,
    });

    const positionList = getPositionOptions();  

    const positionTitle = positionList.find(
        (position) => position.value === data?.data?.getRecruitmentPositionResponses[0].title,
    )?.label; 
 
    // console.log('data', data);  
    console.log('applyDetailData', applyDetailData);

    return (
        <>
          <div className="mx-auto flex max-w-screen-xl items-start justify-between gap-[40px] px-5 pb-[100px] pt-[40px] xl:px-0">
            {/* 왼쪽 영역 */}
            <div className="flex flex-col flex-auto pt-[20px] min-h-[calc(100vh-100px)] overflow-y-auto justify-between"> 
                <div className='flex w-full flex-col gap-[40px] items-center justify-center'> 
                    <div className='flex items-center gap-[8px] w-full justify-between'>
                        <Link href={`/study-recruit/${params.id}/recruitStatus`}>
                            <Image src='/icons/icon_gry_18_back.svg' alt='뒤로가기' width={18} height={18} className='transform rotate-180' style={{filter: 'invert(2)'}}/>
                        </Link>
                        <div className='text-[24px] font-semibold text-black'>{positionTitle} <span className='text-link-default'>{data?.data?.getRecruitmentPositionResponses[0].headcount}명</span> 모집중</div>
                        <div></div>
                    </div>
                    <div className='px-[20px] w-full'>
                        <div className='py-[40px] px-[24px] bg-[#f9f9f9] rounded-[10px]'>
                            <div className='flex gap-[20px] flex-col items-center justify-start w-full pb-[32px] border-b border-[#ddd]'>
                                <div className='flex gap-[10px] items-center w-full'>
                                    <div className='flex-1 flex items-center gap-[20px]'>
                                        <div className='text-[16px] font-regular text-[#6d6d6d]'>닉네임</div>
                                        <div className='text-[16px] font-medium text-[#000]'>{applyDetailData?.data?.nickname}</div>
                                    </div>
                                    <div className='flex-1 flex items-center gap-[20px]'>
                                        <div className='text-[16px] font-regular text-[#6d6d6d]'>직무</div>
                                        <div className='text-[16px] font-medium text-[#000]'>{positionList.find(
                                            (position) => position.value === data?.data?.getRecruitmentPositionResponses[0].title,
                                        )?.label}</div>
                                    </div>
                                </div>
                                <div className='flex gap-[10px] items-center w-full'>
                                    <div className='flex-1 flex items-center gap-[20px]'>
                                        <div className='text-[16px] font-regular text-[#6d6d6d]'>상태</div>
                                        <div className='text-[16px] font-medium text-[#000]'>송지윤</div>
                                    </div>
                                    <div className='flex-1 flex items-center gap-[20px]'>
                                        <div className='text-[16px] font-regular text-[#6d6d6d]'>카카오 ID</div>
                                        <div className='text-[16px] font-medium text-link-default'>신청승인 시 확인 가능합니다.</div>
                                    </div>
                                </div>
                                <div className='flex gap-[10px] items-center w-full'>
                                    <div className='flex-1 flex items-center gap-[20px]'>
                                        <div className='text-[16px] font-regular text-[#6d6d6d]'>URL</div>
                                        <div className='text-[16px] font-medium text-[#000]'>www.dsdaret.com</div>
                                    </div> 
                                </div>
                                <div className='flex gap-[10px] items-center w-full'>
                                    <div className='flex-1 flex items-center gap-[20px]'>
                                        <div className='text-[16px] font-regular text-[#6d6d6d]'>파일</div>
                                        <div className='text-[16px] font-medium text-[#000]'>design portfolio.pdf</div>
                                        <a href="" download className='w-[22px] h-[22px] flex items-center justify-center rounded-[4px] border border-link-default'><Image src='/icons/File-download.svg' alt='다운로드' width={10} height={10} /></a>
                                    </div> 
                                </div>
                            </div>
                            <div className='pt-[32px] flex flex-col gap-[16px]'>
                                <div className='text-[16px] font-regular text-[#6d6d6d]'>자기소개서</div>
                                <div className='text-[14px] font-regular text-[#6d6d6d]'>자기소개글 내용</div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            {/* 오른쪽 영역 */}
            <div className="sticky top-[0px] flex w-[380px] flex-shrink-0 flex-col gap-[40px] bg-white pt-[20px]">
                <div className="flex flex-col gap-[30px]">
                    <div className="text-[24px] font-semibold text-black">{data?.data?.title}</div>
                    <ul> 
                        {data?.data?.getRecruitmentPositionResponses.map(
                        (item: GetRecruitmentPositionResponse) => (
                        <li
                            key={item.recruitmentPositionId}
                            className="flex items-center justify-between gap-[5px] border-t border-gray-disabled py-[16px]"
                        >
                            <div className="flex items-center gap-[8px]">
                            <div className="text-[16px] font-semibold text-black">
                                {
                                positionList.find(
                                    (position) => position.value === item.title,
                                )?.label
                                }{' '}
                                <span className="text-link-default">
                                {item.headcount}명
                                </span>{' '}
                                모집중
                            </div>
                            {/* <div className="h-[30px] min-w-[40px] rounded-[4px] bg-[#E7F3FF] px-[6px] py-[4px] text-[14px] font-medium text-link-default">
                            신청함
                            </div> */}
                            </div>
                            <div>
                            <span className="box-border block h-[30px] min-w-[50px] rounded-[4px] border border-[#eee] px-[6px] py-[4px] text-[14px] font-medium text-[#a5a5a5]">
                                {item.participatedCount}명 신청중
                            </span>
                            </div>
                        </li>
                        ),
                    )}
                        {data?.data?.getTagResponses && data?.data?.getTagResponses.length > 0 && (
                            <li className="flex items-center justify-start border-t border-gray-disabled py-[16px]">
                                <div className="text-[16px] font-semibold text-black w-[120px] flex-shrink-0">태그</div>
                                <div className="flex items-center gap-[4px] flex-wrap">
                                    {data?.data?.getTagResponses.map((item: GetTagResponse) => (
                                        <div
                                            key={item.tagId}
                                            className="rounded-[4px] bg-[#fff] px-[6px] py-[4px] text-sm font-medium text-[#a5a5a5] border border-[#eee]"
                                        >
                                            #{item.name}
                                        </div>
                                    ))}
                                </div>
                            </li>
                        )}
                    </ul> 
                </div>
                <Link href={`/study-recruit/${params.id}`} className="flex items-center justify-center rounded-[8px] border border-link-default h-[60px] text-[16px] font-semibold text-link-default">
                    스터디 상세페이지로 돌아가기
                </Link>
            </div>
          </div> 
        </>
    );
}