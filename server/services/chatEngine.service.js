import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CHAT_ENGINE_BASE_URL = process.env.CHAT_ENGINE_BASE_URL;

function createUser(username, password) {
  return axios.post(
    `${CHAT_ENGINE_BASE_URL}/users/`,
    {
      username,
      secret: password,
    },
    {
      headers: {
        'Private-Key': process.env.CHAT_ENGINE_PRIVATE_KEY,
      },
    },
  );
}

function createAiChat(username, password, chatName) {
  return axios.put(
    `${CHAT_ENGINE_BASE_URL}/chats/`,
    {
      title: chatName,
      usernames: [username, 'AI_bot-Syncwave'],
      is_direct_chat: false,
    },
    {
      headers: {
        'Project-ID': process.env.PROJECT_ID,
        'User-Name': username,
        'User-Secret': password,
      },
    },
  );
}

function sendMessage(activeChatId, message) {
  return axios.post(
    `${CHAT_ENGINE_BASE_URL}/chats/${activeChatId}/messages/`,
    { text: message },
    {
      headers: {
        'Project-ID': process.env.PROJECT_ID,
        'User-Name': process.env.BOT_USER_NAME,
        'User-Secret': process.env.BOT_USER_SECRET,
      },
    },
  );
}

export const chatEngineService = { createUser, createAiChat, sendMessage };
