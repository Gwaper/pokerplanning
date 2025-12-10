import { Router } from 'express';
import voteRoutes from './vote.routes';

const router = Router();

// Mount routes
router.use('/vote', voteRoutes);

export default router;
