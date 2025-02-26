'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getCategoryList, getPositionOptions } from '@/types/api/study';
import { InputField } from '@/components/InputField';
import ImageUploader from '@/components/study-create/ui/image-uploader';
import PositionFieldGroup from '@/components/study-create/ui/position-field-group';
import RadioSelectGroup from '@/components/study-create/ui/radio-select-group';
import Toast from '@/components/ui/Toast';

interface PositionField {
  id: string;
  position: string;
  capacity: number | undefined;
}

export default function StudyCreate() {
  const methods = useForm();
  const { watch } = methods;
  const category = getCategoryList();
  const [previewImages, setPreviewImages] = useState<
    {
      url: string;
      width: number;
      height: number;
      name: string;
    }[]
  >([]);

  const [positionFields, setPositionFields] = useState<PositionField[]>([
    { id: '1', position: 'ALL', capacity: undefined },
  ]);

  //필수입력값 유효성검사
  const formTitle = watch('title');
  const formContent = watch('content');
  const formOpenChatUrl = watch('openChatUrl');
  const formCategory = watch('category');

  const isFormValid =
    formTitle &&
    formContent &&
    formOpenChatUrl &&
    formCategory &&
    positionFields.length > 0 &&
    positionFields.every(
      (field: PositionField) =>
        field.position !== 'ALL' &&
        field.capacity !== undefined &&
        field.capacity > 0,
    );

  const [isToast, setIsToast] = useState(false);

  const handleCategoryChange = (id: number) => {
    methods.setValue('category', id);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('handleImageChange 호출됨');
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setIsToast(true);
        e.target.value = '';
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewImages((prev) => [
        ...prev,
        { url: imageUrl, width: 200, height: 200, name: file.name },
      ]);
      methods.setValue('image', previewImages);
      console.log('previewImages', previewImages);
    }
  };

  const handleOrderEdit = (
    newOrder: { url: string; width: number; height: number; name: string }[],
  ) => {
    setPreviewImages(newOrder);
  };

  const handleImageEdit = (
    oldUrl: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // console.log('handleImageEdit 호출됨');
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setIsToast(true);
        e.target.value = '';
        return;
      }
      const targetImage = previewImages.find((img) => img.url === oldUrl);
      if (targetImage) {
        URL.revokeObjectURL(targetImage.url);
      }

      const imageUrl = URL.createObjectURL(file);
      const newImage = {
        url: imageUrl,
        width: 200,
        height: 200,
        name: file.name,
      };
      setPreviewImages((prev) =>
        prev.map((img) => (img.url === oldUrl ? newImage : img)),
      );
    }
  };

  const positionOptions = getPositionOptions();

  const [openSelects, setOpenSelects] = useState<Record<string, boolean>>({});

  const handleToggle = (fieldId: string) => {
    setOpenSelects((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };

  const handlePositionChange = (id: string, value: string | string[]) => {
    setPositionFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              position: Array.isArray(value) ? value.join(',') : value || 'ALL',
            }
          : field,
      ),
    );
  };

  const handleCapacityChange = (id: string, value: string) => {
    setPositionFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, capacity: parseInt(value) || 0 } : field,
      ),
    );
  };

  const handleAddPosition = () => {
    setPositionFields((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        position: 'ALL',
        capacity: undefined,
      },
    ]);
  };

  const handleDeletePosition = (id: string) => {
    setPositionFields((prev) => prev.filter((field) => field.id !== id));
  };

  const onSubmit = methods.handleSubmit((data) => {
    console.log('data', data);
  });

  return (
    <>
      <section className="mx-auto max-w-screen-xl px-5 pb-[110px] pt-10 xl:px-0">
        <h2 className="mb-[40px] text-2xl font-semibold">스터디 생성하기</h2>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-[30px]">
              <InputField
                name="title"
                label="제목"
                type="text"
                placeholder="제목을 입력해 주세요. (최대 20자)"
              />
              <InputField
                name="content"
                label="스터디 내용"
                type="text"
                placeholder="어떤 스터디인지 설명해 주세요."
              />
              <InputField
                name="openChatUrl"
                label="오픈채팅 URL"
                type="text"
                placeholder="스터디 활동 시 사용할 오픈채팅 URL을 입력해 주세요."
              />
              <RadioSelectGroup
                label="카테고리"
                subLabel="1개의 카테고리를 선택해 주세요."
                name="category"
                options={category}
                onOptionChange={handleCategoryChange}
              />
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center gap-[12px]">
                  <h3 className="font-semibold">이미지</h3>
                  <span className="text-[12px] text-[#bbb]">
                    스터디에 관련된 이미지를 추가해 주세요.
                  </span>
                </div>
                <ImageUploader
                  name="image"
                  onImageChange={handleImageChange}
                  previewImages={previewImages.map((image) => ({
                    url: image.url,
                    width: image.width,
                    height: image.height,
                    name: image.name,
                  }))}
                  msg="사진 별 권장 사이즈 및 용량 : 1장당 최대 크기 5MB)"
                  handleOrderEdit={handleOrderEdit}
                  handleImageEdit={handleImageEdit}
                />
              </div>
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-semibold">모집 직무</h3>
                {[...positionFields].map(
                  (field: PositionField, index: number) => (
                    <PositionFieldGroup
                      key={field.id}
                      name="position"
                      type="default"
                      value={field.position}
                      onChange={(value) =>
                        handlePositionChange(field.id, value)
                      }
                      onCapacityChange={(value) =>
                        handleCapacityChange(field.id, value.toString())
                      }
                      capacity={field.capacity || 0}
                      options={positionOptions}
                      isOpen={openSelects[field.id] || false}
                      onToggle={() => handleToggle(field.id)}
                      isLastField={index === 0}
                      onAdd={handleAddPosition}
                      onDelete={() => handleDeletePosition(field.id)}
                      id={field.id}
                    />
                  ),
                )}
              </div>
              <button
                type="submit"
                className={`mt-[10px] h-[60px] w-full rounded-[8px] px-4 py-2 text-[16px] font-semibold text-white ${
                  !isFormValid ? 'bg-[#e0e0e0]' : 'bg-link-default'
                }`}
                disabled={!isFormValid}
              >
                스터디 생성 요청하기
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
      <Toast
        isToast={isToast}
        message="이미지 크기는 5MB를 초과할 수 없습니다."
      />
    </>
  );
}
