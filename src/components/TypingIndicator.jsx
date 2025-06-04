import { motion } from 'framer-motion';

const TypingIndicator = ({ avatar, delay = 0 }) => {
  return (
    <motion.div
      className="message bot"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: "easeOut"
      }}
    >
      <img 
        src={avatar} 
        alt="AI Assistant" 
        className="message-avatar"
      />
      <div className="message-content">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;