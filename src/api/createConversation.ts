import { TAVUS_API_KEY, TAVUS_PERSONA_ID, TAVUS_REPLICA_ID } from '@/config';
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
        persona_id: TAVUS_PERSONA_ID, // Use env variable
        replica_id: TAVUS_REPLICA_ID, // Use env variable, can be undefined if not set
        conversation_name: "Interview with Arvind",
        custom_greeting: "Hello Arvind",
        conversational_context: "Arvind is applying for Data Governance role",
        properties: {
          max_call_duration: 900,
          participant_left_timeout: 0,
          enable_closed_captions: true,
          language: "multilingual",
          recording_s3_bucket: "avatar-recordings-test",
          recording_s3_bucket_region: "us-east-2",
          aws_assumed_role_arn: "arn:aws:iam::179227986613:role/CVIRecordingRole"
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData = '';
      try {
        errorData = await response.text();
      } catch (e) {
        // If reading response text fails, use a generic message
        errorData = 'Could not retrieve error details from API.';
      }
      console.error(`API Error: ${response.status} - ${errorData}`);
      throw new Error(`Failed to create conversation. Status: ${response.status}, Message: ${errorData || 'No additional error message provided by API.'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Check if error is an instance of Error before accessing properties
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out after 30 seconds');
        throw new Error('Request timed out. Please try again.');
      }
    }
    // Log the original error regardless of type for debugging
    console.error('Error creating conversation:', error);
    // Re-throw the error, ensuring it's an Error instance
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unknown error occurred during conversation creation: ${String(error)}`);
    }
  }
};
