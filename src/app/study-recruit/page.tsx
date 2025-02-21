'use client';

import { getStudy } from '@/lib/api/study/getStudy';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import {
  RecruitmentPositionTitle,
  SearchStudyParams,
  SortCriteria,
  Study,
  StudyCategory,
  StudyStatus,
} from '@/types/api/study';
import StudyItem from '@/components/StudyItem';
import CategoryFilter from '@/components/filters/CategoryFilter';
import PositionFilter from '@/components/filters/PositionFilter';
import SortFilter from '@/components/filters/SortFilter';
import StatusFilter from '@/components/filters/StatusFilter';
import Loadingbar from '@/components/ui/Loadingbar';

export default function StudyRecruit() {
  const [selectCategory, setSelectCategory] = useState<string | string[]>(
    'ALL',
  );
  const [selectPosition, setSelectPosition] = useState<string | string[]>(
    'ALL',
  );
  const [selectStatus, setSelectStatus] = useState<string | string[]>('ALL');
  const [selectSort, setSelectSort] = useState<string | string[]>(
    SortCriteria.NEWEST,
  );

  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

  const {
    data: study,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'study',
      selectSort,
      selectCategory,
      selectPosition,
      selectStatus,
    ],
    initialPageParam: { lastStudyId: 0, lastSortValue: 0 },
    queryFn: async ({ pageParam = { lastStudyId: 0, lastSortValue: 0 } }) => {
      const params: SearchStudyParams = {
        sortCriteria: selectSort as SortCriteria,
        ...(selectCategory !== 'ALL' && {
          category: selectCategory as StudyCategory,
        }),
        ...(selectStatus !== 'ALL' && { status: selectStatus as StudyStatus }),
        ...(selectPosition !== 'ALL' &&
          Array.isArray(selectPosition) &&
          selectPosition.length > 0 && {
            recruitmentPositionTitleList:
              selectPosition as RecruitmentPositionTitle[],
          }),
        ...(selectPosition !== 'ALL' &&
          !Array.isArray(selectPosition) && {
            recruitmentPositionTitleList: [
              selectPosition as RecruitmentPositionTitle,
            ],
          }),
        ...(pageParam?.lastStudyId && { lastStudyId: pageParam.lastStudyId }),
        ...(pageParam?.lastSortValue && {
          lastSortValue: pageParam.lastSortValue,
        }),
      };

      return await getStudy(params);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) return undefined;

      const lastItem = lastPage.data.data[lastPage.data.data.length - 1];
      return {
        lastStudyId: lastItem.studyId,
        lastSortValue:
          selectSort === SortCriteria.LIKE
            ? lastItem.likeCount
            : selectSort === SortCriteria.COMMENT
              ? lastItem.commentCount
              : lastItem.studyId,
      };
    },
  });

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isLoading]);

  if (isLoading) {
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-center">
        <Loadingbar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-center">
        에러가 발생했습니다.
      </div>
    );
  }

  const handleCategoryChange = (value: string | string[]) => {
    setSelectCategory(value || 'ALL');
  };

  const handlePositionChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      // value가 빈 배열이거나 'ALL'만 포함된 경우
      if (value.length === 0 || value.includes('ALL')) {
        setSelectPosition('ALL');
        return;
      }

      const positions = value
        .filter((v) => v !== 'ALL')
        .map((v) => v as RecruitmentPositionTitle);
      setSelectPosition(positions);
      return;
    }
    setSelectPosition(value || 'ALL');
  };

  const handleStatusChange = (value: string | string[]) => {
    setSelectStatus(value || 'ALL');
  };

  const handleSortChange = (value: string | string[]) => {
    setSelectSort(value || SortCriteria.NEWEST);
  };

  const categoryLabels: Record<StudyCategory, string> = {
    [StudyCategory.ALGORITHM]: '알고리즘',
    [StudyCategory.DEVELOPMENT]: '개발',
  };

  const categoryOptions = [
    { id: 0, value: 'ALL', label: '카테고리 전체' },
    ...Object.entries(StudyCategory).map(([, value], index) => ({
      id: index + 1,
      value,
      label: categoryLabels[value as StudyCategory],
    })),
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
      label: positionLabels[value as RecruitmentPositionTitle],
    })),
  ];

  const SORT_OPTIONS = {
    [SortCriteria.NEWEST]: '최신순',
    [SortCriteria.LIKE]: '좋아요순',
    [SortCriteria.COMMENT]: '댓글순',
  } as const;

  const sortOptions = Object.entries(SORT_OPTIONS).map(
    ([value, label], index) => ({
      id: index,
      value,
      label,
    }),
  );

  const STATUS_OPTIONS = {
    [StudyStatus.ACTIVE]: '모집중',
    [StudyStatus.INACTIVE]: '모집마감',
  } as const;

  const statusOptions = [
    { id: 0, value: 'ALL', label: '상태 전체' },
    ...Object.entries(STATUS_OPTIONS).map(([value, label], index) => ({
      id: index + 1,
      value,
      label,
    })),
  ];

  return (
    <section className="mx-auto max-w-screen-xl px-5 pb-[110px] pt-10 xl:px-0">
      <h2 className="mb-[34px] text-2xl font-semibold">스터디 모집</h2>
      <div className="mb-[34px] flex items-end justify-between">
        <div className="flex items-center justify-start gap-5">
          <CategoryFilter
            type="default"
            onChange={handleCategoryChange}
            defaultValue={selectCategory}
            options={categoryOptions}
            isOpen={openSelectId === 'select1'}
            onToggle={() =>
              setOpenSelectId(openSelectId === 'select1' ? null : 'select1')
            }
          />
          <PositionFilter
            type="button"
            onChange={handlePositionChange}
            defaultValue={selectPosition}
            options={positionOptions}
            isOpen={openSelectId === 'select2'}
            onToggle={() =>
              setOpenSelectId(openSelectId === 'select2' ? null : 'select2')
            }
          />
          <StatusFilter
            type="default"
            onChange={handleStatusChange}
            defaultValue={selectStatus}
            options={statusOptions}
            isOpen={openSelectId === 'select3'}
            onToggle={() =>
              setOpenSelectId(openSelectId === 'select3' ? null : 'select3')
            }
          />
        </div>
        <div className="flex items-center gap-1">
          {/* <TagFilter type='button' onChange={handleTagChange} defaultValue={selectTag} options={dummyTags.map((tag)=> ({id: tag.id,value: tag.value, label: tag.label}))} isOpen={openSelectId === 'select4'} onToggle={() => setOpenSelectId(openSelectId === 'select4' ? null : 'select4')} filterName='태그' /> */}
          <SortFilter
            type="default"
            onChange={handleSortChange}
            defaultValue={selectSort}
            options={sortOptions.map((sort) => ({
              id: sort.id,
              value: sort.value,
              label: sort.label,
            }))}
            isOpen={openSelectId === 'select4'}
            onToggle={() =>
              setOpenSelectId(openSelectId === 'select4' ? null : 'select4')
            }
            filterName="최신순"
          />
        </div>
      </div>
      {!study?.pages || study.pages[0].data.data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center">
          <div className="flex w-full max-w-[480px] flex-col items-center justify-center rounded-[8px] bg-[#f9f9f9] py-[40px]">
            <Image
              src="/icons/icon_no_result.svg"
              alt="search"
              width={65}
              height={65}
            />
            <h3 className="mt-[30px] text-[20px] font-semibold text-black">
              스터디를 찾지 못했습니다.
            </h3>
            <p className="text-regular mt-[12px] text-sm text-gray-default">
              검색 결과가 없습니다.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid w-full max-w-screen-xl grid-cols-1 gap-x-5 gap-y-[26px] md:grid-cols-2 lg:grid-cols-3">
          {study.pages.map((page) => {
            return page.data.data.map((item) => {
              return (
                <StudyItem
                  key={`${item.studyId}-${item.title}`}
                  data={item as Study}
                />
              );
            });
          })}
        </div>
      )}
      <div ref={observerRef} className="h-4" />
    </section>
  );
}
