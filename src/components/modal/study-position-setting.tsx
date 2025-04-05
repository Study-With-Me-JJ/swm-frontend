    import { useState } from 'react'; 
    import Image from 'next/image';
    import { FormProvider } from 'react-hook-form'; 
    import { useForm } from 'react-hook-form';
    import FilterSelect from '@/components/ui/FilterSelect';
    import {
        GetRecruitmentPositionResponse, 
    } from '@/types/api/study-recruit/getStudyDetail';
    import { RecruitmentPositionTitle, getPositionOptions } from '@/types/api/study';
    import { useMutation } from '@tanstack/react-query';
    import { addRecruitmentPosition, deleteRecruitmentPosition } from '@/lib/api/study/recruitmentPosition';
    import { EditRecruitmentPositionRequest } from '@/types/api/study-recruit/recruitmentPosition';
    import { useToastStore } from '@/store/useToastStore';
    import { useRouter } from 'next/navigation';
    import { useQueryClient } from '@tanstack/react-query';

    const SELECT_IDS = { 
        POSITION: 'POSITION', 
    } as const;
    

    export default function StudyPositionSetting({
    handleCloseModal,   
    positionOptions,
    studyId,
    }: {
    handleCloseModal: () => void;   
    positionOptions: GetRecruitmentPositionResponse[];
    studyId: string;
    }) {   
    const { showToast } = useToastStore();
    const router = useRouter();
    const queryClient = useQueryClient();
        const [positionField, setPositionField] = useState(positionOptions.map((item: GetRecruitmentPositionResponse) => ({
            id: item.recruitmentPositionId,
            position: item.title,
            headcount: item.headcount,
        }))); 

        const [openSelectId, setOpenSelectId] = useState<keyof typeof SELECT_IDS | null>(null);
        const [selectPosition, setSelectPosition] = useState<string | string[]>('필수 선택'); 
    
        const positionList = getPositionOptions().filter((item) => item.value !== 'ALL');
        // console.log('positionList', positionList);

    const handleAddPosition = () => {
        setPositionField([...positionField, { 
        id: positionField.length + 1, 
        position: '필수 선택' as RecruitmentPositionTitle, 
        headcount: 0
        }]);
        setOpenSelectId(null);
    };

    const handleRemovePosition = (id: number) => {
        // if (positionField.length > 1) {
        //     setPositionField(positionField.filter((field) => field.id !== id));
        // }  
        deletePosition(id.toString());
    }; 

    // 포지션 변경 핸들러
    const handlePositionChange = (value: string | string[], fieldId: number) => {
        setPositionField(positionField.map(field => 
        field.id === fieldId ? { ...field, position: value as RecruitmentPositionTitle } : field
        ));
        setSelectPosition(value);
        methods.setValue('position', value);
        setOpenSelectId(null);
    };
    
    // 인원수 변경 핸들러
    const handleHeadcountChange = (e: React.ChangeEvent<HTMLInputElement>, fieldId: number) => {
        const value = e.target.value;
        // 숫자만 입력 가능하도록
        if (/^\d*$/.test(value)) {
        setPositionField(positionField.map(field => 
            field.id === fieldId ? { ...field, headcount: parseInt(value) || 0 } : field
        ));
        }
        methods.setValue('headcount', value);
    }; 

    //직무 추가 mutation
    const { mutate:addPosition } = useMutation({
        mutationFn: (positionData: EditRecruitmentPositionRequest) => addRecruitmentPosition(studyId, positionData),
        onSuccess: async (response) => {  
        if (response.message === 'Expired Token') {
            showToast({
            message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
            });
            router.push('/login');
            return;
        } 
        //   console.log('response', response);

        showToast({
            message: '직무 설정이 완료되었습니다.',
        });

        await invalidateQueries(); 
        handleCloseModal();
        },
    });

    // 직무 삭제 mutation
    const { mutate:deletePosition } = useMutation({
        mutationFn: (recruitmentPositionId: string) => deleteRecruitmentPosition(recruitmentPositionId),
        onSuccess: async (response) => {
        if (response.message === 'Expired Token') {
            showToast({
            message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
            });
            router.push('/login');
            return;
        }
        showToast({
            message: '직무 삭제가 완료되었습니다.',
        });

        await invalidateQueries(); 
        },
    });

    // 공통으로 사용할 쿼리 무효화 함수
        const invalidateQueries = async () => {
        await queryClient.invalidateQueries({ 
        queryKey: ['study', 'studyDetail', studyId],
        refetchType: 'active'
        });
        
        await queryClient.refetchQueries({
        queryKey: ['study', 'studyDetail', studyId],
        exact: true
        });
    };

    const methods = useForm();  

    const onSubmit = methods.handleSubmit(async (data) => {
        try { 
        const positionData = {
            title: data.position,
            headcount: data.headcount,
        }; 
        const positionId = positionField.find((field) => field.position === positionData.title)?.id;
        console.log('positionId', positionId);
        addPosition(positionData); 

        handleCloseModal();
        } catch (error) {
        console.error(error);
        throw error;
        }
    });
    
    return (
        <>
        <div className='fixed inset-0 left-1/2 top-1/2 z-20 flex max-h-[400px] min-h-[500px] w-[440px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[10px] overflow-hidden rounded-[8px] bg-white px-[30px] py-[40px]'>
            <div className='flex h-full flex-col items-center justify-center gap-[24px]'>
                <FormProvider {...methods}>
                    <div className='relative w-full'>
                    <h2 className="text-[14px] font-semibold text-[#565656] text-center">모집 직무 설정</h2>
                    <button onClick={handleAddPosition} type='button' className='absolute right-[0px] top-[0px] text-link-default flex items-center gap-[4px] text-[12px] font-semibold'>
                        추가
                        <Image src='/icons/Add-blue.svg' alt='' width={14} height={14} />
                    </button>
                </div> 
                <div className='w-full flex-1 overflow-y-auto '>
                    <ul className='flex flex-col gap-[12px]'>
                        {positionField.map((field) => (
                            <li key={field.id} className='flex items-center justify-between gap-[8px]'>
                                <div className='flex-auto flex gap-[8px] items-center'>
                                    <div className='relative flex-auto'> 
                                        <div className='w-full h-[48px]'>
                                            <FilterSelect 
                                                className='text-[#bbb] text-[14px]'
                                                type="default"
                                                onChange={(value) => handlePositionChange(value, field.id)}
                                                defaultValue={field.position}
                                                options={positionList} 
                                                isOpen={openSelectId === `${SELECT_IDS.POSITION}_${field.id}` as keyof typeof SELECT_IDS}
                                                onToggle={() =>
                                                    setOpenSelectId(
                                                    openSelectId === `${SELECT_IDS.POSITION}_${field.id}` as keyof typeof SELECT_IDS
                                                        ? null
                                                        : `${SELECT_IDS.POSITION}_${field.id}` as keyof typeof SELECT_IDS,
                                                    )
                                                }
                                            />
                                        </div>  
                                    </div>
                                </div>
                                <div className='flex-shrink-0 w-[120px]'>
                                    <input type='text' placeholder='인원' className='placeholder:text-[#bbb] placeholder:text-[14px] placeholder:font-regular rounded-[8px] border border-[#e0e0e0] h-[48px] px-[10px] w-full ' value={field.headcount} onChange={(e) => handleHeadcountChange(e, field.id)} />
                                </div> 
                                <button onClick={() => handleRemovePosition(field.id)} type='button' className='w-[55px] justify-center flex-shrink-0 text-[#b6b6b6] text-[12px] font-semibold flex items-center gap-[4px]'>삭제<Image src='/icons/Clear.svg' alt='' width={14} height={14} /></button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex justify-end gap-[10px] w-full'>
                    <button onClick={handleCloseModal} type='button' className='flex items-center justify-center rounded-[4px] bg-[#E7F3FF] h-[40px] w-[120px] flex-shrink-0 text-[14px] font-semibold text-link-default'>닫기</button>
                    <button onClick={onSubmit} type='button' className='flex items-center justify-center rounded-[4px] bg-[#228BFF] h-[40px] flex-auto text-[14px] font-semibold text-white'>완료</button>
                </div>
                </FormProvider>
            </div>
        </div>
        <div
                className="fixed inset-0 z-10 bg-black/50"
                onClick={handleCloseModal}
            />
        </>
    );
    }
