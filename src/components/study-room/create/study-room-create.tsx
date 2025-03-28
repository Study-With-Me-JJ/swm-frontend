import { useState } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { CreateStudyRoomReq } from '@/types/api';
import { InputField } from '@/components/InputField';
import { Input } from '@/components/ui/input';

export interface StudyRoomCreateProps {
  mutate: (data: CreateStudyRoomReq) => void;
  isPending: boolean;
}

interface TimeInputProps {
  name: keyof CreateStudyRoomReq;
  label: string;
  period: '오전' | '오후';
  onChange: (time: string) => void;
}

const TimeInput = ({ name, label, period, onChange }: TimeInputProps) => {
  const { control } = useFormContext();
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length <= 4) {
      let newHour = '';
      let newMinute = '';

      if (value.length <= 2) {
        newHour = value;
        newMinute = minute;
      } else {
        newHour = value.slice(0, 2);
        newMinute = value.slice(2);
      }

      if (parseInt(newHour) > 24) newHour = '24';
      if (parseInt(newMinute) > 59) newMinute = '59';

      setHour(newHour);
      setMinute(newMinute);

      const formattedHour = newHour.padStart(2, '0');
      const formattedMinute = newMinute.padStart(2, '0');
      onChange(`${formattedHour}:${formattedMinute}`);
    }
  };

  const displayValue = `${period} ${hour}${minute.length ? ':' + minute : ''}`;

  return (
    <div className="flex max-w-[286px] items-center gap-4">
      <label className="text-[16px] text-[#828282]">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            value={displayValue}
            onChange={handleTimeChange}
            className="min-w-[208px] text-center text-[16px] leading-[34px] outline-none"
          />
        )}
      />
    </div>
  );
};

export const StudyRoomCreate = (
  {
    // mutate,
    // isPending,
  }: StudyRoomCreateProps,
) => {
  const methods = useForm<CreateStudyRoomReq>({
    defaultValues: {
      openingTime: '00:00',
      closingTime: '24:00',
    },
  });

  const { setValue } = methods;

  const handleOpeningTimeChange = (time: string) => {
    setValue('openingTime', time);
  };

  const handleClosingTimeChange = (time: string) => {
    setValue('closingTime', time);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => {}}>
        <div className="flex flex-col gap-[30px]">
          <div className="flex w-full gap-[40px]">
            <div className="flex-grow">
              <InputField
                className="text-[20px]"
                name="title"
                label="제목"
                type="text"
                placeholder="제목을 입력해 주세요."
              />
            </div>
            <div className="flex-grow">
              <InputField
                className="text-[20px]"
                name="subtitle"
                label="서브 제목"
                type="text"
                placeholder="서브 제목을 입력해 주세요."
              />
            </div>
          </div>
          <InputField
            className="text-[20px]"
            name="introduce"
            label="공간 소개"
            type="text"
            placeholder="스터디 룸에 대해 소개해 주세요."
          />
          {/* NOTE: 시설안내 영역 논의 후 작업 -> 시설안내 필드는 notice라고 함. 지윤님에게 디자인 피드백 필요*/}
          <InputField
            className="text-[20px]"
            name="notice"
            label="시설 안내"
            type="text"
            placeholder="시설 안내를 입력해 주세요."
          />
          {/* NOTE: 태그 추가 영역 논의 후 작업. 스터디 생성과 같은 string[] 타입이므로 스터디와 동일하게 구현해도 될지 지윤님에게 피드백 */}
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[12px]">
              <h3 className="text-[20px] font-semibold">태그 추가</h3>
              <span className="text-[12px] text-[#bbb]">
                컴마(,)로 구분해 주세요. (ex. #태그1,#태그2,#태그3,...)
              </span>
            </div>
            <div className="box-border min-h-[60px] rounded-lg border border-[#e0e0e0] px-[16px] py-[13px]">
              <div className="flex flex-wrap gap-1">
                {/* {tagList.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center rounded-[4px] bg-[#eee] px-2 py-1 text-[16px] font-medium text-[#a5a5a5]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {}}  
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <Image
                        src="/icons/Clear-gray.svg"
                        alt="태그삭제"
                        width={18}
                        height={18}
                      />
                    </button>
                  </span>
                ))} */}
                <input
                  type="text"
                  // value={inputValue}
                  // onChange={handleInputChange}
                  // onKeyDown={handleKeyDown}
                  placeholder={
                    // tagList.length === 0
                    true ? '#태그를 입력해 주세요. (최대 10개)' : ''
                  }
                  className="min-w-[100px] flex-grow border-none text-[16px] leading-[34px] outline-none"
                />
              </div>
            </div>
            <InputField
              className="text-[20px]"
              name="guideline"
              label="주의 사항"
              type="text"
              placeholder="예약 및 사용시 주의해야할 사항을 입력해 주세요."
            />
            <div>
              <div className="flex items-center gap-[12px]">
                <h3 className="text-[20px] font-semibold">영업 시간</h3>
              </div>

              <div className="flex items-center">
                <TimeInput
                  name="openingTime"
                  label="시작 시간"
                  period="오전"
                  onChange={handleOpeningTimeChange}
                />
                <span className="px-4 text-[16px]">~</span>
                <TimeInput
                  name="closingTime"
                  label="마감 시간"
                  period="오후"
                  onChange={handleClosingTimeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
