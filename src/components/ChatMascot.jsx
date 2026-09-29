import robot from "../assets/robot-santoto.png";
import logo from "../assets/Logo_Blanco2.png";

function ChatMascot({ closed, loading }) {
  return (
    <aside className="chat-mascot" aria-label="Bienvenida al Campus Virtual">
      <img className="welcome-logo" src={logo} alt="Universidad Santo Tomás · Campus Virtual" />
      <div className="welcome-copy">
        <p className="welcome-eyebrow">SANTOTO TUNJA</p>
        <h2>¡Hola!<br />Soy tu <span>asistente virtual</span></h2>
        <p>Estoy aquí para ayudarte con el acceso al Campus, tareas, calificaciones y soporte.</p>
      </div>
      <div className="welcome-character" aria-hidden="true">
        <span className="chat-mascot__greeting">{closed ? "¡Hasta pronto! Te espero cuando vuelvas 💛" : loading ? "Déjame pensar…" : "¿En qué puedo ayudarte hoy?"}</span>
        <img className="chat-mascot__robot" src={robot} alt="" />
      </div>
      <p className="welcome-footer">Tu Campus, más cerca de ti.</p>
    </aside>
  );
}
export default ChatMascot;
