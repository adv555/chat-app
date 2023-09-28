import axios from 'axios';
import { chatEngineService } from '../services/chatEngine.service.js';

const CHAT_ENGINE_BASE_URL = process.env.CHAT_ENGINE_BASE_URL;

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.get(
      `${CHAT_ENGINE_BASE_URL}/users/me`,
      {
        headers: {
          'Project-ID': process.env.PROJECT_ID,
          'User-Name': username,
          'User-Secret': password,
        },
      },
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
}

async function signup(req, res) {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await chatEngineService.createUser(
      username,
      password,
    );

    const defaultAiChats = ['AiChat_bot', 'AiAssist_bot', 'AiCode_bot'];

    const aiChatPromises = defaultAiChats.map((chatName) =>
      chatEngineService.createAiChat(username, password, chatName),
    );

    await Promise.all(aiChatPromises);

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error('error', error.message);
    res.status(500).json({ error: error.message });
  }
}

export const authController = { login, signup };
