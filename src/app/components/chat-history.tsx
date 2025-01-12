import { FaUser, FaRobot } from "react-icons/fa";
import { LoadingIndicator } from "./loading-indicator";

type ChatHistoryProps = {
  messages: Message[];
  isLoading: boolean;
};

export const ChatHistory = ({ messages, isLoading }: ChatHistoryProps) => (
  <div className="h-full w-full py-20 flex flex-col items-start justify-items-stretch gap-6 overflow-y-scroll">
    {messages.map((message, idx) => {
      const isUser = message.sender === "user";
      return (
        <div
          key={idx}
          className={`flex gap-4 w-full ${
            isUser
              ? "flex-row-reverse justify-items-end"
              : "justify-items-start"
          }`}
        >
          {isUser ? <FaUser size={28} /> : <FaRobot size={28} />}
          <p
            className={`w-4/5 py-2 px-3 rounded-3xl text-white ${
              message.sender === "user"
                ? "bg-highlight rounded-tr-none"
                : "bg-gray-400 rounded-tl-none"
            }`}
          >
            {message.text}
          </p>
        </div>
      );
    })}
    {isLoading && <LoadingIndicator />}
  </div>
);
