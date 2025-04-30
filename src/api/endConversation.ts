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
    if (error.name === 'AbortError') {
      console.error('Request timed out after 30 seconds');
      throw new Error('Request timed out. Please try again.');
    }
    console.error('Error:', error);
    throw error;
  }
};
