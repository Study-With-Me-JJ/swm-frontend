'use client';

import { useToastStore } from '@/store/useToastStore';
import Toast from './Toast';

export default function ToastContainer() {
  const { isToast, message, url, urlText, active, icon } = useToastStore();
  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-[100] h-[120px] w-full min-w-[300px] text-center ${
          isToast ? 'animate-slide-up-fade' : ''
        }`}
      >
        <Toast
          isToast={isToast}
          message={message}
          url={url}
          urlText={urlText}
          active={active}
          icon={icon}
        />
      </div>
    </>
  );
}
