import { useState } from 'react';
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import Dropzone from 'react-dropzone';

export const MessageFormUi = ({
  setAttachments,
  message,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const [preview, setPreview] = useState('');

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            alt="message-form-preview"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XCircleIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview('');
              setAttachments('');
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />

          {appendText && (
            <input
              className="message-form-assist"
              type="text"
              disabled
              value={`${message} ${appendText}`}
            />
          )}
        </div>
        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.webp"
            multiple={false}
            onClick={true}
            onDrop={(acceptedFiles) => {
              setAttachments(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()} onClick={(e) => e.stopPropagation()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview('');
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};
