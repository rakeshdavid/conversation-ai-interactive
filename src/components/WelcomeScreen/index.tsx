import { Button } from '../ui/button';
import { SparklesText } from '@/components/ui/sparkles-text';

export const WelcomeScreen = ({ onStart, loading }: { onStart: () => void, loading: boolean }) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-10 p-10 relative z-10'>
      <div className='card-feature max-w-2xl w-full p-8 transition-all hover:shadow-lg'>
        <img src='/maslow-black-logo.png' alt='Maslow AI Logo' className='max-w-xs mx-auto mb-6' />
        <div className='mb-8 text-center'>
          <SparklesText 
            text="Conversational AI" 
            colors={{ first: "rgb(var(--color-teal))", second: "rgb(var(--color-deep-purple))" }}
            className="text-2xl font-medium text-[rgb(var(--color-dark-blue))]"
          />
        </div>
        <div className='flex justify-center'>
          <Button 
            onClick={onStart}
            className='button-primary text-lg px-12 py-6 transition-all hover:scale-105'
          >
            {loading ? (
              <span className='flex items-center gap-2'>
                <span className='animate-pulse'>Loading...</span>
              </span>
            ) : (
              'Start Conversation'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
