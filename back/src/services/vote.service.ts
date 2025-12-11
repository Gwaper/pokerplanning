import { voteDataAccess} from '../data-access/vote.data-access';
import { Vote } from '../data-access/models/vote.interface'

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

    // Appel au data-access pour insérer en base
    const createdVote = await voteDataAccess.createVote({  value,
      userName: userName.trim()});

    console.log(`Vote created: ${createdVote.value} by ${createdVote.user_name}`);

    return createdVote;
  }
}

export const voteService = new VoteService();
