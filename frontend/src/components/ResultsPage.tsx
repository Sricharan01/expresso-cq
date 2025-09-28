// import { Button } from "./ui/button";
// import { Menu, X, Home, Heart, Compass, GamepadIcon, Users, BookOpen, BarChart3, Info, LogOut } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useTheme } from "./ThemeProvider";
// import axios from 'axios';

// interface ResultsPageProps {
//   userName: string;
//   userId: string;
//   onNavigate: (page: string) => void;
// }

// interface InsightData {
//   title: string;
//   content: string;
// }

// export function ResultsPage({ userName, userId, onNavigate }: ResultsPageProps) {
//   const { selectedColor } = useTheme();
//   const [selectedInsight, setSelectedInsight] = useState<InsightData | null>(null);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [insights, setInsights] = useState<InsightData[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummary = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/user/${userId}/latest-summary`);
//         const { keyInsights, currentMood, gentleSuggestion } = response.data;
//         setInsights([
//           { title: "Key Insights", content: keyInsights },
//           { title: "Current Mood", content: currentMood },
//           { title: "Gentle Suggestion", content: gentleSuggestion },
//         ]);
//       } catch (error) {
//         console.error("Error fetching summary:", error);
//       }
//       setLoading(false);
//     };

//     if (userId) {
//       fetchSummary();
//     }
//   }, [userId]);

//   const openModal = (insight: InsightData) => {
//     setSelectedInsight(insight);
//   };

//   const closeModal = () => {
//     setSelectedInsight(null);
//   };

//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white text-black">
//       {/* Header - seamlessly integrated */}
//       <header className="flex items-center justify-between p-3 sm:p-4">
//         <div className="flex items-center space-x-2">
//           <div 
//             className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
//             style={{ backgroundColor: selectedColor }}
//           >
//             <span className="text-white text-xs sm:text-sm">M</span>
//           </div>
//           <span className="text-xs sm:text-sm">MindSpace</span>
//         </div>
//         <Button variant="ghost" size="sm" onClick={toggleNav}>
//           <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
//         </Button>
//       </header>

//       {/* Sliding Navigation */}
//       <div
//         className={`fixed inset-y-0 right-0 w-full sm:w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
//           isNavOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <span className="text-lg">Menu</span>
//               <Button variant="ghost" size="sm" onClick={toggleNav}>
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
          
//           <div className="flex-1 py-4">
//             <div className="space-y-2">
//               <button 
//                 onClick={() => onNavigate('home')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <Home className="w-5 h-5 mr-3" />
//                 <span>Home</span>
//               </button>
//               <button 
//                 onClick={() => onNavigate('wellness')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <Heart className="w-5 h-5 mr-3" />
//                 <span>Wellness Advisor</span>
//               </button>
//               <button 
//                 onClick={() => onNavigate('guidance')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <Compass className="w-5 h-5 mr-3" />
//                 <span>Guidance</span>
//               </button>
//               <button 
//                 onClick={() => onNavigate('funzone')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <GamepadIcon className="w-5 h-5 mr-3" />
//                 <span>Funzone</span>
//               </button>
//               <button 
//                 onClick={() => onNavigate('buzzsession')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <Users className="w-5 h-5 mr-3" />
//                 <span>Buzzsession</span>
//               </button>
//               <button 
//                 onClick={() => onNavigate('memoir')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <BookOpen className="w-5 h-5 mr-3" />
//                 <span>Memoir</span>
//               </button>
//               <button 
//                 onClick={() => onNavigate('stats')}
//                 className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors"
//               >
//                 <BarChart3 className="w-5 h-5 mr-3" />
//                 <span>Stats</span>
//               </button>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-200 p-4">
//             <button 
//               onClick={() => onNavigate('about')}
//               className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg mb-2"
//             >
//               <Info className="w-5 h-5 mr-3" />
//               <span>About Us</span>
//             </button>
//             <button 
//               onClick={() => onNavigate('home')}
//               className="w-full flex items-center px-4 py-3 text-left text-red-500 hover:bg-red-50 transition-colors rounded-lg"
//             >
//               <LogOut className="w-5 h-5 mr-3" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isNavOpen && (
//         <div 
//           className="fixed inset-0 z-40 backdrop-blur-sm"
//           onClick={toggleNav}
//           style={{
//             backdropFilter: 'blur(8px)',
//             WebkitBackdropFilter: 'blur(8px)',
//           }}
//         />
//       )}

//       {/* Main Content */}
//       <main className="p-4 sm:p-6 max-w-4xl mx-auto">
//         <div className="text-center mb-6 sm:mb-8">
//           <h1 className="text-xl sm:text-2xl mb-2">Reflection & Takeaways</h1>
//           <p className="text-gray-600 text-sm sm:text-base">Here's what I gathered from our conversation, {userName}</p>
//         </div>

