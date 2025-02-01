'use client';

import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { StudyRoomErrorBoundary } from '@/components/error-boundary/study-room/study-room-errorboundary';
import { StudyRoomErrorFallback } from '@/components/error-boundary/study-room/study-room-error-fallback';
import { StudyRoomLoading } from '@/components/loading/study-room-loading';
import { StudyRoomContainer } from '@/components/study-room/study-room-container';

export default function StudyRoom() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <StudyRoomErrorBoundary
          onReset={reset}
          FallbackComponent={StudyRoomErrorFallback}
        >
          <Suspense fallback={<StudyRoomLoading />}>
            <StudyRoomContainer />
          </Suspense>
        </StudyRoomErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}