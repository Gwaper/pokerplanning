const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const voteService = {
  saveVote: async (value: string | number, userName: string = 'Anonymous'): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, userName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Vote saved:', data);
    } catch (error) {
      console.error('Failed to save vote:', error);
      throw error;
    }
  },
};
