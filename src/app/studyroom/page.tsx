'use client';

import dynamic from 'next/dynamic';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { StudyRoomErrorBoundary } from '@/components/error-boundary/study-room/study-room-errorboundary';
import { StudyRoomErrorFallback } from '@/components/error-boundary/study-room/study-room-error-fallback';
import { StudyRoomLoading } from '@/components/loading/study-room-loading';

const StudyRoomContainer = dynamic(
  () => import('@/components/study-room/container').then(mod => mod.StudyRoomContainer),
  { 
    ssr: false,
    loading: () => <StudyRoomLoading /> 
  }
);

export default function StudyRoom() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <StudyRoomErrorBoundary
          onReset={reset}
          FallbackComponent={StudyRoomErrorFallback}
        >
          <StudyRoomContainer />
        </StudyRoomErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}