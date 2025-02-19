'use client'

import { useState, useEffect } from 'react';
import StudyItem from '@/components/StudyItem';
import CategoryFilter from '@/components/filters/CategoryFilter';
import PositionFilter from '@/components/filters/PositionFilter';
import StatusFilter from '@/components/filters/StatusFilter';
import SortFilter from '@/components/filters/SortFilter'; 
import Image from 'next/image'; 
import { useInfiniteQuery } from '@tanstack/react-query';
import {  Study, StudyCategory, StudyStatus, RecruitmentPositionTitle, SortCriteria, SearchStudyParams } from '@/types/api/study'; 
import { getStudy } from '@/lib/api/study/getStudy';
import Loading from '@/components/ui/Loading'; 
import { useRef } from 'react';

export default function StudyRecruit() {
  const [selectCategory,setSelectCategory] = useState<string | string[]>('ALL');
  const [selectPosition,setSelectPosition] = useState<string | string[]>('ALL');
  const [selectStatus,setSelectStatus] = useState<string | string[]>('ALL');
  const [selectSort,setSelectSort] = useState<string | string[]>(SortCriteria.NEWEST);

  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

  
  const { data: study, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['study', selectSort,selectCategory, selectPosition, selectStatus],
    initialPageParam: { lastStudyId: 0, lastSortValue: 0 },  // 추가
    queryFn: async ({ pageParam = { lastStudyId: 0, lastSortValue: 0 } }) => {
      const params: SearchStudyParams = {
        sortCriteria: selectSort as SortCriteria,
        ...(selectCategory !== 'ALL' && { category: selectCategory as StudyCategory }),
        ...(selectStatus !== 'ALL' && { status: selectStatus as StudyStatus }),
        ...(selectPosition !== 'ALL' && { 
          // 배열이 이미 들어온 경우와 단일 값인 경우를 구분
          recruitmentPositionTitleList: Array.isArray(selectPosition) 
            ? selectPosition as RecruitmentPositionTitle[]
            : [selectPosition as RecruitmentPositionTitle]
        }),
        ...(pageParam?.lastStudyId && { lastStudyId: pageParam.lastStudyId }),
        ...(pageParam?.lastSortValue && { lastSortValue: pageParam.lastSortValue })
      };
      console.log('실제 API 요청 파라미터:', JSON.stringify(params, null, 2));

      return await getStudy(params);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) return undefined;
  
      const lastItem = lastPage.data.data[lastPage.data.data.length - 1];
      return {
        lastStudyId: lastItem.studyId,
        lastSortValue: selectSort === SortCriteria.LIKE 
          ? lastItem.likeCount
          : selectSort === SortCriteria.COMMENT
            ? lastItem.commentCount
            : lastItem.studyId  // NEWEST의 경우
      };
    }
  });

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
  
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
  
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isLoading]);

  if (isLoading) {
    return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'><Loading /></div>;
  }

  if (error) {
    return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>에러가 발생했습니다.</div>;
  }

  // if (!studyData) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>데이터를 찾을 수 없습니다.</div>;
  // }

  const handleCategoryChange = (value: string | string[]) => {
    setSelectCategory(value || 'ALL'); 
  };

  const handlePositionChange = (value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
      setSelectPosition([RecruitmentPositionTitle.BACKEND]); 
      return;
    }
    if (Array.isArray(value)) {
      const positions = value.filter(v => v !== 'ALL').map(v => v as RecruitmentPositionTitle);
      setSelectPosition(positions.length > 0 ? positions : [RecruitmentPositionTitle.BACKEND]);
      return;
    }
    setSelectPosition(value || RecruitmentPositionTitle.BACKEND); 
  };

  const handleStatusChange = (value: string | string[]) => {
    setSelectStatus(value || 'ALL'); 
  };

  const handleSortChange = (value: string | string[]) => {
    setSelectSort(value || SortCriteria.NEWEST); 
  };

  // const filteredStudyData = studyData?.data
  // .filter(item => selectCategory === 'ALL' ? true : item.category === selectCategory)
  // .filter(item => {
  //   if (Array.isArray(selectPosition)) {
  //     return selectPosition.includes('ALL') ? true : item.getRecruitmentPositionResponseList.some(position => selectPosition.includes(position.title));
  //   }
  //   return selectPosition === 'ALL' ? true : item.getRecruitmentPositionResponseList.some(position => position.title === selectPosition);
  // })
  // .filter(item => selectStatus === 'ALL' ? true : item.status === selectStatus) 

  const categoryLabels: Record<StudyCategory, string> = {
    [StudyCategory.ALGORITHM]: '알고리즘',
    [StudyCategory.DEVELOPMENT]: '개발', 
  };

  const categoryOptions = [
    { id: 0, value: 'ALL', label: '카테고리 전체' },
    ...Object.entries(StudyCategory).map(([, value], index) => ({
      id: index + 1,
      value,
      label: categoryLabels[value as StudyCategory]
    }))
  ];
  
  const positionLabels: Record<RecruitmentPositionTitle, string> = {
    [RecruitmentPositionTitle.BACKEND]: '백엔드',
    [RecruitmentPositionTitle.FRONTEND]: '프론트엔드',
    [RecruitmentPositionTitle.ETC]: '기타',
  };

  const positionOptions = [
    { id: 0, value: 'ALL', label: '직무 전체' },
    ...Object.entries(RecruitmentPositionTitle).map(([, value], index) => ({
      id: index + 1,
      value,
      label: positionLabels[value as RecruitmentPositionTitle]
    }))
  ];

  const SORT_OPTIONS = {
    [SortCriteria.NEWEST]: '최신순',
    [SortCriteria.LIKE]: '좋아요순',
    [SortCriteria.COMMENT]: '댓글순'
  } as const;

  const sortOptions = Object.entries(SORT_OPTIONS).map(([value, label], index) => ({
    id: index,
    value,
    label
  }));

  const STATUS_OPTIONS = {
    [StudyStatus.ACTIVE]: '모집중',
    [StudyStatus.INACTIVE]: '모집마감'
  } as const;

  const statusOptions = [
    { id: 0, value: 'ALL', label: '상태 전체' },
    ...Object.entries(STATUS_OPTIONS).map(([value, label], index) => ({
      id: index + 1,
      value,
      label
    }))
  ];

  console.log('studyData 구조:', JSON.stringify(study, null, 2));

 
  const studyData = study?.pages[0].data.data; 
  console.log('studyData type:', typeof studyData, 'value:', studyData);

  return (
    <section className='pt-10 pb-[110px] max-w-screen-xl px-5 xl:px-0  mx-auto'>
      <h2 className='text-2xl font-semibold mb-[34px]'>스터디 모집</h2>
      <div className='flex justify-between items-end mb-[34px]'>
        <div className='flex items-center gap-5 justify-start'>
          <CategoryFilter type='default' onChange={handleCategoryChange} defaultValue={selectCategory} options={categoryOptions} isOpen={openSelectId === 'select1'}
          onToggle={() => setOpenSelectId(openSelectId === 'select1' ? null : 'select1')} />
          <PositionFilter type='button' onChange={handlePositionChange} defaultValue={selectPosition} options={positionOptions} isOpen={openSelectId === 'select2'}
          onToggle={() => setOpenSelectId(openSelectId === 'select2' ? null : 'select2')} />
          <StatusFilter type='default' onChange={handleStatusChange} defaultValue={selectStatus} options={statusOptions} isOpen={openSelectId === 'select3'}
          onToggle={() => setOpenSelectId(openSelectId === 'select3' ? null : 'select3')} />
        </div>
        <div className='flex items-center gap-1'>
          {/* <TagFilter type='button' onChange={handleTagChange} defaultValue={selectTag} options={dummyTags.map((tag)=> ({id: tag.id,value: tag.value, label: tag.label}))} isOpen={openSelectId === 'select4'} onToggle={() => setOpenSelectId(openSelectId === 'select4' ? null : 'select4')} filterName='태그' /> */}
          <SortFilter type='default' onChange={handleSortChange} defaultValue={selectSort} options={sortOptions.map((sort)=> ({id: sort.id,value: sort.value, label: sort.label}))} isOpen={openSelectId === 'select4'} onToggle={() => setOpenSelectId(openSelectId === 'select4' ? null : 'select4')} filterName='최신순' />
        </div>
      </div>
      {!study?.pages || study.pages[0].data.data.length === 0? (
        <div className='h-[300px] flex justify-center items-center'>
          <div className='flex flex-col items-center justify-center w-full max-w-[480px] bg-[#f9f9f9] rounded-[8px] py-[40px]'>
            <Image src='/icons/icon_no_result.svg' alt='search' width={65} height={65} />
            <h3 className='mt-[30px] text-[20px] font-semibold text-black'>스터디를 찾지 못했습니다.</h3>
            <p className='mt-[12px] text-gray-default text-sm text-regular'>검색 결과가 없습니다.</p>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[26px] max-w-screen-xl w-full'> 
        {study.pages.flatMap((page) => {
          
          console.log('page 데이터:', page);
          
          const mappedData = page.data.data.map((item) => {
            console.log('개별 아이템:', item);
            return <StudyItem key={`${item.studyId}-${item.title}`} data={item as Study}/>;
          });
          
          console.log('매핑된 결과:', mappedData);
          return mappedData;
        })}
      </div>
      )}
      <div ref={observerRef} className="h-4" /> 
    </section>
  )
}