import React, { useState } from 'react';
import { MessageFormUi } from './MessageFormUi';
import { usePostAiCodeMutation } from '@/state/api';

const getDate = (date) => {
  const newDate = date
    .toISOString()
    .replace('T', ' ')
    .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`);

  return newDate;
};

export const AiCode = ({ props, activeChat }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachments] = useState('');
  const [trigger] = usePostAiCodeMutation();

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
    trigger(form);
    setMessage('');
    setAttachments('');
  };
  return (
    <MessageFormUi
      message={message}
      setAttachments={setAttachments}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
