const questions = [
  {
    id: 1,
    title: "Ingreso Campus",
    question: "¿Cómo ingreso al Campus Virtual?",
  },
  {
    id: 2,
    title: "Subir tarea",
    question: "¿Cómo puedo subir una tarea?",
  },
  {
    id: 3,
    title: "Ver notas",
    question: "¿Cómo puedo consultar mis notas?",
  },
  {
    id: 4,
    title: "Soporte",
    question: "Necesito ayuda con el Campus Virtual",
  },
];

function QuickQuestions({ onQuestion, disabled }) {
  return (
    <div className="quick-questions">
      <p className="quick-questions__title">
        Preguntas frecuentes
      </p>

      <div className="quick-questions__list">
        {questions.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            className="quick-question"
            onClick={() => onQuestion(item.question)}
          >
            <span className={`question-icon question-icon--${item.id}`} aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {item.id === 1 ? <path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7q6 5 12 0v-7M22 8v8" /> : item.id === 2 ? <path d="M9 5H5v16h14V5h-4M9 3h6v4H9zM8 12h8M8 16h6" /> : item.id === 3 ? <path d="M5 3h14v18H5zM9 8h6M9 12h6M9 16h3" /> : <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v7h4v-7H4Zm16 0h2v7h-4v-7h2ZM20 19q0 3-8 3" />}
              </svg>
            </span>
            <span className="question-copy"><strong>{item.title}</strong><small>{["¿Cómo ingreso?", "Guía paso a paso", "Consulta tus calificaciones", "Te ayudamos"][item.id - 1]}</small></span>
            <span className="question-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickQuestions;
