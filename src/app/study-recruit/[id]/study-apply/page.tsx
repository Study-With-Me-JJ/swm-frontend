'use client';

import { useParams,useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getStudyDetail } from '@/lib/api/study/getStudyDetail';
import {
    GetRecruitmentPositionResponse,
    GetTagResponse,
  } from '@/types/api/study-recruit/getStudyDetail';
  import { getPositionOptions } from '@/types/api/study-recruit/study';
import Image from 'next/image'; 

export default function StudyApplyPage() {
    const router = useRouter();
    const params = useParams();

    const positionList = getPositionOptions();


    const { data} = useQuery({
        queryKey: ['study','studyDetail', params.id],
        queryFn: () => getStudyDetail(params.id as string),
    });
    console.log('data', data);
    

    return (
        <>
          <div className="mx-auto flex max-w-screen-xl items-start justify-between gap-[40px] px-5 pb-[100px] pt-[40px] xl:px-0">
            {/* 왼쪽 영역 */}
            <div className="flex flex-auto flex-col gap-[40px] pt-[20px]">
              <div className="text-[24px] font-semibold text-black">스터디 참여하기</div>
              
            </div>
            {/* 오른쪽 영역 */}
            <div className="sticky top-[0px] flex w-[380px] flex-shrink-0 flex-col gap-[40px] bg-white pt-[20px]">
                <div className="flex flex-col gap-[30px]">
                    <div className="text-[24px] font-semibold text-black">{data?.data?.title}</div>
                    <ul>
                        <li className="flex items-center justify-start border-t border-gray-disabled py-[16px]">
                            <div className="text-[16px] font-semibold text-black w-[120px] flex-shrink-0">모집 직무</div>
                            <div className="flex items-center gap-[4px] flex-wrap">
                                {data?.data?.getRecruitmentPositionResponses.map(
                                    (item: GetRecruitmentPositionResponse) => (
                                    <div
                                        key={item.recruitmentPositionId}
                                        className="rounded-[4px] bg-[#eee] px-[7px] py-[5px] text-sm font-medium text-[#565656]"
                                    >
                                        {
                                        positionList.find(
                                            (position) => position.value === item.title,
                                        )?.label
                                        }{' '}
                                        <span className="text-link-default">
                                        {item.headcount}명
                                        </span>
                                    </div>
                                    ),
                                )}
                            </div>
                        </li>
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
                    </ul> 
                </div>
                <Link href={`/study-recruit/${params.id}`} className="flex items-center justify-center rounded-[8px] border border-link-default h-[60px] text-[16px] font-semibold text-link-default">
                    스터디 상세페이지로 돌아가기
                </Link>
                <div className="flex flex-col gap-[30px]">
                    <div className="text-[24px] font-semibold text-black">
                    모집 현황
                    </div>
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
                                {item.acceptedCount}명 신청중
                            </span>
                            </div>
                        </li>
                        ),
                    )}
                    </ul>
                </div> 
            </div>
          </div> 
        </>
    );
}