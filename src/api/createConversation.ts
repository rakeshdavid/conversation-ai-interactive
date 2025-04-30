import { TAVUS_API_KEY } from '@/config';
import { IConversation } from '@/types';

export const createConversation = async (): Promise<IConversation> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify({
        persona_id: 'p9a95912', // Stock Demo Persona
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out after 30 seconds');
      throw new Error('Request timed out. Please try again.');
    }
    console.error('Error:', error);
    throw error;
  }
};
