import { useState } from 'react';
import {
  POSITION_LABELS,
  RecruitmentPositionTitle,
} from '@/types/api/study-recruit/study';

export default function StudyPositionChange({
  handleCloseModal,
  defaultValue,
  position,
  onClickOption,
}: {
  handleCloseModal: () => void;
  defaultValue: string | undefined;
  position: string[] | undefined;
  onClickOption: (value: string) => void;
}) {
  const handleConfirm = () => {
    handleCloseModal();
    onClickOption(selectedPosition || defaultValue || '');
    console.log('selectedPosition', selectedPosition);
  };

  const [selectedPosition, setSelectedPosition] = useState(defaultValue || '');

  const onChangePosition = (value: string) => {
    // console.log('value', value);
    setSelectedPosition(value);
    return value;
  };

  const positionList = position
    ?.filter((option) => option !== 'ALL')
    .map((pos) => ({
      value: pos,
      label: POSITION_LABELS[pos as keyof typeof RecruitmentPositionTitle],
    }));
//   console.log(positionList);

  return (
    <>
      <div className="fixed inset-0 left-1/2 top-1/2 z-20 flex max-h-[400px] min-h-[290px] w-[440px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[10px] overflow-hidden rounded-[8px] bg-white px-[30px] py-[40px]">
        <div className="flex h-full flex-col items-center justify-center gap-[24px]">
          <h2 className="text-[14px] font-semibold text-[#565656]">
            신청 포지션을 변경합니다.
          </h2>
          <div className="w-full flex-1 overflow-y-auto">
            <ul className="flex flex-col gap-[4px]">
              {positionList?.map((position) => (
                <li
                  key={position.value}
                  className="relative flex flex-row-reverse items-center justify-between overflow-hidden rounded-[4px] px-[16px] py-[10px] hover:bg-[#f2f2f2]"
                >
                  <input
                    type="radio"
                    name="position"
                    value={position.value}
                    className="peer absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                    onChange={() => onChangePosition(position.value)}
                    checked={selectedPosition === position.value}
                  />
                  <i
                    className={`peer:checked:border-link-default peer:checked:bg-link-default peer:checked:bg-[url(/icons/icon_select_check.svg)] block h-[20px] w-[20px] shrink-0 rounded-full border bg-white bg-center bg-no-repeat ${
                      selectedPosition === position.value
                        ? 'border-link-default bg-link-default bg-[url(/icons/icon_select_check.svg)] peer-checked:border-link-default peer-checked:bg-link-default peer-checked:bg-[url(/icons/icon_select_check.svg)]'
                        : 'border-[#c8c8c8]'
                    }`}
                  ></i>
                  <label className="cursor-pointer text-[14px] font-semibold text-[#565656] peer-checked:before:absolute peer-checked:before:left-0 peer-checked:before:top-0 peer-checked:before:z-[-1] peer-checked:before:h-full peer-checked:before:w-full peer-checked:before:rounded-[4px] peer-checked:before:bg-[#f2f2f2] peer-checked:before:content-['']">
                    {position.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full items-center justify-center gap-[10px]">
            <button
              type="button"
              className="h-[40px] w-[120px] flex-shrink-0 rounded-[4px] bg-[#E7F3FF] text-[14px] font-semibold text-link-default"
              onClick={handleCloseModal}
            >
              닫기
            </button>
            <button
              type="button"
              className="h-[40px] flex-1 rounded-[4px] bg-link-default text-[14px] font-semibold text-white"
              onClick={handleConfirm}
            >
              변경
            </button>
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
