import { TRAINING_CONTEXT } from "../config/trainingContext";

export async function sendMessageToAI(message, history = []) {
  const formattedHistory = history.map((item) => ({
    role: item.role === "bot" ? "assistant" : "user",
    content: item.text,
  }));

  const messages = [
    {
      role: "system",
      content: TRAINING_CONTEXT,
    },
    ...formattedHistory,
    {
      role: "user",
      content: message,
    },
  ];

  const response = await fetch("https://chatia-two.vercel.app/api/deepseek", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: 0.5,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    console.error("Error de la API:", error);

    throw new Error(
      error.error || "No se pudo obtener respuesta del asistente.",
    );
  }

  const data = await response.json();

  return (
    data.choices?.[0]?.message?.content ||
    "No se recibió una respuesta válida del asistente."
  );
}
