import { useState, useCallback } from 'react';
import {
  useDevices,
  useDaily,
  useDailyEvent,
  useLocalSessionId,
  useVideoTrack,
  useAudioTrack,
} from '@daily-co/daily-react';
import { Button, buttonVariants } from '../ui/button';
import { Mic, Video, Volume2, VideoOff, VideoIcon, MicOff } from 'lucide-react';
import { SelectDevice } from '../SelectDevice';
import type { VariantProps } from 'class-variance-authority';

export const CameraSettings = ({
  actionLabel,
  onAction,
  cancelLabel,
  onCancel,
  actionVariant // Add actionVariant prop
}: {
  actionLabel?: string;
  onAction?: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
  actionVariant?: VariantProps<typeof buttonVariants>['variant']; // Define type for actionVariant
}) => {
  const daily = useDaily();
  const {
    currentCam,
    currentMic,
    currentSpeaker,
    microphones,
    speakers,
    cameras,
    setMicrophone,
    setCamera,
    setSpeaker,
    refreshDevices,
  } = useDevices();
  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const isCameraEnabled = !localVideo.isOff;
  const isMicEnabled = !localAudio.isOff;

  const [getUserMediaError, setGetUserMediaError] = useState(false);


  useDailyEvent(
    'camera-error',
    useCallback(() => {
      setGetUserMediaError(true);
    }, [])
  );

  const toggleCamera = () => {
    daily?.setLocalVideo(!isCameraEnabled);
  };

  const toggleMicrophone = () => {
    daily?.setLocalAudio(!isMicEnabled);
  };

  return (
    <div className='relative w-full max-w-screen-md flex flex-col items-center justify-center mx-auto'>
      <div className='flex items-center justify-center w-full'>
        {getUserMediaError && (
          <button
            onClick={() => {
              refreshDevices();
            }}
            className='px-6 py-3 rounded-md bg-[rgb(var(--color-teal))] text-white font-medium transition-all hover:bg-[rgb(var(--color-teal-variant-2))]'
          >
            Turn on Camera & Microphone
          </button>
        )}


        {!getUserMediaError && (
          <div className='flex flex-wrap items-center justify-center gap-5 w-full max-w-3xl mx-auto p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-sm'>
            <div className='flex items-center space-x-3'>
              <button
                onClick={toggleCamera}
                className={`p-3 rounded-md text-white shadow-md ${isCameraEnabled ? 'bg-[rgb(var(--color-teal))]' : 'bg-[rgb(var(--color-deep-purple))]'} transition-all hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95`}
                aria-label={isCameraEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                {isCameraEnabled ? (
                  <VideoIcon className='size-5' />
                ) : (
                  <VideoOff className='size-5' />
                )}
              </button>
              <div className='w-40 md:w-48'>
                <SelectDevice
                  value={currentCam?.device?.deviceId}
                  devices={cameras}
                  onChange={val => setCamera(val)}
                  Icon={Video}
                />
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <button
                onClick={toggleMicrophone}
                className={`p-3 rounded-md text-white shadow-md ${isMicEnabled ? 'bg-[rgb(var(--color-teal))]' : 'bg-[rgb(var(--color-deep-purple))]'} transition-all hover:opacity-90 hover:shadow-lg transform hover:scale-105 active:scale-95`}
                aria-label={isMicEnabled ? 'Turn off microphone' : 'Turn on microphone'}
              >
                {isMicEnabled ? (
                  <Mic className='size-5' />
                ) : (
                  <MicOff className='size-5' />
                )}
              </button>
              <div className='w-40 md:w-48'>
                <SelectDevice
                  value={currentMic?.device?.deviceId}
                  devices={microphones}
                  onChange={val => setMicrophone(val)}
                  Icon={Mic}
                />
              </div>
            </div>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 flex items-center justify-center bg-[rgb(var(--color-teal))] rounded-md shadow-md'>
                <Volume2 className='size-5 text-white' />
              </div>
              <div className='w-40 md:w-48'>
                <SelectDevice
                  value={currentSpeaker?.device?.deviceId}
                  devices={speakers}
                  onChange={val => setSpeaker(val)}
                  Icon={Volume2}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='flex gap-4 mt-6'>
        {cancelLabel && <Button 
          variant='outline' 
          onClick={onCancel}
          className="border-[rgb(var(--color-pink))] text-[rgb(var(--color-pink))] hover:bg-[rgba(var(--color-pink),0.1)] hover:text-[rgb(var(--color-pink))] font-medium transition-all"
        >
          {cancelLabel}
        </Button>}
        {actionLabel && (
          <Button
            onClick={onAction}
            variant={actionVariant || 'default'} // Use actionVariant or default
            className='px-6 py-3 font-semibold'
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