//         {/* Insight Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-6 sm:mb-8">
//           {insights.map((insight, index) => (
//             <button
//               key={index}
//               onClick={() => openModal(insight)}
//               className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-md"
//             >
//               <h3 className="text-sm sm:text-base mb-2">{insight.title}</h3>
//               <div 
//                 className="w-6 sm:w-8 h-1 mx-auto"
//                 style={{ backgroundColor: selectedColor }}
//               ></div>
//             </button>
//           ))}
//         </div>

//         {/* Explore Button */}
//         <div className="text-center">
//           <Button
//             onClick={toggleNav}
//             className="text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base"
//             style={{ backgroundColor: selectedColor }}
//           >
//             Explore
//           </Button>
//         </div>
//       </main>

//       {/* Glass Morphism Modal */}
//       {selectedInsight && (
//         <div 
//           className="fixed inset-0 flex items-center justify-center p-4 z-50"
//           style={{
//             backdropFilter: 'blur(8px)',
//             WebkitBackdropFilter: 'blur(8px)',
//           }}
//         >
//           <div 
//             className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
//             style={{
//               backdropFilter: 'blur(16px)',
//               WebkitBackdropFilter: 'blur(16px)',
//             }}
//           >
//             <div className="flex justify-between items-start mb-6">
//               <h2 className="text-xl">{selectedInsight.title}</h2>
//               <Button
//                 onClick={closeModal}
//                 variant="ghost"
//                 size="sm"
//                 className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
            
//             <div className="text-gray-800 leading-relaxed whitespace-pre-line">
//               {selectedInsight.content}
//             </div>
            
//             <div className="mt-6 flex justify-end">
//               <Button
//                 onClick={closeModal}
//                 className="text-white px-6 py-2"
//                 style={{ backgroundColor: selectedColor }}
//               >
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import axios from 'axios';
import { SharedNavigation } from "./SharedNavigation";

// --- CHANGE 4: Update interface to include the new 'summary' field ---
interface Summary {
  summary: string;
  keyInsights: string | string[];
  currentMood: string;
  gentleSuggestion: string;
}

interface InsightCardData {
  title: string;
  content: string | string[];
}

interface ResultsPageProps {
  userName: string;
  userId: string;
  onNavigate: (page: string) => void;
  summary: Summary | null;
}

export function ResultsPage({ userName, userId, onNavigate, summary: latestSummary }: ResultsPageProps) {
  const { selectedColor } = useTheme();
  const [selectedInsight, setSelectedInsight] = useState<InsightCardData | null>(null);
  const [insights, setInsights] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      if (latestSummary) {
        setInsights(latestSummary);
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get<Summary>(`http://localhost:5000/api/user/${userId}/latest-summary`);
        setInsights(response.data);
      } catch (error) {
        console.error("No summary found for this user:", error);
        setInsights({
          summary: "This is where a brief summary of our conversation will appear.",
          keyInsights: "Your key insights will be listed here after our chat.",
          currentMood: "Ready",
          gentleSuggestion: "Start a new chat to get your first reflection."
        });
      }
      setLoading(false);
    };

    if (userId) {
      fetchSummary();
    }
  }, [userId, latestSummary]);

  const openModal = (insight: InsightCardData) => {
    setSelectedInsight(insight);
  };
  
  const closeModal = () => {
    setSelectedInsight(null);
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your results...</div>;
  }

  // --- CHANGE 5: Create data for four cards ---
  const insightCards: InsightCardData[] = [
    { title: "Summary", content: insights?.summary || "" },
    { title: "Key Insights", content: insights?.keyInsights || "" },
    { title: "Current Mood", content: insights?.currentMood || "" },
    { title: "Gentle Suggestion", content: insights?.gentleSuggestion || "" },
  ];
  
  const renderContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-5 space-y-2 text-left">
          {content.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      );
    }
    return content;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: selectedColor }}>
            <span className="text-white text-xs sm:text-sm">M</span>
          </div>
          <span className="text-xs sm:text-sm">MindSpace</span>
        </div>
        <SharedNavigation onNavigate={onNavigate} currentPage="results" />
      </header>
      
      <main className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl mb-2">Reflection & Takeaways</h1>
          <p className="text-gray-600 text-sm sm:text-base">Here's what I gathered from our conversation, {userName}</p>
        </div>

        {/* --- CHANGE 6: Use a 2x2 grid for the four cards --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mb-6 sm:mb-8">
          {insightCards.map((insight, index) => (
            <button
              key={index}
              onClick={() => openModal(insight)}
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <h3 className="text-sm sm:text-base mb-2">{insight.title}</h3>
              <div className="w-6 sm:w-8 h-1 mx-auto" style={{ backgroundColor: selectedColor }}></div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={() => onNavigate('chat')} className="text-white px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base" style={{ backgroundColor: selectedColor }}>
            Start a New Chat
          </Button>
        </div>
      </main>

      {selectedInsight && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          <div className="bg-white bg-opacity-90 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl">{selectedInsight.title}</h2>
              <Button onClick={closeModal} variant="ghost" size="sm" className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="text-gray-800 leading-relaxed whitespace-pre-line">
              {renderContent(selectedInsight.content)}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={closeModal} className="text-white px-6 py-2" style={{ backgroundColor: selectedColor }}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}