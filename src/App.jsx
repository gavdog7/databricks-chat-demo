import { useState, useEffect, useRef } from 'react';
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
  const [storyVisibility, setStoryVisibility] = useState([false, false, false]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-start demo on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStep(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const storyData = [
    {
      title: "Global Logistics Leader",
      partner: "EPAM",
      partnerLogo: "/epam logo trimmed.png",
      metrics: [
        { value: "$10M+", label: "Savings" },
        { value: "3x", label: "Faster Routing" }
      ],
      description: "Replaced legacy systems → Now runs most efficient NA transport network"
    },
    {
      title: "Major Rail Operator", 
      partner: "Impetus",
      partnerLogo: "/Impetus logo trimmed.png",
      metrics: [
        { value: "30%", label: "Infra Cost ↓" },
        { value: "50%", label: "Faster Ops" },
        { value: "30%", label: "CO₂ ↓ by 2030" }
      ],
      description: "Modernized operations for unprecedented efficiency gains"
    },
    {
      title: "Supply Chain Giant",
      partner: "CGI", 
      partnerLogo: "/cgi trimmed.png",
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
      message: "I'm meeting with **FedEx** tomorrow. Show me Databricks success stories they'll love",
      delay: 0,
      showTyping: false
    },
    {
      type: 'bot',
      message: "I understand you're looking for stories relevant to **FedEx**. They're in Logistics/Shipping and face challenges with supply chain optimization and delivery efficiency.",
      delay: 0.7,
      showTyping: true
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
      delay: 1.3,
      showTyping: false
    },
    {
      type: 'bot',
      message: "Does that work?",
      delay: 2.3,
      showTyping: false
    },
    {
      type: 'user',
      message: "Yes! That would be great",
      delay: 3,
      showTyping: false
    },
    {
      type: 'stories',
      delay: 3.7,
      showTyping: true
    },
    {
      type: 'click',
      delay: 5.7
    },
    {
      type: 'restart',
      delay: 6.7
    }
  ];

  useEffect(() => {
    if (currentStep < conversationFlow.length) {
      const step = conversationFlow[currentStep];
      
      const timer = setTimeout(() => {
        if (step.type === 'stories') {
          if (step.showTyping) {
            setShowTyping(true);
            setTimeout(() => {
              setShowTyping(false);
              setShowStories(true);
              // Auto-scroll up to show stories
              setTimeout(() => {
                if (chatContainerRef.current) {
                  chatContainerRef.current.scrollTop = 0;
                }
              }, 100);
              // Show stories sequentially
              setTimeout(() => setStoryVisibility([true, false, false]), 67);
              setTimeout(() => setStoryVisibility([true, true, false]), 233);
              setTimeout(() => setStoryVisibility([true, true, true]), 400);
              setCurrentStep(prev => prev + 1);
            }, 2000);
          } else {
            setShowStories(true);
            // Auto-scroll up to show stories
            setTimeout(() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = 0;
              }
            }, 100);
            // Show stories sequentially
            setTimeout(() => setStoryVisibility([true, false, false]), 67);
            setTimeout(() => setStoryVisibility([true, true, false]), 233);
            setTimeout(() => setStoryVisibility([true, true, true]), 400);
            setCurrentStep(prev => prev + 1);
          }
          return;
        }

        if (step.type === 'click') {
          setSelectedStory(1); // Major Rail Operator
          setTimeout(() => setFadeOut(true), 500);
          setCurrentStep(prev => prev + 1);
          return;
        }

        if (step.type === 'restart') {
          resetDemo();
          return;
        }

        if (step.showTyping) {
          setShowTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, step]);
            setShowTyping(false);
            setCurrentStep(prev => prev + 1);
            // Auto-scroll to bottom, except for the "Yes!" message
            setTimeout(() => {
              if (chatContainerRef.current && step.message !== "Yes! That would be great") {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
              }
            }, 100);
          }, 2000);
        } else {
          setMessages(prev => [...prev, step]);
          setCurrentStep(prev => prev + 1);
          // Auto-scroll to bottom, except for the "Yes!" message
          setTimeout(() => {
            if (chatContainerRef.current && step.message !== "Yes! That would be great") {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }
        
      }, step.delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const resetDemo = () => {
    setMessages([]);
    setShowTyping(false);
    setCurrentStep(0);
    setShowStories(false);
    setStoryVisibility([false, false, false]);
    setSelectedStory(null);
    setFadeOut(false);
  };

  const handleStoryClick = (index) => {
    // This will be handled by the automatic flow
  };

  return (
    <div className="app">
      <header className="chat-header">
        <img src="/Databricks logo white.webp" alt="Databricks" className="databricks-logo" />
        <h1 className="header-title">Success Story Finder</h1>
      </header>
      
      <div className="chat-container" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.message}
              isUser={msg.type === 'user'}
              avatar={msg.type === 'user' ? "/Databricks AE face.png" : "/Databricks logo white.webp"}
              delay={0}
            />
          ))}
          
          {showTyping && (
            <TypingIndicator 
              avatar="/Databricks logo white.webp"
              delay={0}
            />
          )}
          
          {showStories && (
            <div className={`message bot ${fadeOut ? 'fade-out' : ''}`}>
              <img 
                src="/Databricks logo white.webp" 
                alt="AI Assistant" 
                className="message-avatar"
              />
              <div className="message-content">
                <div>Here are the most relevant success stories for **FedEx**:</div>
                <div className="story-cards">
                  {storyData.map((story, index) => (
                    <StoryCard 
                      key={index}
                      story={story}
                      delay={index * 0.05}
                      isVisible={storyVisibility[index]}
                      isSelected={selectedStory === index}
                      onClick={() => handleStoryClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}

export default App;