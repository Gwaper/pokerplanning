import { type CreateVoteDto, type Vote, voteDataAccess } from '../data-access/vote.data-access';

export class VoteService {
  /**
   * Create a new vote
   * Business logic: validate value, process userName
   */
  async createVote(value: number, userName: string): Promise<Vote> {
    // Validation de la valeur
    if (typeof value !== 'number') {
      throw new Error('Value must be a number');
    }

    // Validation du nom d'utilisateur
    if (!userName || userName.trim() === '') {
      throw new Error('User name is required');
    }

    const voteData: CreateVoteDto = {
      value,
      userName: userName.trim(),
    };

    // Appel au data-access pour insérer en base
    const createdVote = await voteDataAccess.createVote(voteData);

    console.log(`Vote created: ${createdVote.value} by ${createdVote.user_name}`);

    return createdVote;
  }

  /**
   * Get all votes
   */
  async getAllVotes(): Promise<Vote[]> {
    return await voteDataAccess.getAllVotes();
  }

  /**
   * Get votes by user
   */
  async getVotesByUser(userName: string): Promise<Vote[]> {
    if (!userName || userName.trim() === '') {
      throw new Error('User name is required');
    }

    return await voteDataAccess.getVotesByUser(userName.trim());
  }
}

export const voteService = new VoteService();
