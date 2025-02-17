'use client'

import { useState } from 'react';
import StudyItem from '@/components/StudyItem';
import CategoryFilter from '@/components/filters/CategoryFilter';
import PositionFilter from '@/components/filters/PositionFilter';
import StatusFilter from '@/components/filters/StatusFilter';
import SortFilter from '@/components/filters/SortFilter'; 
import Image from 'next/image'; 
import { useQuery } from '@tanstack/react-query';
import { Study } from '@/types/api/study'; 
import { getStudy } from '@/lib/api/study/getStudy';
import { categoryOptions, positionOptions, statusOptions } from '@/types/filters/study-filter';

// 더미 데이터 추가
// const dummyStudyData = [
//   {
//     studyId: 1,
//     title: '리액트 스터디 모집합니다',
//     content: '리액트 기초부터 심화까지 함께 공부해요',
//     category: 'MACHINELEARNING', 
//     likeCount: 0,
//     commentCount: 0,
//     status: 'ACTIVE',
//     viewCount: 0,
//     studyBookmarkId: null,
//     getTagResponseList: [
//       {
//         tagId: 0,
//         name: "어쩌고저쩌고"
//       },
//       {
//         tagId: 1,
//         name: "어쩌고저쩌고"
//       }
//     ],
//     getRecruitmentPositionResponseList: [
//       {
//         recruitmentPositionId: 0,
//         title: "BACKEND",
//         headcount: 10,
//         acceptedCount: 0
//       },
//       {
//         recruitmentPositionId: 1,
//         title: "FRONTEND",
//         headcount: 10,
//         acceptedCount: 0
//       }
//     ],
//   },
//   {
//     studyId: 2,
//     title: '파이썬 스터디 모집합니다',
//     content: '파이썬 기초부터 심화까지 함께 공부해요',
//     category: 'MOBILE', 
//     likeCount: 2,
//     commentCount: 6,
//     status: 'ACTIVE',
//     viewCount: 10,
//     studyBookmarkId: 1,
//     getTagResponseList: [
//       {
//         tagId: 0,
//         name: "어쩌고저쩌고"
//       }
//     ],
//     getRecruitmentPositionResponseList: [
//       {
//         recruitmentPositionId: 0,
//         title: "FRONTEND",
//         headcount: 10,
//         acceptedCount: 0
//       }
//     ],
//   }, 
//   {
//     studyId: 3,
//     title: '자바 스터디 모집합니다',
//     content: '자바 기초부터 심화까지 함께 공부해요',
//     category: 'ALGORITHM', 
//     likeCount: 2,
//     commentCount: 6,
//     status: 'ACTIVE',
//     viewCount: 10,
//     studyBookmarkId: 1,
//     getTagResponseList: [
//       {
//         tagId: 0,
//         name: "어쩌고저쩌고"
//       }
//     ],
//     getRecruitmentPositionResponseList: [
//       {
//         recruitmentPositionId: 0,
//         title: "BACKEND",
//         headcount: 10,
//         acceptedCount: 0
//       }
//     ],
//   },
//   {
//     studyId: 4,
//     title: '빅데이터 스터디 모집합니다',
//     content: '빅데이터 기초부터 심화까지 함께 공부해요',
//     category: 'BIGDATA', 
//     likeCount: 2,
//     commentCount: 6,
//     status: 'ACTIVE',
//     viewCount: 10,
//     studyBookmarkId: 1,
//     getTagResponseList: [
//       {
//         tagId: 0,
//         name: "어쩌고저쩌고"
//       }
//     ],
//     getRecruitmentPositionResponseList: [
//       {
//         recruitmentPositionId: 0,
//         title: "DESIGNER",
//         headcount: 10,
//         acceptedCount: 0
//       }
//     ],
//   },
//   {
//     studyId: 5,
//     title: '데이터분석 스터디 모집합니다',
//     content: '데이터분석 기초부터 심화까지 함께 공부해요',
//     category: 'DATAANALYSIS', 
//     likeCount: 2,
//     commentCount: 6,
//     status: 'ACTIVE',
//     viewCount: 10,
//     studyBookmarkId: 1,
//     getTagResponseList: [
//       {
//         tagId: 0,
//         name: "어쩌고저쩌고"
//       },
//       {
//         tagId: 1,
//         name: "어쩌고저쩌고"
//       }
//     ],
//     getRecruitmentPositionResponseList: [
//       {
//         recruitmentPositionId: 0,
//         title: "DESIGNER",
//         headcount: 2,
//         acceptedCount: 0
//       }
//     ],
//   },
// ];
 
