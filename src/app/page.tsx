"use client";
import { useState, useEffect, useRef } from "react";
import { ChatInput } from "./components/chat-input";
import { ChatHistory } from "./components/chat-history";
import { ErrorMessage } from "./components/error-message";

export default function Home() {
  const controllerRef = useRef<AbortController>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const handleSubmit = async () => {
    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setMessage("");
    setIsLoading(true);
    setHasError(false);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
        signal: controllerRef.current.signal,
      });

      if (!res.ok) {
        setHasError(true);
        setIsLoading(false);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data }]);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      if (err.name !== "AbortError") {
        setHasError(true);
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screenfont-[family-name:var(--font-geist-sans)]">
      <main className="h-screen w-3/5 max-w-2xl flex flex-col gap-8 row-start-2 items-center">
        {hasError && <ErrorMessage />}
        <h1 className="my-12 text-4xl font-bold text-highlight">
          What can I help you with?
        </h1>
        <ChatHistory messages={messages} isLoading={isLoading} />
        <ChatInput
          label="Your message:"
          placeholder="What can I help you with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSubmit={handleSubmit}
          onCancel={() =>
            controllerRef.current && controllerRef.current.abort()
          }
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
