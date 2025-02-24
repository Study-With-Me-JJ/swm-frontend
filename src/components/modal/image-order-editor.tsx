'use client';

import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';

function SortableItem({
  image,
}: {
  image: { url: string; width: number; height: number };
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
      className="mb-[10px] flex w-full cursor-move items-center gap-[12px] border border-[#e0e0e0] bg-white py-[20px]"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="flex-shrink-0 text-gray-400"
      >
        <path
          d="M8 6H16M8 12H16M8 18H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative h-[100px] w-[100px] flex-shrink-0">
        <Image
          src={image.url}
          alt="image"
          width={200}
          height={200}
          style={{ width: '100%', height: 'auto' }}
          className="rounded-[4px] object-cover"
        />
      </div>
      <span className="flex-1 truncate text-[14px] text-gray-600">
        {image.url}
      </span>
    </div>
  );
}

export default function ImageOrderEditor({
  //간단한 상태관리만 필요하므로 클라이언트사이드 모달로 구현
  images,
  handleOrderEdit,
  handleCloseModal,
}: {
  images: { url: string; width: number; height: number }[];
  handleOrderEdit: (
    newOrder: { url: string; width: number; height: number }[],
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
