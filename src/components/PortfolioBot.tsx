import { useState, useRef, useEffect } from 'react';
import intents from '../data/intents.json';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface Intent {
  keywords: string[];
  answer: string;
}

type IntentsData = Record<string, Intent>;

const FALLBACK_MESSAGE = "Hmm, I didn't quite catch that. 🤔 Try asking about my **skills**, **projects**, **experience**, **hobbies**, or how to **contact me**!";

const quickActions = [
  { label: 'Skills', query: 'What are your skills?' },
  { label: 'Experience', query: 'Tell me about your experience' },
  { label: 'Projects', query: 'What projects have you built?' },
  { label: 'Hobbies', query: 'What are your hobbies?' },
  { label: 'Contact', query: 'How can I contact you?' }
];

export default function PortfolioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hey! I'm Chase's AI assistant (well, not really AI—just clever keyword matching 😉). Ask me anything about skills, experience, projects, or just say hi!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (chatWindowRef.current?.contains(e.target as Node)) {
        e.stopPropagation();
      }
    };

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  const sanitizeInput = (input: string): string => {
    return input.toLowerCase().replace(/[^\w\s]/g, '');
  };

  const findBestMatch = (input: string): string => {
    const sanitized = sanitizeInput(input);
    const words = sanitized.split(/\s+/);
    
    const scores: Record<string, number> = {};
    const intentsTyped = intents as IntentsData;

    Object.keys(intentsTyped).forEach((intentKey) => {
      const intent = intentsTyped[intentKey];
      let score = 0;
      
      intent.keywords.forEach((keyword) => {
        if (words.includes(keyword)) {
          score += 2;
        } else if (sanitized.includes(keyword)) {
          score += 1;
        }
      });
      
      scores[intentKey] = score;
    });

    const bestMatch = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    return scores[bestMatch] > 0 ? intentsTyped[bestMatch].answer : FALLBACK_MESSAGE;
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = findBestMatch(text);
      const botMessage: Message = {
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickAction = (query: string) => {
    handleSendMessage(query);
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Window */}
      <div
        ref={chatWindowRef}
        className={`fixed bottom-8 right-8 w-[350px] h-[500px] bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 z-50 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="border-b border-black/10 dark:border-white/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <h3 className="text-sm font-medium text-black dark:text-white">Chat</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  message.isBot
                    ? 'bg-black/5 dark:bg-white/5 text-black dark:text-white'
                    : 'bg-black dark:bg-white text-white dark:text-black'
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(message.text) }}
                />
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t border-black/10 dark:border-white/10">
          <div className="flex gap-1.5 flex-wrap">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.query)}
                className="px-2.5 py-1 text-xs bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white rounded-md transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-black/10 dark:border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg focus:outline-none focus:border-black dark:focus:border-white text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-9 h-9 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
