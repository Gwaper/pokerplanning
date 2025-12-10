import { voteDataAccess } from '../data-access/vote.data-access';
import { voteService } from '../services/vote.service';

// Mock du data-access
jest.mock('../data-access/vote.data-access');

describe('VoteService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createVote', () => {
    it('should create a vote with valid data', async () => {
      const mockVote = {
        id: 1,
        value: 5,
        user_name: 'Noel Flantier',
        created_at: new Date(),
      };

      (voteDataAccess.createVote as jest.Mock).mockResolvedValue(mockVote);

      const result = await voteService.createVote(5, 'Noel Flantier');

      expect(result).toEqual(mockVote);
      expect(voteDataAccess.createVote).toHaveBeenCalledWith({
        value: 5,
        userName: 'Noel Flantier',
      });
    });

    it('should trim userName', async () => {
      const mockVote = {
        id: 1,
        value: 8,
        user_name: 'Jane',
        created_at: new Date(),
      };

      (voteDataAccess.createVote as jest.Mock).mockResolvedValue(mockVote);

      await voteService.createVote(8, '  Jane  ');

      expect(voteDataAccess.createVote).toHaveBeenCalledWith({
        value: 8,
        userName: 'Jane',
      });
    });

    it('should throw error if userName is empty', async () => {
      await expect(voteService.createVote(5, '')).rejects.toThrow('User name is required');
    });

    it('should throw error if value is not a number', async () => {
      await expect(voteService.createVote('invalidNumber' as any, 'John')).rejects.toThrow(
        'Value must be a number',
      );
    });
  });
});
