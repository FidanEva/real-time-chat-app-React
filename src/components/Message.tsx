import React from "react";

type MessageProps = {
  avatarSrc: string;
  userName: string;
  message: string;
};

const Message: React.FC<MessageProps> = ({ avatarSrc, userName, message }) => {
  return (
    <div className={`chat-bubble`}>
      <img className="chat-bubble__left" src={avatarSrc} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{userName}</p>
        <p className="user-message">{message}</p>
      </div>
    </div>
  );
};

export default Message;
