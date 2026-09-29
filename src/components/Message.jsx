import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import BotAvatar from "./BotAvatar";

function Message({ text, role }) {
  const isUser = role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "message-row--user" : "message-row--bot"
      }`}
    >
      {!isUser && (
        <BotAvatar />
      )}

      <div
        className={`message ${
          isUser ? "message--user" : "message--bot"
        }`}
      >
        {isUser ? (
          text
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default Message;
