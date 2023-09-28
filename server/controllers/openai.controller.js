import { chatEngineService } from '../services/chatEngine.service.js';
import { openaiService } from '../services/openai.service.js';

async function chatBot(req, res) {
  try {
    const { text, activeChatId } = req.body;

    const message = await openaiService.generateGptResponse(
      'You are a helpful assistant.',
      text,
    );

    await chatEngineService.sendMessage(activeChatId, message);

    res.status(200).json({ text: message });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
}

async function codeBot(req, res) {
  try {
    const { text, activeChatId } = req.body;

    const message = await openaiService.generateGptResponse(
      'You are an assistant coder who responds with only code and no explanations.',
      text,
    );

    await chatEngineService.sendMessage(activeChatId, message);

    res.status(200).json({ text: message });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
}

async function assistBot(req, res) {
  try {
    const { text } = req.body;

    const message = await openaiService.generateGptAssistResponse(text);

    res.status(200).json({ text: message });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
}

export const openaiController = { chatBot, codeBot, assistBot };
