
function ChatHeader({ closed, loading }) {
  return (
    <header className="chat-header">

      <div className="chat-header__info">
        <h1>Asistente Virtual</h1>
        <p>Campus Virtual Santoto Tunja</p>
      </div>
      <span className={`chat-header__status${closed ? " chat-header__status--closed" : ""}`} role="status">
        <span aria-hidden="true" />
        {closed ? "Sesión cerrada" : loading ? "Respondiendo" : "Sesión activa"}
      </span>
    </header>
  );
}

export default ChatHeader;
