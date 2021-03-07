import express from 'express';

import authRoutes from './auth.js';
import usersRoutes from './users.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
// fallback 404
router.use('/', (req, res) => res.status(404).json('No route for this path'));

export default router;
