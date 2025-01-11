import { FaUser, FaRobot } from "react-icons/fa";

type ChatHistoryProps = {
  messages: Message[];
};

export const ChatHistory = ({ messages }: ChatHistoryProps) => (
  <div className="h-full w-full flex flex-col overflow-y-scroll">
    {messages.map((message, idx) => {
      const isUser = message.sender === "user";
      return (
        <div
          key={idx}
          className={`flex mb-2 gap-3 ${
            isUser
              ? "flex-row-reverse justify-items-end"
              : "justify-items-start"
          }`}
        >
          {isUser ? <FaUser size={28} /> : <FaRobot size={28} />}
          <p
            className={`py-2 px-3 rounded-3xl text-white ${
              message.sender === "user"
                ? "bg-blue-500 rounded-tr-none"
                : "bg-gray-400 rounded-tl-none"
            }`}
          >
            {message.text}
          </p>
        </div>
      );
    })}
  </div>
);