const dummyCategories = [
  {
    id:0,
    value: 'ALL',
    label: '카테고리 전체'
  },
  {
    id:1,
    value: 'ALGORITHM',
    label: '알고리즘'
  },
  {
    id:2,
    value: 'BIGDATA',
    label: '빅데이터'
  },
  {
    id:3,
    value: 'DATAANALYSIS',
    label: '데이터분석'
  },
  {
    id:4,
    value: 'MACHINELEARNING',
    label: '머신러닝'
  },
  {
    id:5,
    value: 'MOBILE',
    label: '모바일'
  }
] 

const dummyPositions = [
  {
    id:0,
    value: 'ALL',
    label: '직무 전체'
  },
  {
    id:1,
    value: 'PLANNER',
    label: '기획자'
  },
  {
    id:2,
    value: 'DESIGNER',
    label: '디자이너'
  },
  {
    id:3,
    value: 'DEVELOPER',
    label: '개발자'
  },
  {
    id:4,
    value: 'MARKETER',
    label: '마케터'
  },
  {
    id:5,
    value: 'ETC',
    label: '기타'
  }  
]

const dummyStatus = [
  {
    id:0,
    value: 'ALL',
    label: '상태전체'
  },
  {
    id:1,
    value: 'ACTIVE',
    label: '모집중'
  },
  {
    id:2,
    value: 'INACTIVE',
    label: '모집마감'
  }
]

const dummySort = [
  {
    id:0,
    value: 'latest',
    label: '최신순'
  },
  {
    id:1,
    value: 'like',
    label: '좋아요순'
  },
  {
    id:2,
    value: 'view',
    label: '댓글순'
  }
]

export default function StudyRecruit() {
  const [selectCategory,setSelectCategory] = useState<string | string[]>('ALL');
  const [selectPosition,setSelectPosition] = useState<string | string[]>('ALL');
  const [selectStatus,setSelectStatus] = useState<string | string[]>('ALL');
  const [selectSort,setSelectSort] = useState<string | string[]>('latest');

  const [openSelectId, setOpenSelectId] = useState<string | null>(null);


  const { data: study, isLoading, error } = useQuery({
    queryKey: ['study'],
    queryFn: getStudy,
    staleTime: 1000 * 60 * 60,  
    gcTime: 1000 * 60 * 60 * 24,  
  });
  
  const studyData = study?.data;
  // const studyData = dummyStudyData;
  console.log('studyData type:', typeof studyData, 'value:', studyData);

  // if (isLoading) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'><Loading /></div>;
  // }

  // if (error) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>에러가 발생했습니다.</div>;
  // }

  // if (!studyData) {
  //   return <div className='flex justify-center items-center max-w-screen-xl mx-auto h-screen'>데이터를 찾을 수 없습니다.</div>;
  // }

  const handleCategoryChange = (value: string | string[]) => {
    setSelectCategory(value || 'ALL'); 
  };

  const handlePositionChange = (value: string | string[]) => {
    if (Array.isArray(value) && value.length === 0) {
      setSelectPosition(['ALL']);
      return;
    }
    setSelectPosition(value || 'ALL'); 
  };  

  const handleStatusChange = (value: string | string[]) => {
    setSelectStatus(value || 'ALL'); 
  };

  const handleSortChange = (value: string | string[]) => {
    setSelectSort(value || 'latest'); 
  };

  const filteredStudyData = studyData?.data
  .filter(item => selectCategory === 'ALL' ? true : item.category === selectCategory)
  .filter(item => {
    if (Array.isArray(selectPosition)) {
      return selectPosition.includes('ALL') ? true : selectPosition.includes(item.getRecruitmentPositionResponseList[0].title);
    }
    return selectPosition === 'ALL' ? true : item.getRecruitmentPositionResponseList[0].title === selectPosition;
  })
  .filter(item => selectStatus === 'ALL' ? true : item.status === selectStatus);

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
          <SortFilter type='default' onChange={handleSortChange} defaultValue={selectSort} options={dummySort.map((sort)=> ({id: sort.id,value: sort.value, label: sort.label}))} isOpen={openSelectId === 'select4'} onToggle={() => setOpenSelectId(openSelectId === 'select4' ? null : 'select4')} filterName='정렬' />
        </div>
      </div>
      {filteredStudyData?.length === 0 ? (
        <div className='h-[300px] flex justify-center items-center'>
          <div className='flex flex-col items-center justify-center w-full max-w-[480px] bg-[#f9f9f9] rounded-[8px] py-[40px]'>
            <Image src='/icons/icon_no_result.svg' alt='search' width={65} height={65} />
            <h3 className='mt-[30px] text-[20px] font-semibold text-black'>스터디를 찾지 못했습니다.</h3>
            <p className='mt-[12px] text-gray-default text-sm text-regular'>검색 결과가 없습니다.</p>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[26px] max-w-screen-xl w-full'> 
        {filteredStudyData?.map((item) => (
          <StudyItem key={item.studyId} data={item as Study}/>
        ))}
      </div>
      )}
    </section>
  )
}