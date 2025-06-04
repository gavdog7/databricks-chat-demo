import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import StoryCard from './components/StoryCard';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showStories, setShowStories] = useState(false);

  const storyData = [
    {
      title: "Global Logistics Leader",
      partner: "EPAM",
      partnerLogo: "/epam logo.png",
      metrics: [
        { value: "$10M+", label: "Savings" },
        { value: "3x", label: "Faster Routing" }
      ],
      description: "Replaced legacy systems → Now runs most efficient NA transport network"
    },
    {
      title: "Major Rail Operator", 
      partner: "Impetus",
      partnerLogo: "/Impetus logo.png",
      metrics: [
        { value: "30%", label: "Infra Cost ↓" },
        { value: "50%", label: "Faster Ops" },
        { value: "30%", label: "CO₂ ↓ by 2030" }
      ],
      description: "Modernized operations for unprecedented efficiency gains"
    },
    {
      title: "Supply Chain Giant",
      partner: "Lovelytics", 
      partnerLogo: "/lovelytics logo.png",
      metrics: [
        { value: "50K+", label: "Daily Shipments" },
        { value: "1,000+", label: "Users Enabled" }
      ],
      description: "Unified platform data & AI platform → Democratized analytics with real-time tracking"
    }
  ];

  const conversationFlow = [
    {
      type: 'user',
      message: "I'm meeting with FedEx tomorrow. Show me Databricks success stories they'll love",
      delay: 0
    },
    {
      type: 'bot',
      message: "I understand you're looking for stories relevant to FedEx. They're in Logistics/Shipping and face challenges with supply chain optimization and delivery efficiency.",
      delay: 2
    },
    {
      type: 'bot', 
      message: {
        text: "I suggest searching for success stories in:",
        bullets: [
          "Logistics innovation",
          "Shipping tech", 
          "Supply chain management"
        ]
      },
      delay: 4
    },
    {
      type: 'bot',
      message: "Does that work?",
      delay: 7
    },
    {
      type: 'user',
      message: "Yes! That would be great",
      delay: 9
    },
    {
      type: 'stories',
      delay: 11
    }
  ];

  useEffect(() => {
    if (currentStep < conversationFlow.length) {
      const step = conversationFlow[currentStep];
      
      const timer = setTimeout(() => {
        if (step.type === 'stories') {
          setShowStories(true);
          return;
        }

        setShowTyping(true);
        
        setTimeout(() => {
          setMessages(prev => [...prev, step]);
          setShowTyping(false);
          setCurrentStep(prev => prev + 1);
        }, 2000);
        
      }, step.delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const resetDemo = () => {
    setMessages([]);
    setShowTyping(false);
    setCurrentStep(0);
    setShowStories(false);
  };

  return (
    <div className="app">
      <header className="chat-header">
        <img src="/Databricks logo white.webp" alt="Databricks" className="databricks-logo" />
        <h1 className="header-title">AI Assistant</h1>
      </header>
      
      <div className="chat-container">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.message}
              isUser={msg.type === 'user'}
              avatar={msg.type === 'user' ? "/Databricks AE face.png" : "/Databricks AE face.png"}
              delay={0}
            />
          ))}
          
          {showTyping && (
            <TypingIndicator 
              avatar="/Databricks AE face.png"
              delay={0}
            />
          )}
          
          {showStories && (
            <div className="message bot">
              <img 
                src="/Databricks AE face.png" 
                alt="AI Assistant" 
                className="message-avatar"
              />
              <div className="message-content">
                <div>Here are the most relevant success stories for FedEx:</div>
                <div className="story-cards">
                  {storyData.map((story, index) => (
                    <StoryCard 
                      key={index}
                      story={story}
                      delay={index * 0.5}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      
      <button className="replay-button" onClick={resetDemo}>
        ↻ Replay Demo
      </button>
    </div>
  );
}

export default App;