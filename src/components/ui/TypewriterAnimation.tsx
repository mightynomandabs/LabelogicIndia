import { useState, useEffect } from 'react';

const messages = [
  "Your Smart Shopping Assistant",
  "Find the Perfect Product",
  "Honest Reviews & Best Prices",
  "AI-Powered Recommendations"
];

export default function TypewriterAnimation() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation logic
  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    console.log('Current state:', { currentMessageIndex, displayedText: displayedText.length, messageLength: currentMessage.length, isTyping });
    
    // Add safety check
    if (!currentMessage) return;
    
    if (isTyping && displayedText.length < currentMessage.length) {
      // Type next character after 150ms
      const timeout = setTimeout(() => {
        setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === currentMessage.length && isTyping) {
      console.log('Message complete, moving to next...');
      // Message complete - wait 3 seconds, then move to next
      const timeout = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setDisplayedText('');
        setIsTyping(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentMessageIndex, isTyping]);

  // Cursor blinking every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
        <span className="font-mono bg-gradient-to-r from-brand-purple to-brand-purple-dark bg-clip-text text-transparent">
          {displayedText}
          {isTyping && (
            <span 
              className={`inline-block w-1 h-8 md:h-10 lg:h-12 bg-brand-purple ml-2 ${
                showCursor ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-100`}
            />
          )}
        </span>
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-brand-black/80 max-w-4xl mx-auto leading-relaxed font-medium">
        Find the perfect product with honest reviews and the best prices across Indian marketplaces
      </p>
      <div className="mt-6 flex items-center justify-center gap-4 text-sm md:text-base text-brand-black/60">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Trusted by 50,000+ users
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Real-time price tracking
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          AI-powered insights
        </span>
      </div>
    </div>
  );
} 