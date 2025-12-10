import { pool } from '../config/database';

export interface Vote {
  id: number;
  value: number;
  user_name: string;
  created_at: Date;
}

export interface CreateVoteDto {
  value: number;
  userName: string;
}

export class VoteDataAccess {
  /**
   * Insert a new vote in the database
   */
  async createVote(data: CreateVoteDto): Promise<Vote> {
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

  /**
   * Get votes by user
   */
  async getVotesByUser(userName: string): Promise<Vote[]> {
    const query = `
      SELECT id, value, user_name, created_at
      FROM vote
      WHERE user_name = $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [userName]);
    return result.rows;
  }

  /**
   * Get vote by id
   */
  async getVoteById(id: number): Promise<Vote | null> {
    const query = 'SELECT id, value, user_name, created_at FROM vote WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

export const voteDataAccess = new VoteDataAccess();
