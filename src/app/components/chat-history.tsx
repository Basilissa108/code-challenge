import { FaUser, FaRobot } from "react-icons/fa";
import { LoadingIndicator } from "./loading-indicator";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import remarkGfm from "remark-gfm";

type CustomRendererProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const customRenderers = {
  a: ({ href, children }: CustomRendererProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-highlight underline"
    >
      {children}
    </a>
  ),
};

type ChatHistoryProps = {
  messages: Message[];
  isLoading: boolean;
};

export const ChatHistory = ({ messages, isLoading }: ChatHistoryProps) => (
  <div className="h-screen w-full pb-48 px-4 flex flex-col items-start justify-items-stretch gap-6 overflow-y-scroll">
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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={customRenderers}
            className={`w-4/5 py-2 px-3 rounded-3xl whitespace-pre-wrap break-words ${
              message.sender === "user"
                ? "bg-highlight rounded-tr-none text-white"
                : "bg-gray-200 rounded-tl-none text-black"
            }`}
          >
            {DOMPurify.sanitize(message.text)}
          </ReactMarkdown>
        </div>
      );
    })}
    {isLoading && <LoadingIndicator />}
  </div>
);
