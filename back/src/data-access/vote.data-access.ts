import { pool } from '../config/database';
import { Vote } from './models/vote.interface'



export class VoteDataAccess {
  /**
   * Insert a new vote in the database
   */
  async createVote(data: {value:number , userName: string}): Promise<Vote> {
    const query = `
      INSERT INTO vote (value, user_name)
      VALUES ($1, $2)
      RETURNING id, value, user_name, created_at
    `;

    const result = await pool.query(query, [data.value, data.userName]);
    return result.rows[0];
  }

  /**
   * Get all votes
   */
  async getAllVotes(): Promise<Vote[]> {
    const query = 'SELECT id, value, user_name, created_at FROM vote ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }
}

export const voteDataAccess = new VoteDataAccess();
