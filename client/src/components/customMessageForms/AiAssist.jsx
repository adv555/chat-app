import React, { useEffect, useState } from 'react';
import { MessageFormUi } from './MessageFormUi';
import { usePostAiAssistMutation } from '@/state/api';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const getDate = (date) => {
  const newDate = date
    .toISOString()
    .replace('T', ' ')
    .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);

  return newDate;
};

export const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachments] = useState('');
  const [appendText, setAppendText] = useState('');
  const [trigger, resultAssist] = usePostAiAssistMutation();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    const date = getDate(new Date());
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];

    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    // trigger(form);
    setMessage('');
    setAttachments('');
  };

  const debouncedValue = useDebounce(message, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      trigger(form);
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (event) => {
    // handle enter and tab
    if (event.keyCode === 13 || event.keyCode === 9) {
      event.preventDefault();
      setMessage(`${message} ${appendText}`);
    }

    setAppendText('');
  };

  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MessageFormUi
      message={message}
      setAttachments={setAttachments}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};
