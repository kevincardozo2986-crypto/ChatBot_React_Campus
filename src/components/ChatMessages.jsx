import { useEffect, useRef } from "react";
import Message from "./Message";
import BotAvatar from "./BotAvatar";

function ChatMessages({ messages, loading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "nearest",
    });
  }, [messages, loading]);

  return (
    <div className="chat-messages-backdrop">
    <div className="chat-messages" role="log" aria-label="Conversación con el asistente" aria-live="polite">
      <div className="chat-messages__divider" aria-hidden="true">Tu espacio de ayuda</div>
      {messages.map((message) => (
        <Message
          key={message.id}
          text={message.text}
          role={message.role}
        />
      ))}

      {loading && (
        <div className="message-row message-row--bot">
          <BotAvatar />

          <div className="typing-indicator" role="status" aria-label="El asistente está escribiendo">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
    </div>
  );
}

export default ChatMessages;
