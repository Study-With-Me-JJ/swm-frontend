'use client';
import { StudyDetailRequest, GetRecruitmentPositionResponse } from '@/types/api/study-recruit/getStudyDetail';
import { getPositionOptions } from '@/types/api/study-recruit/study';

export default function ApplyStudyModal({
  handleCloseModal, 
  studyData,
}: {
  handleCloseModal: () => void; 
  studyData: StudyDetailRequest | null;
}) {
    // console.log(studyData);
    if (!studyData) {
        return null;
    }

    const positionList = getPositionOptions();
  return (
    <>
      <div className="fixed inset-0 left-1/2 top-1/2 z-20 flex h-[590px] w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[10px] overflow-hidden rounded-[8px] bg-white px-[30px] py-[40px]">
        <div className="flex h-full w-full flex-col items-center justify-start gap-[24px]"> 
            <p className="font-regular text-[14px] text-gray-default">스터디 참여하기 </p>
            <div className="overflow-y-auto w-full h-full">
                <div className="flex flex-col items-start justify-center gap-[24px]">
                    <div className="flex flex-col items-start justify-center gap-[16px]">
                        <div className="text-[24px] font-semibold text-black">{studyData?.title}</div>
                        <div className="pt-[8px] pb-[8px]">
                            <div className="flex items-center gap-[4px]">
                                {studyData?.getRecruitmentPositionResponses.map(
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
                        </div>
                    </div>
                    
                </div>
            </div> 
            <div className="flex items-center justify-center gap-[10px] w-[380px] mx-auto">
                <button type="button" className="w-[120px] flex-shrink-0 h-[40px]  rounded-[4px] bg-[#E7F3FF] text-[14px] font-semibold text-link-default">취소</button>
                <button type="button" className=" h-[40px] flex-1 rounded-[4px] bg-link-default text-[14px] font-semibold text-white">참여하기</button>
            </div>
        </div>
      </div>
      <div
        className="fixed inset-0 z-10 bg-black/50"
        onClick={handleCloseModal}
      />
    </>
  );
}