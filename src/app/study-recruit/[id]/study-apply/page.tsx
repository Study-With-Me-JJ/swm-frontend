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
import { FormProvider, useForm } from 'react-hook-form';
import { InputField } from '@/components/InputField'; 
import { useState } from 'react';
import { POSITION_LABELS, RecruitmentPositionTitle } from '@/types/api/study';
import FilterSelect from '@/components/ui/FilterSelect';
import { useToastStore } from '@/store/useToastStore';

const SELECT_IDS = { 
    POSITION: 'POSITION', 
  } as const;

export default function StudyApplyPage() { 
    const params = useParams();
    const router = useRouter();
    const { showToast } = useToastStore();

    const positionList = getPositionOptions();


    const { data} = useQuery({
        queryKey: ['study','studyDetail', params.id],
        queryFn: () => getStudyDetail(params.id as string),
    });
    // console.log('data', data);

    const methods = useForm();
    const { watch } = methods;

    const onSubmit = methods.handleSubmit(async (data) => {
        // console.log('data', data);
        router.push(`/study-recruit/${params.id}/study-apply/complete`);
    });
 

    const [selectPosition, setSelectPosition] = useState<string | string[]>([]);
    const [openSelectId, setOpenSelectId] = useState<keyof typeof SELECT_IDS | null>(null);
    const positionOptions = data?.data?.getRecruitmentPositionResponses.map((item: GetRecruitmentPositionResponse) => ({
        id: item.recruitmentPositionId,
        value: item.title,
        label: POSITION_LABELS[item.title as RecruitmentPositionTitle],
    }));

    const handlePositionChange = (value: string | string[]) => {
         
    };

    // URL 필드 개수를 관리하는 상태 추가
    const [urlFields, setUrlFields] = useState([{ id: 1 }]);
    
    // URL 필드 추가 함수 수정
    const addUrlField = () => {
        if (urlFields.length < 3) {
            setUrlFields([...urlFields, { id: Date.now() }]);
        } else {
            // 3개 이상일 때 토스트 메시지 표시
            showToast({
                message: '최대 3개까지만 추가할 수 있습니다.',
            });
        }
    };
    
    // URL 필드 삭제 함수
    const removeUrlField = (id: number) => {
        if (urlFields.length > 1) {
            setUrlFields(urlFields.filter(field => field.id !== id));
        }
    };

    const [fileName, setFileName] = useState('');

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0]; 
          setFileName(file.name);
          const fileSize = file.size;
          const fileType = file.type;
          if (fileSize > 15 * 1024 * 1024) {
            showToast({
                message: '최대 용량 : 15MB',
            });
          }
          if (fileType !== 'application/pdf' && fileType !== 'image/jpeg' && fileType !== 'image/png' && fileType !== 'image/gif' && fileType !== 'image/bmp' && fileType !== 'image/webp') {
            showToast({
                message: 'jpg, jpeg, png, gif, bmp, webp, pdf만 가능합니다.',
            });
          }
          methods.setValue('file', file);
        }
    };

    const [introduction, setIntroduction] = useState('');
    const onChangeIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length > 1000) {
            showToast({
                message: '최대 1,000자까지 입력할 수 있습니다.',
            });
        }
        setIntroduction(value);
    };

    return (
        <>
          <div className="mx-auto flex max-w-screen-xl items-start justify-between gap-[40px] px-5 pb-[100px] pt-[40px] xl:px-0">
            {/* 왼쪽 영역 */}
            <div className="flex flex-auto pt-[20px]"> 
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit} className='flex w-full flex-col gap-[40px]'>
                        <div className="text-[24px] font-semibold text-black text-center">스터디 참여하기</div>
                        <div className='flex flex-col gap-[20px]'>
                            <div className='flex w-full gap-[8px] items-center'>
                                <div className='flex-1 flex gap-2 flex-col'> 
                                    <div className='text-[16px] font-medium text-black'>신청 직무</div>
                                    <div className='h-[60px]'>
                                        <FilterSelect
                                            type="default"
                                            onChange={handlePositionChange}
                                            defaultValue={'필수 선택'}
                                            options={positionOptions || []} 
                                            isOpen={openSelectId === SELECT_IDS.POSITION}
                                            onToggle={() =>
                                                setOpenSelectId(
                                                openSelectId === SELECT_IDS.POSITION
                                                    ? null
                                                    : SELECT_IDS.POSITION,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <InputField
                                        name="kakaoId"
                                        type="text"
                                        label="카카오톡 아이디"
                                        placeholder="오픈채팅 개설을 위해 사용됩니다."
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-[12px]'>
                                <div className='text-[16px] font-medium text-black'>URL</div>
                                {urlFields.map((field, index) => (
                                    <div key={field.id} className='flex w-full gap-[12px] items-center'> 
                                        <div className='flex-auto'>
                                            <InputField
                                            name={`url_${field.id}`}
                                            type="text" 
                                            placeholder="깃허브, 비핸스 등"  
                                        />
                                    </div> 
                                    {index === 0 ? (
                                        <button 
                                        type="button"
                                        onClick={addUrlField}
                                        className='bg-link-default rounded-[8px] flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center'
                                        >
                                        <Image src="/icons/Add.svg" alt="+" width={18} height={18} />
                                        </button>
                                    ) : (
                                        <button 
                                        type="button"
                                        onClick={() => removeUrlField(field.id)}
                                        className='bg-[#f9f9f9] rounded-[8px] flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center border border-[#e0e0e0]'
                                        >
                                        <Image src="/icons/Clear.svg" alt="-" width={18} height={18} />
                                        </button>
                                    )}
                                </div>
                                ))}
                                <div className='text-[14px] text-link-default'>최대 3개까지 추가할 수 있습니다.</div>
                            </div> 
                            <div className='flex flex-col w-full gap-[12px]'>
                                <div className='text-[16px] font-medium text-black'>파일 업로드</div>
                                <div className='flex w-full gap-[12px] items-center'> 
                                    <div className='flex-auto relative'>
                                        <input 
                                            type="text" 
                                            className='w-full h-[60px] rounded-[8px] border border-[#e0e0e0] px-[12px] text-[16px] text-medium text-[#a5a5a5] focus:outline-none cursor-default' 
                                            placeholder='pdf, jpg, jpeg, png 등' 
                                            value={fileName}
                                            readOnly 
                                            />
                                        <input 
                                            type="file" 
                                            id="fileInput"  
                                            onChange={onChangeFile}
                                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                            />
                                    </div> 
                                    <label htmlFor="fileInput" className='bg-link-default rounded-[8px] flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center text-[14px] text-white cursor-pointer'><Image src="/icons/File-Upload.svg" alt="파일 업로드" width={24} height={24} /></label>
                                </div>
                                <div className='text-[14px] text-red-500'>최대 용량 : 15MB</div>
                            </div>
                            <div className='flex flex-col w-full gap-[12px]'>
                                <div className='text-[16px] font-medium text-black'>자기소개</div>
                                <div className='relative flex flex-col gap-[8px] w-full h-[240px] rounded-[8px] border border-[#e0e0e0] px-[16px] py-[12px]'>
                                    <textarea className='w-full flex-auto text-[16px] text-medium  focus:outline-none placeholder:text-[#bbb] resize-none' placeholder='자신의 강점이나 작업 스타일, 다른 프로젝트 경험에 대해 설명해 주세요.' value={introduction} onChange={onChangeIntroduction} />
                                    <div className='w-full h-[20px] flex-shrink-0 flex justify-end  text-[14px] text-link-default opacity-60'>({introduction.length}/1,000)</div>
                                </div>
                            </div> 
                        </div>
                        <div className='flex flex-col gap-[20px]'>
                            <div className='w-[380px] mx-auto flex gap-[10px] items-center justify-center'>
                                <button type='button' className='w-[120px] h-[60px] flex-shrink-0 rounded-[4px] bg-[#E7F3FF] text-[16px] font-semibold text-link-default'>취소</button>
                                <button type='submit' className='flex-auto h-[60px] rounded-[4px] bg-link-default text-[16px] font-semibold text-white'>스터디 참여 신청하기</button>
                            </div>
                            <div className='text-[14px] text-[#a2a2a2] text-center'>스터디 참여 신청 완료 시 신청 내용은 수정할 수 없습니다.</div>
                        </div>  
                    </form>
                </FormProvider>
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