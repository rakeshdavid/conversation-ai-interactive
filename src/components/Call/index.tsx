import { useState } from 'react';
import { DailyAudio, useParticipantIds, useLocalSessionId, useDaily, useVideoTrack, useAudioTrack } from '@daily-co/daily-react';
import { Minimize, Maximize, Mic, MicOff, Video as VideoIcon, VideoOff, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Video } from '../Video';
import { Button } from '../ui/button';

export const Call = () => {
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const localSessionId = useLocalSessionId();
  const [mode, setMode] = useState<'full' | 'minimal'>('full');
  const daily = useDaily();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const isCameraEnabled = !localVideo.isOff;
  const isMicEnabled = !localAudio.isOff;


  const handleToggleMode = () => {
    setMode(prev => prev === 'full' ? 'minimal' : 'full');
  }
  
  const toggleCamera = () => {
    daily?.setLocalVideo(!isCameraEnabled);
  };

  const toggleMicrophone = () => {
    daily?.setLocalAudio(!isMicEnabled);
  };

  return <>
    <div className={cn("flex items-center justify-center", {
      'fixed bottom-20 right-20': mode === 'minimal',
    })}>
      <div className='relative'>
        <Button variant='outline' onClick={handleToggleMode} className='absolute top-2 right-2 z-10 gap-2' size='sm'>
          {mode === 'full' ? 'Minimize' : 'Maximize'}
          {mode === 'full' ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
        </Button>
        
        <div className={cn('absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg border border-[rgba(var(--color-teal),0.4)]', {
          'w-auto': mode === 'full',
          'w-32 justify-center': mode === 'minimal'
        })}>
          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full text-white shadow-md ${isCameraEnabled ? 'bg-[rgb(var(--color-teal))]' : 'bg-[rgb(var(--color-deep-purple))]'} transition-all hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95`}
            aria-label={isCameraEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            {isCameraEnabled ? (
              <VideoIcon className='size-5' />
            ) : (
              <VideoOff className='size-5' />
            )}
          </button>
          
          <button
            onClick={toggleMicrophone}
            className={`p-3 rounded-full text-white shadow-md ${isMicEnabled ? 'bg-[rgb(var(--color-teal))]' : 'bg-[rgb(var(--color-deep-purple))]'} transition-all hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95`}
            aria-label={isMicEnabled ? 'Turn off microphone' : 'Turn on microphone'}
          >
            {isMicEnabled ? (
              <Mic className='size-5' />
            ) : (
              <MicOff className='size-5' />
            )}
          </button>
          
          {mode === 'full' && (
            <div className='flex items-center justify-center bg-[rgb(var(--color-pink))] p-3 rounded-full shadow-md text-white'>
              <Volume2 className='size-5' />
            </div>
          )}
        </div>
        {
          remoteParticipantIds.length > 0 ?
            <Video
              id={remoteParticipantIds[0]}
              className={
                cn({
                  'max-h-[50vh] min-h-[20rem]': mode === 'full',
                  'max-h-[15rem]': mode === 'minimal',
                })
              }
            /> :
            <div className='relative flex items-center justify-center size-[50vh]'>
              <p className='text-2xl text-black'>Waiting for others to join...</p>
            </div>
        }
        {localSessionId && (
          <Video
            id={localSessionId}
            className={cn('absolute bottom-2 right-2', {
              'max-h-40': mode === 'full',
              'max-h-20': mode === 'minimal',
            })}
          />
        )}
      </div>
    </div>
    <DailyAudio />
  </>
}