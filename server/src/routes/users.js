import express from 'express';

import * as UserController from '../controllers/user.controller.js';
import requireJwtAuth from '../middleware/requireJwtAuth.js';
import { createUserValidation, updateUserValidation } from '../validations/user.validation.js';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', requireJwtAuth, UserController.getUser);
router.post('/', createUserValidation, requireJwtAuth, UserController.createUser);
router.delete('/:id', requireJwtAuth, UserController.deleteUser);
router.put('/:id', updateUserValidation, requireJwtAuth, UserController.updateUser);

export default router;
