'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getCategoryList } from '@/types/api/study';
import { InputField } from '@/components/InputField';
import ImageUploader from '@/components/study-create/ui/image-uploader';
import RadioSelectGroup from '@/components/study-create/ui/radio-select-group';
import Toast from '@/components/ui/Toast';

export default function StudyCreate() {
  const methods = useForm();
  const category = getCategoryList();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [previewImages, setPreviewImages] = useState<
    {
      url: string;
      width: number;
      height: number;
      name: string;
    }[]
  >([]);
  const [isToast, setIsToast] = useState(false);

  const handleCategoryChange = (id: number) => {
    setSelectedCategory(id);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }
  };

  const handleOrderEdit = (
    newOrder: { url: string; width: number; height: number; name: string }[],
  ) => {
    setPreviewImages(newOrder);
  };


  return (
    <>
      <section className="mx-auto max-w-screen-xl px-5 pb-[110px] pt-10 xl:px-0">
        <h2 className="mb-[40px] text-2xl font-semibold">스터디 생성하기</h2>
        <FormProvider {...methods}>
          <form action="">
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
              <ImageUploader
                name="image"
                label="이미지"
                subLabel="스터디에 관련된 이미지를 추가해 주세요."
                onImageChange={handleImageChange}
                previewImages={previewImages.map((image) => ({
                  url: image.url,
                  width: image.width,
                  height: image.height,
                  name: image.name,
                }))}
                msg="사진 별 권장 사이즈 및 용량 : 1장당 최대 크기 5MB)"
                handleOrderEdit={handleOrderEdit}
              />
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
