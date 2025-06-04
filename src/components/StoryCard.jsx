import { motion } from 'framer-motion';

const StoryCard = ({ story, delay = 0, isVisible, isSelected, onClick }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className={`story-card ${isSelected ? 'selected' : ''}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: isSelected ? 0.7 : 1, 
        y: 0, 
        scale: isSelected ? 1.02 : 1,
        backgroundColor: isSelected ? '#374151' : undefined
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      onClick={onClick}
    >
      <div className="story-header">
        <div className="story-title">{story.title}</div>
        <div className="partner-logo-container">
          <img 
            src={story.partnerLogo} 
            alt={`${story.partner} logo`} 
            className="partner-logo"
          />
        </div>
      </div>
      
      <div className="story-metrics">
        {story.metrics.map((metric, index) => (
          <div key={index} className="metric">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
      
      <div className="story-description">
        {story.description}
      </div>
    </motion.div>
  );
};

export default StoryCard;