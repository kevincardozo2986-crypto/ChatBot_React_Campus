import { useState } from "react";

function ChatInput({ onSend, disabled, closed }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (disabled) return;

    const cleanText = text.trim();

    if (!cleanText) return;

    onSend(cleanText);
    setText("");
  };

  return (
    <footer className="chat-composer">
    <form
      className="chat-input"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        aria-label="Tu pregunta para el asistente"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={
          disabled
            ? closed ? "La sesión ha finalizado" : "El asistente está respondiendo..."
            : "Escribe tu pregunta..."
        }
        className="chat-input__field"
        disabled={disabled}
      />

      <button
        type="submit"
        className="chat-input__button"
        disabled={disabled || !text.trim()}
      >
        Enviar
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m5 12 14-7-4 14-3-7-7 0Z" />
          <path d="m12 12 7-7" />
        </svg>
      </button>
    </form>
    <p className="chat-composer__hint">
      {closed ? "Pulsa «Iniciar nueva sesión» para volver a conversar." : "Resuelve tus dudas sobre el Campus Virtual Santoto Tunja."}
    </p>
    </footer>
  );
}

export default ChatInput;
