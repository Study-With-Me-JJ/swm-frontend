'use client'

import { useState } from 'react';
import StudyItem from '@/components/StudyItem';
import CategoryFilter from '@/components/filters/CategoryFilter';
import PositionFilter from '@/components/filters/PositionFilter';
import StatusFilter from '@/components/filters/StatusFilter';

// 더미 데이터 추가
const dummyStudyData = [
  {
    userId: '1',
    studyId: 1,
    title: '리액트 스터디 모집합니다',
    content: '리액트 기초부터 심화까지 함께 공부해요',
    category: 'MACHINELEARNING',
    position: 'DEVELOPER',
    thumbnail: 'https://via.placeholder.com/150',
    likeCount: 0,
    commentCount: 0,
    status: 'ACTIVE',
    viewCount: 0,
    nickname: '김개발',
    profileImageUrl: 'https://via.placeholder.com/150',
    studyBookmarkId: null,
    tagInquiryListResponse: [
      {
        studyTagId: 0,
        name: "리액트"
      }
    ],
  }, 
  {
    userId: '2',
    studyId: 2,
    title: '자바 스터디 모집합니다',
    content: '자바 기초부터 심화까지 함께 공부해요',
    category: 'MACHINELEARNING',
    position: 'DESIGNER',
    thumbnail: 'https://via.placeholder.com/150',
    likeCount: 0,
    commentCount: 0,
    status: 'INACTIVE',
    viewCount: 0,
    nickname: '김개발',
    profileImageUrl: 'https://via.placeholder.com/150',
    studyBookmarkId: 2,
    tagInquiryListResponse: [
      {
        studyTagId: 0,
        name: "자바"
      },
      {
        studyTagId: 1,
        name: "스프링"
      }
    ],
  }, 
  {
    userId: '3',
    studyId: 3,
    title: '파이썬 스터디 모집합니다',
    content: '파이썬 기초부터 심화까지 함께 공부해요',
    category: 'ALGORITHM',
    position: 'DESIGNER',
    thumbnail: 'https://via.placeholder.com/150',
    likeCount: 0,
    commentCount: 0,
    status: 'ACTIVE',
    viewCount: 0,
    nickname: '이개발',
    profileImageUrl: 'https://via.placeholder.com/150',
    studyBookmarkId: null,
    tagInquiryListResponse: [
      {
        studyTagId: 0,
        name: "파이썬"
      }
    ],
  },
  {
    userId: '4',
    studyId: 4,
    title: '파이썬 스터디 모집합니다',
    content: '파이썬 기초부터 심화까지 함께 공부해요',
    category: 'DATAANALYSIS',
    position: 'PLANNER',
    thumbnail: 'https://via.placeholder.com/150',
    likeCount: 0,
    commentCount: 0,
    status: 'ACTIVE',
    viewCount: 0,
    nickname: '이개발',
    profileImageUrl: 'https://via.placeholder.com/150',
    studyBookmarkId: null,
    tagInquiryListResponse: [
      {
        studyTagId: 0,
        name: "파이썬"
      }
    ],
  }, 
];
 
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

export default function StudyRecruit() {
  const [selectCategory,setSelectCategory] = useState<string | string[]>('ALL');
  const [selectPosition,setSelectPosition] = useState<string | string[]>('ALL');
  const [selectStatus,setSelectStatus] = useState<string | string[]>('ALL');

  const [openSelectId, setOpenSelectId] = useState<string | null>(null);


  // const { data: study, isLoading, error } = useQuery({
  //   queryKey: ['study'],
  //   queryFn: getStudy,
  //   staleTime: 1000 * 60 * 60,  
  //   gcTime: 1000 * 60 * 60 * 24,  
  // });
  
  // const studyData = study?.data;
  const studyData = dummyStudyData;
  // console.log('studyData type:', typeof studyData, 'value:', studyData);

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

  const filteredStudyData = studyData
  .filter(item => selectCategory === 'ALL' ? true : item.category === selectCategory)
  .filter(item => {
    if (Array.isArray(selectPosition)) {
      return selectPosition.includes('ALL') ? true : selectPosition.includes(item.position);
    }
    return selectPosition === 'ALL' ? true : item.position === selectPosition;
  })
  .filter(item => selectStatus === 'ALL' ? true : item.status === selectStatus);


  return (
    <section className='pt-10 pb-[110px] max-w-screen-xl px-5 xl:px-0  mx-auto'>
      <h2 className='text-2xl font-semibold mb-[34px]'>스터디 모집</h2>
      <div className='flex justify-between items-end mb-[34px]'>
        <div className='flex items-center gap-5 justify-start'>
          <CategoryFilter type='default' onChange={handleCategoryChange} defaultValue={selectCategory} options={dummyCategories.map((category,index)=> ({id: index,value: category.value, label: category.label}))} isOpen={openSelectId === 'select1'}
          onToggle={() => setOpenSelectId(openSelectId === 'select1' ? null : 'select1')} />
          <PositionFilter type='button' onChange={handlePositionChange} defaultValue={selectPosition} options={dummyPositions.map((position)=> ({id: position.id,value: position.value, label: position.label}))} isOpen={openSelectId === 'select2'}
          onToggle={() => setOpenSelectId(openSelectId === 'select2' ? null : 'select2')} />
          <StatusFilter type='default' onChange={handleStatusChange} defaultValue={selectStatus} options={dummyStatus.map((status)=> ({id: status.id,value: status.value, label: status.label}))} isOpen={openSelectId === 'select3'}
          onToggle={() => setOpenSelectId(openSelectId === 'select3' ? null : 'select3')} />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-[26px] max-w-screen-xl w-full'> 
        {filteredStudyData.map((item) => (
          <StudyItem key={item.studyId} data={item} />
        ))}
      </div>
    </section>
  )
}