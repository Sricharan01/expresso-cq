// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Send } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { useTheme } from "./ThemeProvider";
// import axios from 'axios';

// interface ChatPageProps {
//   userName: string;
//   userId: string;
//   nickname: string;
//   onChatComplete: () => void;
//   onNavigate?: (page: string) => void;
//   messages?: Message[];
//   onUpdateMessages?: (messages: Message[]) => void;
// }

// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
// }

// export function ChatPage({ userName, userId, nickname, onChatComplete, onNavigate, messages: propMessages, onUpdateMessages }: ChatPageProps) {
//   const { selectedColor } = useTheme();
//   const [messages, setMessages] = useState<Message[]>(
//     propMessages && propMessages.length > 0 
//       ? propMessages 
//       : [
//           {
//             id: '1',
//             text: `Hello ${nickname}! I'm here to listen and support you. How are you feeling today?`,
//             isBot: true,
//             timestamp: new Date()
//           }
//         ]
//   );
//   const [inputValue, setInputValue] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto scroll to bottom when new messages arrive
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputValue,
//       isBot: false,
//       timestamp: new Date()
//     };

//     const newMessages = [...messages, userMessage];
//     setMessages(newMessages);
//     if (onUpdateMessages) {
//       onUpdateMessages(newMessages);
//     }
//     setInputValue('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/chat', {
//         message: inputValue,
//         history: messages.filter(msg => msg.id !== '1').map(msg => ({ role: msg.isBot ? 'model' : 'user', parts: [{ text: msg.text }] })),
//         nickname,
//       });

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: response.data.message,
//         isBot: true,
//         timestamp: new Date()
//       };

//       const updatedMessages = [...newMessages, botMessage];
//       setMessages(updatedMessages);
//       if (onUpdateMessages) {
//         onUpdateMessages(updatedMessages);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   const handleEndChat = async () => {
//     setIsAnalyzing(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/chat/summary', {
//         history: messages.map(msg => ({ role: msg.isBot ? 'model' : 'user', parts: [{ text: msg.text }] })),
//         userId,
//       });
//       console.log('Chat summary:', response.data);
//       onChatComplete();
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       setIsAnalyzing(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Analysis Loading Screen
//   if (isAnalyzing) {
//     // Simulate analysis time then redirect
//     setTimeout(() => {
//       onChatComplete();
//     }, 3000);

//     return (
//       <div className="min-h-screen bg-white text-black flex items-center justify-center">
//         <div className="text-center space-y-6 max-w-md">
//           <div className="w-16 h-16 mx-auto flex items-center justify-center">
//             <div 
//               className="w-12 h-12 rounded-full animate-pulse"
//               style={{ 
//                 backgroundColor: selectedColor,
//                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, scale 2s ease-in-out infinite'
//               }}
//             ></div>
//           </div>
//           <div className="space-y-2">
//             <h2 className="text-xl">Analyzing our conversation...</h2>
//             <p className="text-gray-600">
//               I'm processing your thoughts and preparing personalized insights for you.
//             </p>
//           </div>
//         </div>
//         <style>{`
//           @keyframes scale {
//             0%, 100% {
//               transform: scale(1);
//             }
//             50% {
//               transform: scale(1.2);
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen bg-white text-black flex flex-col">
//       {/* Header - Fixed */}
//       <header className="flex items-center justify-center p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
//         <div className="flex items-center space-x-2">
//           <div 
//             className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
//             style={{ backgroundColor: selectedColor }}
//           >
//             <span className="text-white text-xs sm:text-sm">M</span>
//           </div>
//           <span className="text-xs sm:text-sm">MindSpace</span>
//         </div>
//       </header>

//       {/* Main Chat Area - Mobile responsive */}
//       <div className="flex flex-1 min-h-0">
//         {/* Left spacer - Desktop only */}
//         <div className="hidden lg:block lg:w-1/5"></div>
        
//         {/* Chat Content - Full width on mobile, 60% on desktop */}
//         <div className="w-full lg:w-3/5 flex flex-col min-h-0">
//           {/* Messages - Mobile: no scroll, Desktop: scroll */}
//           <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 lg:overflow-y-auto overflow-y-visible">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
//               >
//                 <div
//                   className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
//                     message.isBot
//                       ? 'bg-gray-100 text-black'
//                       : 'text-white'
//                   }`}
//                   style={{
//                     backgroundColor: message.isBot ? '#f3f4f6' : selectedColor
//                   }}
//                 >
//                   <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
//                   <p className={`text-xs mt-1 ${
//                     message.isBot ? 'text-gray-500' : 'text-gray-200'
//                   }`}>
//                     {message.timestamp.toLocaleTimeString([], { 
//                       hour: '2-digit', 
//                       minute: '2-digit' 
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area - Fixed at bottom */}
//           <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-shrink-0 border-t border-gray-200">
//             <div className="flex space-x-2">
//               <Input
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-0"
//                 style={{ borderColor: selectedColor }}
//               />
//               <Button
//                 onClick={handleSendMessage}
//                 disabled={!inputValue.trim()}
//                 className="text-white px-3 sm:px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: selectedColor }}
//               >
//                 <Send className="w-3 h-3 sm:w-4 sm:h-4" />
//               </Button>
//             </div>
            
