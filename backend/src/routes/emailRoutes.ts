import { Router } from 'express';
import { generateEmailController, checkLimitController, generateReplyController } from '../controllers/emailController';

const router = Router();

// Generate cold email
router.post('/generate', generateEmailController);

// Generate smart reply
router.post('/reply', generateReplyController);

// Check remaining daily limit
router.get('/limit', checkLimitController);

export default router;
