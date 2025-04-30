import { useVideoTrack, DailyVideo } from '@daily-co/daily-react';
import { cn } from '@/lib/utils';

export const Video = ({ id, className }: { id: string, className?: string }) => {
  const videoState = useVideoTrack(id);

  return (
    <DailyVideo
      automirror
      sessionId={id}
      type='video'
      className={cn(
        'h-auto bg-gradient-to-r from-[rgba(var(--color-deep-purple),0.2)] to-[rgba(var(--color-teal),0.2)] rounded-lg shadow-md transition-all duration-300', 
        className, 
        {
          hidden: videoState.isOff,
        }
      )}
    />
  );
}