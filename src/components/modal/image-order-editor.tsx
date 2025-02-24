'use client';

import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';

function SortableItem({
  image,
}: {
  image: { url: string; width: number; height: number; name: string };
}) {
  const { attributes, listeners, setNodeRef } = useSortable({
    id: image.url,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={image.url}
      className="flex w-full cursor-move items-center justify-between gap-[5px] border-t border-[#e0e0e0] bg-white py-[20px]"
    >
      <div className="flex w-full items-center justify-start gap-[16px]">
        <div className="relative h-[80px] w-[80px] flex-shrink-0 overflow-hidden">
          <Image
            src={image.url}
            alt="image"
            fill
            className="rounded-[8px] object-contain"
          />
        </div>
        <span className="max-w-[150px] truncate text-[14px] text-gray-600">
          {image.name}
        </span>
      </div>
      <Image src="/icons/Menu.svg" alt="" width={28} height={28} />
    </div>
  );
}

export default function ImageOrderEditor({
  //간단한 상태관리만 필요하므로 클라이언트사이드 모달로 구현
  images,
  handleOrderEdit,
  handleCloseModal,
}: {
  images: { url: string; width: number; height: number; name: string }[];
  handleOrderEdit: (
    newOrder: { url: string; width: number; height: number; name: string }[],
  ) => void;
  handleCloseModal: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 left-1/2 top-1/2 z-20 flex h-[590px] w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[10px] overflow-hidden rounded-[8px] bg-white px-[50px] py-[40px]">
        <div className="flex h-full flex-col items-center justify-center gap-[30px]">
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <h2 className="text-[20px] font-semibold text-black">
              이미지 순서 편집
            </h2>
            <p className="font-regular text-[14px] text-gray-default">
              이미지나 ☰ 부분을 끌어 순서를 변경해 주세요.
            </p>
          </div>
          <div className="w-full flex-1 overflow-y-auto">
            <DndContext
              onDragEnd={(event) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                  const oldIndex = images.findIndex(
                    (img) => img.url === active.id,
                  );
                  const newIndex = images.findIndex(
                    (img) => img.url === over.id,
                  );
                  handleOrderEdit(arrayMove(images, oldIndex, newIndex));
                }
              }}
            >
              <SortableContext items={images.map((image) => image.url)}>
                {images.map((image) => (
                  <SortableItem key={image.url} image={image} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <div className="flex w-full items-center justify-center gap-[10px]">
            <button
              className="h-[40px] w-[120px] flex-shrink-0 rounded-[4px] bg-[#E7F3FF] text-[14px] font-semibold text-link-default"
              onClick={handleCloseModal}
            >
              취소
            </button>
            <button className="h-[40px] flex-1 rounded-[4px] bg-link-default text-[14px] font-semibold text-white">
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
