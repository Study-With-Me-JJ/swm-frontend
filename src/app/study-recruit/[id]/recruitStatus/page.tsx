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
import { getStudyParticipation } from '@/lib/api/study/recruitmentPosition';
import { StudyParticipationStatus, STATUS_LABELS } from '@/types/api/study-recruit/recruitmentPosition';
import Loadingbar from '@/components/ui/Loadingbar';
import Image from 'next/image';
import { useState } from 'react';

export default function StudyRecruitStatusPage() { 
    const params = useParams();  
    const { data} = useQuery({
        queryKey: ['study','studyDetail', params.id],
        queryFn: () => getStudyDetail(params.id as string),
    });
    
    const positionList = getPositionOptions(); 
    const statusList = [StudyParticipationStatus.PENDING, StudyParticipationStatus.APPROVED, StudyParticipationStatus.REJECTED, StudyParticipationStatus.CANCEL];

    const positionTitle = positionList.find(
        (position) => position.value === data?.data?.getRecruitmentPositionResponses[0].title,
    )?.label;

    const [pageNo, setPageNo] = useState(0);
    const maxPageButtons = 5;

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
    // console.log('data', data);
    // console.log('participationData', participationData); 

    const totalPages = participationData?.data?.totalPages || 1;
    let startPage = Math.max(0, pageNo - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage >= totalPages) {
        endPage = totalPages - 1;
        startPage = Math.max(0, endPage - maxPageButtons + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <>
          <div className="mx-auto flex max-w-screen-xl items-start justify-between gap-[40px] px-5 pb-[100px] pt-[40px] xl:px-0">
            {/* 왼쪽 영역 */}
            <div className="flex flex-col flex-auto pt-[20px] min-h-[calc(100vh-100px)] overflow-y-auto justify-between"> 
                <div className='flex w-full flex-col gap-[40px] items-center justify-center'> 
                    <div className='text-[24px] font-semibold text-black'>{positionTitle} <span className='text-link-default'>{data?.data?.getRecruitmentPositionResponses[0].headcount}명</span> 모집중</div>
                    {participationLoading ? <Loadingbar /> : (
                    <table className='w-full'>
                        <colgroup>
                            <col width="10%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="*" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className='text-[16px] font-semibold text-black h-[56px] py-[16px] border-b border-[#e0e0e0] pr-[28px] text-center'>상태</th>
                                <th className='text-[16px] font-semibold text-black h-[56px] py-[16px] border-b border-[#e0e0e0] pr-[28px] text-left'>닉네임</th>
                                <th className='text-[16px] font-semibold text-black h-[56px] py-[16px] border-b border-[#e0e0e0] pr-[28px] text-left'>직무</th> 
                                <th className='text-[16px] font-semibold text-black h-[56px] py-[16px] border-b border-[#e0e0e0] text-left'>자기소개</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participationData?.data?.data?.map((item, index: number) => (
                            <tr key={index}>
                                <td className='text-[14px] font-regular text-[#000]  border-b border-[#e0e0e0] pr-[28px] '>
                                    <div className='flex items-center justify-center h-[56px]'>
                                        <span className={`text-center w-[60px] h-[26px] flex items-center justify-center rounded-[4px] text-[12px] font-medium ${statusList.includes(item.status) ? 'bg-[#E7F3FF] text-link-default' : 'bg-[#E7F3FF] text-link-default'}`}>{STATUS_LABELS[item.status as keyof typeof STATUS_LABELS]}</span>
                                    </div>
                                </td>
                                <td className='text-[14px] font-regular text-[#000] border-b border-[#e0e0e0] pr-[28px] '>
                                    <div className='flex items-center justify-start h-[56px]'>
                                        <p className='flex items-center gap-[8px] w-[18px] h-[18px] rounded-full overflow-hidden'>
                                        <Image src={item.profileImageUrl || '/icons/icon_no_profile.svg'} alt="profile" width={18} height={18} />
                                        </p>
                                        {item.nickname}
                                    </div>
                                </td> 
                                <td className='text-[14px] font-regular text-[#000] border-b border-[#e0e0e0] pr-[28px]'>
                                    <div className='flex items-center justify-start h-[56px]'>
                                        {positionTitle}
                                    </div>
                                </td>
                                <td className='text-[14px] font-regular text-[#000] border-b border-[#e0e0e0] text-left line-clamp-1'>
                                    <div className='flex items-center justify-start h-[56px]'>
                                        <Link href={`/study-recruit/${params.id}/recruitStatus/detail`} className='hover:text-link-default'>{item.coverLetter}</Link>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
                <div className='flex items-center justify-center gap-2 mt-4'>
                    <button
                        onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}
                        disabled={pageNo === 0}
                        className="disabled:opacity-50"
                    >
                        <Image src='/icons/icon_gry_18_back.svg' alt='arrow_left' width={16} height={16} style={{transform: 'rotate(180deg)'}} />
                    </button>
                    {pageNumbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => setPageNo(num - 1)}
                            className={`${
                                pageNo === num - 1
                                    ? ' text-black'
                                    : 'text-gray-disabled'
                            }`}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={() => setPageNo((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={pageNo === totalPages - 1}
                        className="disabled:opacity-50"
                    >
                        <Image src='/icons/icon_gry_18_back.svg' alt='arrow_left' width={16} height={16} />
                    </button>
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