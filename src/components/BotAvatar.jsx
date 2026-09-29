import robot from "../assets/robot-santoto.png";

function BotAvatar() {
  return (
    <span className="bot-avatar" role="img" aria-label="Asistente virtual Santoto Tunja">
      <img src={robot} alt="" />
    </span>
  );
}

export default BotAvatar;
