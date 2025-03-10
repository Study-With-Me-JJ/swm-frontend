'use client';

import { getUserInfo } from '@/lib/api/auth';
import { getStudyDetail } from '@/lib/api/study/getStudyDetail';
import { deleteStudy } from '@/lib/api/study/getStudyDetail';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';
import { getPositionOptions } from '@/types/api/study-recruit/study';
import Comment from '@/components/study-recruit/detail/Comment';
import BookMarkIcon from '@/components/ui/BookMarkIcon';
import InteractionStatus from '@/components/ui/InteractionStatus';
import Toast from '@/components/ui/Toast';

export default function StudyRecruitPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = useQuery({
    queryKey: ['studyDetail', params.id],
    queryFn: () => getStudyDetail(params.id),
  });

  // console.log('detail data', data);

  const router = useRouter();

  const [isBookmark, setIsBookmark] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (timerId) {
      clearTimeout(timerId);
    }

    setIsBookmark(!isBookmark);
    setIsToast(true);

    const newTimerId = setTimeout(() => {
      setIsToast(false);
    }, 2000);
    setTimerId(newTimerId);
  };

  const positionList = getPositionOptions();

  const [pageLoaded, setPageLoaded] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleOptionsClick = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDeleteStudy = async () => {
    try {
      await deleteStudy(params.id);
      router.push('/study-recruit');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const swiperElement = document.querySelector('.swiper');
      const swiper = (swiperElement as unknown as { swiper: SwiperType })
        ?.swiper;
      if (swiper) {
        swiper.update();
        swiper.navigation.update();
      }
    }
  }, [pageLoaded]);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { data: user } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
    enabled: isLogin,
  });

  const formatDate = (dateInput: number[] | string) => {
    if (!dateInput) return '날짜 정보 없음';

    if (typeof dateInput === 'string') {
      const [date, time] = dateInput.split(' ');
      const [year, month, day] = date.split('.');
      const [hours, minutes] = time.split(':');

      // UTC to KST (UTC + 9)
      const utcDate = new Date(
        `20${year}-${month}-${day}T${hours}:${minutes}:00Z`,
      );
      const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

      const kstYear = String(kstDate.getUTCFullYear()).slice(-2); // 년도의 마지막 2자리만 사용
      const kstMonth = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
      const kstDay = String(kstDate.getUTCDate()).padStart(2, '0');
      const kstHours = String(kstDate.getUTCHours()).padStart(2, '0');
      const kstMinutes = String(kstDate.getUTCMinutes()).padStart(2, '0');

      const formattedDate = `${kstYear}.${kstMonth}.${kstDay} ${kstHours}:${kstMinutes}`;
      return formattedDate;
    }
    return '날짜 형식 오류';
  };

  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const commentSection = document.getElementById(
        'tab-item-content-comment',
      );
      const infoSection = document.getElementById('tab-item-content-info');

      if (commentSection && infoSection) {
        const commentOffset = commentSection.offsetTop;
        const infoOffset = infoSection.offsetTop;

        if (scrollPosition >= commentOffset) {
          setActiveTab('comment');
        } else if (scrollPosition >= infoOffset) {
          setActiveTab('info');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const moveActiveTab = (tab: string) => {
    setActiveTab(tab);
    const tabItemContent = document.getElementById('tab-item-content-' + tab);
    if (tabItemContent) {
      tabItemContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="mx-auto flex max-w-screen-xl items-start justify-between gap-[40px] px-5 pb-[100px] pt-[60px] xl:px-0">
        {/* 왼쪽 영역 */}
        <div className="flex flex-auto flex-col gap-[60px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-[12px]">
                <div
                  className={`flex h-[30px] min-w-[60px] items-center justify-center rounded-full border border-link-default bg-white text-sm font-bold text-link-default ${data?.data.status === 'ACTIVE' ? 'border-link-default text-link-default' : 'border-gray-light text-gray-light'}`}
                >
                  {data?.data.status === 'ACTIVE' ? '모집중' : '모집마감'}
                </div>
                <div className="flex items-center gap-[4px]">
                  <Image
                    src={
                      data?.data.profileImageUrl || '/icons/icon_no_profile.svg'
                    }
                    alt="study-recruit-icon-1"
                    width={18}
                    height={18}
                    className="overflow-hidden rounded-full"
                  />
                  <p className="text-sm font-bold text-link-default">
                    {data?.data.nickname}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={(e) => {
                    handleBookmark(e);
                  }}
                  className="relative z-10"
                >
                  <BookMarkIcon
                    color={isBookmark ? '#4998E9' : '#f9f9f9'}
                    strokeColor={isBookmark ? '#4998E9' : '#c8c8c8'}
                  />
                </button>
                {user?.data?.userId &&
                  data?.data.userId === user?.data.userId && (
                    <div className="relative h-[24px] w-[24px]">
                      <button
                        onClick={handleOptionsClick}
                        className="cursor-pointer"
                      >
                        <Image
                          src="/icons/options.svg"
                          alt="options"
                          width={24}
                          height={24}
                        />
                      </button>
                      {isEditModalOpen && (
                        <div className="z-5 absolute right-0 top-[40px]">
                          <ul className="flex w-[220px] flex-col rounded-[8px] border border-link-default bg-white px-[8px] py-[4px]">
                            <li className="border-b border-gray-disabled">
                              <button className="flex w-full items-center justify-between px-[16px] py-[10px] text-sm font-semibold text-gray-default">
                                <Image
                                  src="/icons/mode_edit.svg"
                                  alt="edit"
                                  width={20}
                                  height={20}
                                />
                                스터디 수정
                              </button>
                            </li>
                            <li className="border-b border-gray-disabled last:border-b-0">
                              <button
                                onClick={handleDeleteStudy}
                                className="flex w-full items-center justify-between px-[16px] py-[10px] text-sm font-semibold text-red-error"
                              >
                                <Image
                                  src="/icons/Delete_red.svg"
                                  alt="delete"
                                  width={20}
                                  height={20}
                                />
                                스터디 삭제
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </div>
            <div className="font-regular text-sm text-gray-light">
              {formatDate(data?.data.createdAt || '')}
            </div>
            <div className="text-[24px] font-semibold text-black">
              {data?.data.title}
            </div>
            <div className="flex items-center gap-[4px]">
              {data?.data.getRecruitmentPositionResponseList.map((item) => (
                <div
                  key={item.recruitmentPositionId}
                  className="rounded-[4px] bg-[#eee] px-[7px] py-[5px] text-sm font-medium text-[#565656]"
                >
                  {
                    positionList.find(
                      (position) => position.value === item.title,
                    )?.label
                  }{' '}
                  <span className="text-link-default">{item.headcount}명</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[4px]">
                {data?.data.getTagResponseList.map((item) => (
                  <span
                    key={item.tagId}
                    className="h-[30px] min-w-[30px] rounded-[4px] border border-[#eee] bg-white px-[7px] py-[5px] text-sm font-medium text-[#a5a5a5]"
                  >
                    #{item.name}
                  </span>
                ))}
              </div>
              <InteractionStatus
                likeCount={data?.data.likeCount || 0}
                commentCount={data?.data.commentCount || 0}
                viewCount={data?.data.viewCount || 0}
              />
            </div>
            <div className="w-full max-w-[860px] overflow-hidden">
              <div className="swiper-container overflow-hidden">
                {pageLoaded && (
                  <Swiper
                    className="my-swiper"
                    modules={[Navigation]}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView="auto"
                    observer={true}
                    observeParents={true}
                    watchOverflow={true}
                    navigation={
                      {
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                        enabled: true,
                      } as NavigationOptions
                    }
                    onSwiper={(swiper) => {
                      setTimeout(() => {
                        swiper.update();
                      }, 100);
                    }}
                    onBeforeInit={(swiper) => {
                      if (typeof swiper.params.navigation !== 'boolean') {
                        const nav = swiper.params.navigation;
                        if (nav) {
                          nav.prevEl = prevRef.current;
                          nav.nextEl = nextRef.current;
                        }
                      }
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 1.3,
                      },
                      768: {
                        slidesPerView: 2.3,
                      },
                      1024: {
                        slidesPerView: 3.3,
                      },
                    }}
                  >
                    {data?.data.getImageResponseList.map((item) => (
                      <SwiperSlide key={item.imageId}>
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[8px] border border-gray-disabled">
                          <Image
                            src={item.imageUrl || '/no-image.png'}
                            alt={item.imageUrl || 'study-recruit-image'}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className="swiper-navigation mt-[16px] !h-[18px] justify-end !gap-[10px]">
                <button
                  ref={prevRef}
                  className="swiper-button-prev !mt-[0] !h-[18px] !w-[18px]"
                ></button>
                <button
                  ref={nextRef}
                  className="swiper-button-next !mt-[0] !h-[18px] !w-[18px]"
                ></button>
              </div>
            </div>
          </div>
          <div className="tab-container">
            <div className="sticky top-[0px] flex h-[50px] items-center bg-white">
              <div
                className={`tab-item-title ${activeTab === 'info' ? 'tab-item-title-active border-link-default' : 'border-gray-disabled'} h-[50px] min-w-[100px] border-b-2 px-[18px] py-[15px]`}
              >
                <div
                  onClick={() => moveActiveTab('info')}
                  className="tab-item-title-text cursor-pointer text-sm font-semibold text-gray-default"
                >
                  스터디 소개
                </div>
              </div>
              <div
                className={`tab-item-title ${activeTab === 'comment' ? 'tab-item-title-active border-link-default' : 'border-gray-disabled'} h-[50px] min-w-[100px] border-b-2 px-[18px] py-[15px]`}
              >
                <div
                  onClick={() => moveActiveTab('comment')}
                  className="tab-item-title-text flex cursor-pointer items-center justify-center gap-[8px] text-sm font-semibold text-gray-default"
                >
                  댓글{' '}
                  <span className="text-link-default">
                    {data?.data.commentCount || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="tab-item-content" id="tab-item-content-info">
              <div className="tab-item-content-text pt-[40px]">
                <div className="rounded-[8px] pb-[24px] text-[20px] font-semibold text-black">
                  스터디 소개
                </div>
                <div className="font-regular rounded-[8px] border border-gray-disabled p-[24px] text-sm text-black">
                  {data?.data.content}
                </div>
              </div>
              <div
                className="tab-item-content-text pt-[40px]"
                id="tab-item-content-comment"
              >
                <div className="pb-[24px] text-[20px] font-semibold text-black">
                  댓글{' '}
                  <span className="text-link-default">
                    {data?.data.commentCount || 0}
                  </span>
                </div>
                <div className="font-regular border-t border-gray-disabled text-sm text-gray-light">
                  <Comment studyId={params.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 오른쪽 영역 */}
        <div className="sticky top-[0px] flex w-[380px] flex-shrink-0 flex-col gap-[30px]">
          <div className="text-[24px] font-semibold text-black">모집 현황</div>
          <ul>
            {data?.data.getRecruitmentPositionResponseList.map((item) => (
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
            ))}
          </ul>
        </div>
      </div>
      <Toast
        isToast={isToast}
        message={isBookmark ? '북마크 완료!' : '북마크 해제'}
        url={isBookmark ? '/study-recruit' : '/study-recruit'}
        urlText="내 북마크 보기"
        active={isBookmark}
        icon={
          isBookmark
            ? '/icons/icon_bookmark_on.svg'
            : '/icons/icon_bookmark_off.svg'
        }
      />
    </>
  );
}
