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
    <div ref={setNodeRef} {...attributes} {...listeners} key={image.url}>
      <Image
        src={image.url}
        alt="image"
        width={200}
        height={200}
        style={{ width: '100%', height: 'auto' }}
      />
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
      <div className="fixed inset-0 left-1/2 top-1/2 z-20 flex h-[590px] w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[10px] rounded-[8px] bg-white px-[50px] py-[40px]">
        <div className="flex items-center justify-center flex-col gap-[30px]">
            <div className='flex gap-[8px] items-center justify-center flex-col'>
                <h2 className="text-[20px] font-semibold text-black">이미지 순서 편집</h2>
                <p className="font-regular text-[14px] text-gray-default">이미지나 ☰ 부분을 끌어 순서를 변경해 주세요.</p> 
            </div>  
            <DndContext
            onDragEnd={(event) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                const oldIndex = images.findIndex((img) => img.url === active.id);
                const newIndex = images.findIndex((img) => img.url === over.id);
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
      </div>
      <div
          className="fixed inset-0 z-10 bg-black/50"
          onClick={handleCloseModal}
        />
    </>
  );
}
