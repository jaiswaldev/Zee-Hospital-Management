import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeleton/MessageSkeleton";
import { formatMessageTime } from "../../lib/utils";

import useDoctorChat from "../../context/DoctorChatContext";
import usePatientChat from "../../context/PatientChatContext";

const ChatContainer = ({
  authUserId,
  selectedUser,
  setSelectedUser, // <-- Accept as prop
  role, // "doctor" or "patient"
  onlineUserIds = [],
}) => {
  const messageEndRef = useRef(null);

  const chatStore = role === "doctor" ? useDoctorChat() : usePatientChat();
  const {
    messagesByPatient,
    messagesByDoctor,
    getMessages,
    isMessagesLoading,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = chatStore;

  const messages =
    role === "doctor"
      ? messagesByPatient[selectedUser?._id] || []
      : messagesByDoctor[selectedUser?._id] || [];
      
  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!authUserId) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Loading chat...
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Please select a user to start chatting.
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader selectedUser={selectedUser} setSelectedUser={setSelectedUser} onlineUserIds={onlineUserIds} />
        <MessageSkeleton />
        <MessageInput onSendMessage={sendMessage} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader selectedUser={selectedUser} setSelectedUser={setSelectedUser} onlineUserIds={onlineUserIds} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((msg) => {
          const isOwnMessage =
            msg.senderId?.toString() === authUserId?.toString();
          return (
            <div
              key={msg._id}
              className={`flex ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-xl shadow text-sm break-words ${
                  isOwnMessage
                    ? "bg-green-100 text-black rounded-br-none"
                    : "bg-white text-black rounded-bl-none"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Attachment"
                    className="mb-2 rounded-md max-w-full"
                  />
                )}
                {msg.text && <div>{msg.text}</div>}
                <div className="text-[10px] text-gray-500 text-right mt-1 cursor-default">
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
