import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  MessageCircle, 
  X, 
  Sparkles, 
  Lightbulb,
  TrendingUp,
  Search,
  Mic
} from "lucide-react";

const FloatingAIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai' as const,
      content: 'Hi! I\'m your AI shopping assistant. I can help you find the best products with honest reviews!',
      timestamp: new Date()
    }
  ]);

  const quickActions = [
    { icon: Search, label: 'Find Products', action: () => handleQuickAction('search') },
    { icon: TrendingUp, label: 'Best Deals', action: () => handleQuickAction('deals') },
    { icon: Lightbulb, label: 'Get Tips', action: () => handleQuickAction('tips') },
    { icon: Mic, label: 'Voice Search', action: () => handleQuickAction('voice') }
  ];

  const handleQuickAction = (action: string) => {
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        search: 'I can help you search for products! Try typing something like "Samsung phone under ₹30,000" in the search bar.',
        deals: 'I\'m constantly monitoring prices across marketplaces. I\'ll notify you when I find great deals!',
        tips: 'Here\'s a tip: Always check multiple reviews and compare prices across different stores for the best value.',
        voice: 'Voice search is available! Click the microphone icon in the search bar to start speaking.'
      };
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai' as const,
        content: responses[action as keyof typeof responses],
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Floating Button */}
      <Button
        onClick={toggleExpanded}
        className={`bg-brand-purple hover:bg-brand-purple-dark text-white p-4 rounded-full shadow-lg 
                   transition-all duration-300 hover:scale-110
                   ${isExpanded ? 'scale-110' : ''}`}
        aria-label="AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 
                      animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="bg-brand-purple text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">AI Assistant</span>
              <Badge variant="secondary" className="bg-brand-purple-light text-brand-purple text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Smart
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="text-white hover:bg-brand-purple-dark"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'ai'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-brand-purple text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs hover:bg-brand-purple hover:text-white transition-colors"
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingAIAssistant; 