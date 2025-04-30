import { useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { useLocalSessionId } from '@daily-co/daily-react';
import { CameraSettings } from '../CameraSettings';
import { Video } from '../Video';

export const HairCheckScreen = ({ handleJoin, handleEnd }:
  {
    handleJoin: () => void,
    handleEnd: () => void
  }
) => {
  const localSessionId = useLocalSessionId();
  const daily = useDaily();

  useEffect(() => {
    if (daily) {
      daily?.startCamera({ startVideoOff: false, startAudioOff: false });
    }
  }, [daily, localSessionId]);

  return (
    <div className="flex flex-col items-center justify-center p-6 relative z-10">
      <div className="card max-w-4xl w-full p-6 mb-6">
        <img src='/maslow-black-logo.png' alt='Maslow AI Logo' className='max-w-xs mx-auto mb-4' />
        <div className="rounded-lg overflow-hidden shadow-md border-2 border-[rgb(var(--color-teal))] mb-4">
          <Video id={localSessionId} className='max-h-[70vh] w-full object-cover' />
        </div>
      </div>
      <div className="card max-w-4xl w-full p-6">
        <CameraSettings
          actionLabel='Join Call'
          onAction={handleJoin}
          cancelLabel='Cancel'
          onCancel={handleEnd}
        />
      </div>
    </div>
  )
};