//             <div className="flex justify-center">
//               <Button
//                 onClick={handleEndChat}
//                 variant="outline"
//                 className="border-red-500 text-red-500 hover:bg-red-50 px-4 sm:px-6 py-2 text-sm"
//               >
//                 End Chat
//               </Button>
//             </div>
//           </div>
//         </div>
        
//         {/* Right spacer - Desktop only */}
//         <div className="hidden lg:block lg:w-1/5"></div>
//       </div>
//     </div>
//   );
// }
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface Summary {
  summary: string;
  keyInsights: string | string[];
  currentMood: string;
  gentleSuggestion: string;
}

interface ChatPageProps {
  userName: string;
  userId: string;
  nickname: string;
  messages: Message[];
  onUpdateMessages: (messages: Message[]) => void;
  onSummaryGenerated: (summary: Summary) => void;
  // --- CHANGE: Add userMood to the interface to fix the TypeScript error ---
  userMood?: string;
}

// Helper function to create a dynamic welcome message
const generateWelcomeMessage = (nickname: string, mood?: string): string => {
    if (mood) {
        switch (mood.toLowerCase()) {
            case 'great':
            case 'good':
                return `Hello ${nickname}! It's wonderful to hear you're feeling ${mood.toLowerCase()} today. What's making your day so bright?`;
            case 'okay':
                return `Hi ${nickname}. Thanks for checking in. Sometimes 'okay' is a perfectly fine place to be. Is there anything you'd like to talk about?`;
            case 'not great':
            case 'rough':
                return `Hi ${nickname}, I'm sorry to hear you're having a ${mood.toLowerCase()} day. Remember, it's okay not to be okay. I'm here to listen without any judgment whenever you're ready.`;
            default:
                break; // Fall through for empty mood string (if user skips)
        }
    }
    // Default message for new users or if mood is skipped
    return `Hello ${nickname}! I'm here to listen and support you. How are you feeling today?`;
};

export function ChatPage({ userName, userId, nickname, messages, onUpdateMessages, onSummaryGenerated, userMood }: ChatPageProps) {
  const { selectedColor } = useTheme();
  
  const [currentMessages, setCurrentMessages] = useState<Message[]>(
    messages.length > 0
      ? messages
      : [
          {
            id: '1',
            text: generateWelcomeMessage(nickname, userMood),
            isBot: true,
            timestamp: new Date()
          }
        ]
  );
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);
  
  useEffect(() => {
    onUpdateMessages(currentMessages);
  }, [currentMessages, onUpdateMessages]);


  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    
    const newMessages = [...currentMessages, userMessage];
    setCurrentMessages(newMessages);
    setInputValue('');

    try {
      const historyForAPI = newMessages
        .filter(msg => msg.id !== '1') // Exclude the initial welcome message from history
        .map(msg => ({ 
            role: msg.isBot ? 'model' : 'user', 
            parts: [{ text: msg.text }] 
        }));

      const response = await axios.post('http://localhost:5000/api/chat', {
        message: inputValue,
        history: historyForAPI,
        nickname,
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.message,
        isBot: true,
        timestamp: new Date()
      };
      
      setCurrentMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setCurrentMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const handleEndChat = async () => {
    setIsAnalyzing(true);
    try {
      const historyForAPI = currentMessages
        .filter(msg => msg.id !== '1')
        .map(msg => ({ 
            role: msg.isBot ? 'model' : 'user', 
            parts: [{ text: msg.text }] 
        }));

      const response = await axios.post('http://localhost:5000/api/chat/summary', {
        history: historyForAPI,
        userId,
      });
      
      onSummaryGenerated(response.data);

    } catch (error) {
      console.error('Error generating summary:', error);
      alert("There was an error generating your summary. Please try ending the chat again.");
      setIsAnalyzing(false);
    }
  };
  
   const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto flex items-center justify-center">
            <div 
              className="w-12 h-12 rounded-full animate-pulse"
              style={{ 
                backgroundColor: selectedColor,
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, scale 2s ease-in-out infinite'
              }}
            ></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl">Analyzing our conversation...</h2>
            <p className="text-gray-600">
              I'm processing your thoughts and preparing personalized insights for you.
            </p>
          </div>
        </div>
        <style>{`
          @keyframes scale {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.2);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white text-black flex flex-col">
      <header className="flex items-center justify-center p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedColor }}>
            <span className="text-white text-xs sm:text-sm">M</span>
          </div>
          <span className="text-xs sm:text-sm">MindSpace</span>
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        <div className="hidden lg:block lg:w-1/5"></div>
        <div className="w-full lg:w-3/5 flex flex-col min-h-0">
          <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto">
            {currentMessages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                    message.isBot ? 'bg-gray-100 text-black' : 'text-white'
                  }`}
                  style={{ backgroundColor: message.isBot ? '#f3f4f6' : selectedColor }}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 text-right ${ message.isBot ? 'text-gray-500' : 'text-gray-200' }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-shrink-0 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-0"
                style={{ borderColor: selectedColor }}
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()} className="text-white px-3 sm:px-4 py-2 disabled:bg-gray-300 disabled:cursor-not-allowed" style={{ backgroundColor: selectedColor }}>
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleEndChat} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 px-4 sm:px-6 py-2 text-sm">
                End Chat
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/5"></div>
      </div>
    </div>
  );
}
