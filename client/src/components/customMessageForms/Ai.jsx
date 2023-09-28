import React, { useState } from 'react';
import { MessageFormUi } from './MessageFormUi';
import { usePostAiTextMutation } from '@/state/api';
import { getDate } from '@/utils/getDate';

export const Ai = ({ props, activeChat }) => {
  const [message, setMessage] = useState('');
  const [attachment, setAttachments] = useState('');
  const [trigger] = usePostAiTextMutation();

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <MessageFormUi
      message={message}
      setAttachments={setAttachments}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyDown}
    />
  );
};
