import express from 'express';
import { openaiController } from '../controllers/openai.controller.js';

const router = express.Router();

router.post('/text', openaiController.chatBot);

router.post('/code', openaiController.codeBot);

router.post('/assist', openaiController.assistBot);

export default router;
