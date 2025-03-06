'use client';

import { useStudyRoomCreateQuery } from '@/queries/study-room/useStudyRoomCreateQuery';
import { StudyRoomCreate } from '@/components/study-room/create/study-room-create';

export function StudyRoomCreateContainer() {
  const { mutate, isPending } = useStudyRoomCreateQuery();

  return (
    <div className="mx-auto max-w-screen-xl py-[40px] xl:px-0">
      <h3 className="mb-[34px] text-[24px] font-[600] text-black">
        스터디 룸 생성하기
      </h3>
      <StudyRoomCreate mutate={mutate} isPending={isPending} />
    </div>
  );
}
