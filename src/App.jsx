import { useEffect, useRef, useState } from "react";

import ChatHeader from "./components/ChatHeader";
import QuickQuestions from "./components/QuickQuestions";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import ChatMascot from "./components/ChatMascot";

import { sendMessageToAI } from "./services/aiService";

import "./styles/chat.css";
import "./styles/campus.css";
import robot from "./assets/robot-santoto.png";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text:"¡Hola! Soy el asistente virtual del Campus Virtual Santoto Tunja. Para comenzar, puedo ayudarte con el acceso al Campus, tareas, calificaciones y soporte.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [chatClosed, setChatClosed] = useState(false);

  const inactivityTimer = useRef(null);

  // ==============================
  // TEMPORIZADOR DE INACTIVIDAD
  // ==============================

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: Date.now(),
          role: "bot",
          text: "⏳ Chat cerrado por inactividad. Por favor, recarga la página para iniciar una nueva sesión.",
        },
      ]);

      setChatClosed(true);
    }, 2 * 60 * 1000);
  };

  // Iniciar temporizador al cargar el chat
  useEffect(() => {
    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer.current);
    };
  }, []);

  // ==============================
  // ENVIAR MENSAJE
  // ==============================

  const sendMessage = async (text) => {
    if (chatClosed || loading) return;

    // Reiniciar tiempo de inactividad
    resetInactivityTimer();

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
    };

    // Historial antes del nuevo mensaje
    const previousMessages = messages;

    // Mostrar mensaje del usuario
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setLoading(true);

    try {
      // Consultar IA
      const reply = await sendMessageToAI(
        text,
        previousMessages
      );

      const botMessage = {
        id: Date.now() + 1,
        role: "bot",
        text: reply,
      };

      // Mostrar respuesta del bot
      setMessages((currentMessages) => [
        ...currentMessages,
        botMessage,
      ]);

    } catch (error) {
      console.error("Error al consultar la IA:", error);

      const errorMessage = {
        id: Date.now() + 1,
        role: "bot",
        text: "No pude conectarme con el asistente en este momento. Intenta nuevamente.",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        errorMessage,
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="chat-page">
      <div className="chat-stage">
      <ChatMascot closed={chatClosed} loading={loading} />
      <section className="chat-container">

        <ChatHeader closed={chatClosed} loading={loading} />

        <QuickQuestions
          onQuestion={sendMessage}
          disabled={chatClosed || loading}
        />

        {chatClosed ? <section className="session-ended" aria-labelledby="session-ended-title">
          <div className="session-ended__portrait"><img src={robot} alt="" /></div>
          <h2 id="session-ended-title">La sesión ha finalizado</h2>
          <p>El chat se cerró después de un período de inactividad.</p>
          <p className="session-ended__muted">Puedes iniciar una nueva sesión para seguir recibiendo ayuda.</p>
          <button className="session-ended__restart" type="button" onClick={() => window.location.reload()}><span aria-hidden="true">↻</span> Iniciar nueva sesión <span aria-hidden="true">→</span></button>
          <span className="session-ended__note">Estamos aquí para acompañarte.</span>
        </section> : <ChatMessages messages={messages} loading={loading} />}

        <ChatInput
          onSend={sendMessage}
          disabled={chatClosed || loading}
          closed={chatClosed}
        />

      </section>
      </div>
    </main>
  );
}

export default App;
