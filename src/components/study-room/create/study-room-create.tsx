import { CreateStudyRoomReq } from '@/types/api';

export interface StudyRoomCreateProps {
  mutate: (data: CreateStudyRoomReq) => void;
  isPending: boolean;
}

export const StudyRoomCreate = ({
  mutate,
  isPending,
}: StudyRoomCreateProps) => {
  return (
    <div className="mt-[34px] flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
};
