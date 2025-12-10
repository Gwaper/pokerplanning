import type { Request, Response } from 'express';
import { voteService } from '../services/vote.service';

export class VoteController {
  /**
   * Create a new vote
   * POST /vote
   */
  async createVote(req: Request, res: Response): Promise<void> {
    try {
      const { value, userName } = req.body;

      if (value === undefined || value === null) {
        res.status(400).json({
          status: 'ERROR',
          message: 'Value is required',
        });
        return;
      }

      if (!userName) {
        res.status(400).json({
          status: 'ERROR',
          message: 'User name is required',
        });
        return;
      }

      // Appel au service
      const vote = await voteService.createVote(value, userName);

      res.status(201).json({
        status: 'OK',
        message: 'Vote created successfully',
        data: vote,
      });
    } catch (error) {
      console.error('Error creating vote:', error);
      res.status(500).json({
        status: 'ERROR',
        message: 'Failed to create vote',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

export const voteController = new VoteController();
