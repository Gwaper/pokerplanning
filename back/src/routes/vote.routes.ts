import { Router } from 'express';
import { voteController } from '../controllers/vote.controller';

const router = Router();

// POST /vote - Create a new vote
router.post('/', (req, res) => voteController.createVote(req, res));

export default router;
