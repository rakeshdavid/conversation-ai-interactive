import { useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { IConversation } from '@/types';
import { CameraSettings } from '../CameraSettings';
import { SparklesText } from '@/components/ui/sparkles-text';

import { Call } from '../Call';

export const CallScreen = ({ conversation, handleEnd }: { conversation: IConversation, handleEnd: () => void }) => {
  const daily = useDaily();

  useEffect(() => {
    if (conversation && daily) {
      const { conversation_url } = conversation;
      daily.join({
        url: conversation_url,
      });
    }
  }, [daily, conversation]);

  const handleLeave = async () => {
    await daily?.leave();
    handleEnd();
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 relative z-10">
      <div className="card max-w-4xl w-full p-6 mb-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-[rgba(var(--color-teal),0.3)]">
        <img src='/maslow-black-logo.png' alt='Maslow AI Logo' className='max-w-xs mx-auto mb-4' />
        <div className="flex justify-center mb-4">
          <SparklesText 
            text="Conversational AI" 
            colors={{ first: "rgb(var(--color-teal))", second: "rgb(var(--color-deep-purple))" }}
            className="text-center text-3xl font-semibold"
          />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md border-2 border-[rgb(var(--color-teal))] mb-4 relative">
          <Call />
        </div>
      </div>
      <div className="card max-w-4xl w-full p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-[rgba(var(--color-teal),0.3)]">
        <CameraSettings
          actionLabel='Leave Call'
          onAction={handleLeave}
          className="bg-gradient-to-r from-[rgb(var(--color-pink))] to-[rgb(var(--color-deep-purple))] text-white hover:shadow-md hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98] px-6 py-3 rounded-md font-semibold"
        />
      </div>
    </div>
  );
};
