import { openai } from '../index.js';

async function generateGptResponse(context, text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: context,
      },
      { role: 'user', content: text },
    ],
  });

  return response.choices[0].message.content;
}

async function generateGptAssistResponse(text) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
      },
      { role: 'user', content: `Finish my thought: ${text}` },
    ],
  });

  return response.choices[0].message.content;
}

export const openaiService = { generateGptResponse, generateGptAssistResponse };
