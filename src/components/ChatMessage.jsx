import { motion } from 'framer-motion';

const ChatMessage = ({ message, isUser, avatar, delay = 0 }) => {
  return (
    <motion.div
      className={`message ${isUser ? 'user' : 'bot'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut"
      }}
    >
      <img 
        src={avatar} 
        alt={isUser ? "User" : "AI Assistant"} 
        className="message-avatar"
      />
      <div className="message-content">
        {typeof message === 'string' ? (
          <span dangerouslySetInnerHTML={{ 
            __html: message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
        ) : (
          <div>
            {message.text}
            {message.bullets && (
              <ul className="bullet-list">
                {message.bullets.map((bullet, index) => (
                  <li key={index}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;