import { TAVUS_API_KEY } from '@/config';

export const endConversation = async (conversationId: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: 'POST',
        headers: {
          'x-api-key': TAVUS_API_KEY,
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to end conversation: ${response.status}, message: ${errorData}`);
    }

    return null;
  } catch (error) {
    // Check if error is an instance of Error before accessing properties
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out after 30 seconds');
        throw new Error('Request timed out. Please try again.');
      }
    }
    // Log the original error regardless of type for debugging
    console.error('Error ending conversation:', error);
    // Re-throw the error, ensuring it's an Error instance
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unknown error occurred while ending the conversation: ${String(error)}`);
    }
  }
};
