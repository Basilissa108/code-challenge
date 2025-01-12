"use client";
import { useState } from "react";
import { ChatInput } from "./components/chat-input";
import { ChatHistory } from "./components/chat-history";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data }]);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err.message || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="h-full w-3/5 max-w-2xl flex flex-col gap-8 row-start-2 items-center">
        <ChatHistory messages={messages} isLoading={isLoading} />
        <ChatInput
          label="Your message:"
          placeholder="What can I help you with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
}
