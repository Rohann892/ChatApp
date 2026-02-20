import React from "react";

const Message = ({ message }) => {
  return (
    <>
      {" "}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">
            {message?.createdAt
              ? new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    </>
  );
};

export default Message;
