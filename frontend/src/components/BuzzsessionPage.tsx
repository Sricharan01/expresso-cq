// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { ArrowLeft, Search, ChevronUp, ChevronDown, Flag, Hash, Send } from "lucide-react";
// import { useState } from "react";
// import { useTheme } from "./ThemeProvider";
// import { SharedNavigation } from "./SharedNavigation";

// interface BuzzsessionPageProps {
//   onBack: () => void;
//   onNavigate: (page: string) => void;
// }

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   author: string;
//   upvotes: number;
//   downvotes: number;
//   userVote: 'up' | 'down' | null;
//   tags: string[];
//   timestamp: string;
//   comments: number;
// }

// export function BuzzsessionPage({ onBack, onNavigate }: BuzzsessionPageProps) {
//   const { selectedColor } = useTheme();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTag, setSelectedTag] = useState<string | null>(null);
//   const [newPost, setNewPost] = useState("");
//   const [showNewPost, setShowNewPost] = useState(false);

//   const [posts, setPosts] = useState<Post[]>([
//     {
//       id: "1",
//       title: "Dealing with anxiety before exams",
//       content: "Has anyone found effective ways to manage anxiety before big exams? I've been struggling with this for months and it's affecting my performance. Any tips would be appreciated.",
//       author: "StudyStruggler",
//       upvotes: 24,
//       downvotes: 2,
//       userVote: null,
//       tags: ["anxiety", "study", "exams"],
//       timestamp: "2 hours ago",
//       comments: 15
//     },
//     {
//       id: "2",
//       title: "Feeling overwhelmed with social situations",
//       content: "I love my friends but lately I've been feeling exhausted after hanging out. Is this normal? Sometimes I just want to stay home and avoid everyone.",
//       author: "QuietSoul",
//       upvotes: 18,
//       downvotes: 1,
//       userVote: null,
//       tags: ["social", "overwhelmed", "introvert"],
//       timestamp: "4 hours ago",
//       comments: 23
//     },
//     {
//       id: "3",
//       title: "Success story: 6 months of therapy",
//       content: "Just wanted to share that after 6 months of regular therapy sessions, I'm finally feeling like myself again. To anyone hesitating about seeking help - it's worth it.",
//       author: "HealingJourney",
//       upvotes: 156,
//       downvotes: 3,
//       userVote: null,
//       tags: ["success", "therapy", "healing"],
//       timestamp: "6 hours ago",
//       comments: 42
//     },
//     {
//       id: "4",
//       title: "Anyone else struggle with sleep lately?",
//       content: "My sleep schedule has been all over the place. I fall asleep fine but wake up at 3am every night. Any suggestions for better sleep hygiene?",
//       author: "NightOwl",
//       upvotes: 31,
//       downvotes: 0,
//       userVote: null,
//       tags: ["sleep", "insomnia", "health"],
//       timestamp: "8 hours ago",
//       comments: 28
//     },
//     {
//       id: "5",
//       title: "Meditation apps that actually work?",
//       content: "I've tried a few meditation apps but they all feel too cheesy or complicated. Does anyone have recommendations for simple, effective meditation resources?",
//       author: "MindfulSeeker",
//       upvotes: 12,
//       downvotes: 1,
//       userVote: null,
//       tags: ["meditation", "mindfulness", "apps"],
//       timestamp: "12 hours ago",
//       comments: 19
//     }
//   ]);

//   const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

//   const filteredPosts = posts.filter(post => {
//     const matchesSearch = searchTerm === "" || 
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
//     return matchesSearch && matchesTag;
//   });

//   const handleVote = (postId: string, voteType: 'up' | 'down') => {
//     setPosts(posts.map(post => {
//       if (post.id === postId) {
//         let newUpvotes = post.upvotes;
//         let newDownvotes = post.downvotes;
//         let newUserVote: 'up' | 'down' | null = voteType;

//         // Remove previous vote if exists
//         if (post.userVote === 'up') {
//           newUpvotes--;
//         } else if (post.userVote === 'down') {
//           newDownvotes--;
//         }

//         // Add new vote or remove if clicking same vote
//         if (post.userVote === voteType) {
//           newUserVote = null; // Remove vote if clicking same button
//         } else {
//           if (voteType === 'up') {
//             newUpvotes++;
//           } else {
//             newDownvotes++;
//           }
//         }

//         return {
//           ...post,
//           upvotes: newUpvotes,
//           downvotes: newDownvotes,
//           userVote: newUserVote
//         };
//       }
//       return post;
//     }));
//   };

//   const handleSubmitPost = () => {
//     if (!newPost.trim()) return;

//     const post: Post = {
//       id: Date.now().toString(),
//       title: newPost.length > 50 ? newPost.substring(0, 50) + "..." : newPost,
//       content: newPost,
//       author: "You",
//       upvotes: 0,
//       downvotes: 0,
//       userVote: null,
//       tags: ["general"],
//       timestamp: "Just now",
//       comments: 0
//     };

//     setPosts([post, ...posts]);
//     setNewPost("");
//     setShowNewPost(false);
//   };

//   return (
//     <div className="min-h-screen bg-white text-black">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 border-b border-gray-100">
//         <div className="flex items-center space-x-2">
//           <Button variant="ghost" size="sm" onClick={onBack}>
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div 
//             className="w-8 h-8 rounded-full flex items-center justify-center ml-2"
//             style={{ backgroundColor: selectedColor }}
//           >
//             <span className="text-white text-sm">M</span>
//           </div>
//           <span className="text-sm">Buzzsession</span>
//         </div>
//         <SharedNavigation onNavigate={onNavigate} currentPage="buzzsession" />
//       </header>

//       {/* Search and Tags */}
//       <div className="p-4 border-b border-gray-100 space-y-4">
//         <div className="flex space-x-2">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search posts, tags, or topics..."
//               className="pl-10 border border-gray-300 rounded-lg"
//               style={{ borderColor: searchTerm ? selectedColor : undefined }}
//             />
//           </div>
//           <Button
//             onClick={() => setShowNewPost(!showNewPost)}
//             className="text-white px-4"
//             style={{ backgroundColor: selectedColor }}
//           >
//             Post
//           </Button>
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={() => setSelectedTag(null)}
//             className={`px-3 py-1 rounded-full text-sm border transition-colors ${
//               selectedTag === null 
//                 ? 'text-white' 
//                 : 'border-gray-300 text-gray-600 hover:border-gray-400'
//             }`}
//             style={{ 
//               backgroundColor: selectedTag === null ? selectedColor : 'transparent',
//               borderColor: selectedTag === null ? selectedColor : undefined
//             }}
//           >
//             All
//           </button>
//           {allTags.map(tag => (
//             <button
//               key={tag}
//               onClick={() => setSelectedTag(tag)}
//               className={`px-3 py-1 rounded-full text-sm border transition-colors flex items-center space-x-1 ${
//                 selectedTag === tag 
//                   ? 'text-white' 
//                   : 'border-gray-300 text-gray-600 hover:border-gray-400'
//               }`}
//               style={{ 
//                 backgroundColor: selectedTag === tag ? selectedColor : 'transparent',
//                 borderColor: selectedTag === tag ? selectedColor : undefined
//               }}
//             >
//               <Hash className="w-3 h-3" />
//               <span>{tag}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* New Post Input */}
//       {showNewPost && (
//         <div className="p-4 border-b border-gray-100 bg-gray-50">
//           <div className="space-y-3">
//             <textarea
//               value={newPost}
//               onChange={(e) => setNewPost(e.target.value)}
//               placeholder="Share your thoughts, ask for advice, or start a discussion..."
//               className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none"
//               style={{ borderColor: newPost ? selectedColor : undefined }}
//             />
//             <div className="flex justify-end space-x-2">
//               <Button
//                 variant="ghost"
//                 onClick={() => {
//                   setShowNewPost(false);
//                   setNewPost("");
//                 }}
//                 className="text-gray-500"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSubmitPost}
//                 disabled={!newPost.trim()}
//                 className="text-white px-4"
//                 style={{ backgroundColor: selectedColor }}
//               >
//                 <Send className="w-4 h-4 mr-2" />
//                 Post
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Posts */}
//       <div className="max-w-4xl mx-auto">
//         {filteredPosts.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             <p>No posts found matching your search.</p>
//           </div>
//         ) : (
//           <div className="space-y-1">
//             {filteredPosts.map((post) => (
//               <div key={post.id} className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex space-x-3">
//                   {/* Vote Section */}
//                   <div className="flex flex-col items-center space-y-1 min-w-[40px]">
//                     <button
//                       onClick={() => handleVote(post.id, 'up')}
//                       className={`p-1 rounded hover:bg-gray-200 transition-colors ${
//                         post.userVote === 'up' ? 'text-green-600' : 'text-gray-400'
//                       }`}
//                     >
//                       <ChevronUp className="w-5 h-5" />
//                     </button>
//                     <span className={`text-sm ${
//                       post.userVote === 'up' ? 'text-green-600' : 
//                       post.userVote === 'down' ? 'text-red-600' : 'text-gray-600'
//                     }`}>
//                       {post.upvotes - post.downvotes}
//                     </span>
//                     <button
//                       onClick={() => handleVote(post.id, 'down')}
//                       className={`p-1 rounded hover:bg-gray-200 transition-colors ${
//                         post.userVote === 'down' ? 'text-red-600' : 'text-gray-400'
//                       }`}
//                     >
//                       <ChevronDown className="w-5 h-5" />
//                     </button>
//                   </div>

//                   {/* Post Content */}
//                   <div className="flex-1 space-y-2">
//                     <h3 className="text-base">{post.title}</h3>
//                     <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
                    
//                     {/* Tags */}
//                     <div className="flex flex-wrap gap-1">
//                       {post.tags.map(tag => (
//                         <span
//                           key={tag}
//                           className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>

//                     {/* Post Meta */}
//                     <div className="flex items-center justify-between pt-2">
//                       <div className="flex items-center space-x-4 text-xs text-gray-500">
//                         <span>by {post.author}</span>
//                         <span>{post.timestamp}</span>
//                         <span>{post.comments} comments</span>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="text-gray-400 hover:text-red-500 p-1"
//                       >
//                         <Flag className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, PlusCircle } from "lucide-react";
// import { useTheme } from "./ThemeProvider";
// import { SharedNavigation } from "./SharedNavigation";
// import axios from "axios";

// interface BuzzsessionPageProps {
//   onBack: () => void;
//   onNavigate: (page: string) => void;
//   onSelectPost: (postId: string) => void; // To navigate to the detail page
// }

// interface Post {
//     _id: string;
//     title: string;
//     author: { username: string };
//     upvotes: string[];
//     downvotes: string[];
//     comments: string[];
//     createdAt: string;
// }

// export function BuzzsessionPage({ onBack, onNavigate, onSelectPost }: BuzzsessionPageProps) {
//   const { selectedColor } = useTheme();
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/posts')
//       .then(res => {
//         setPosts(res.data);
//         setIsLoading(false);
//       })
//       .catch(err => {
//         console.error("Failed to fetch posts", err);
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading posts...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 text-black">
//       <header className="flex items-center justify-between p-4 bg-white border-b">
//         <div className="flex items-center space-x-2">
//           <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-5 h-5" /></Button>
//           <div className="w-8 h-8 rounded-full flex items-center justify-center ml-2" style={{ backgroundColor: selectedColor }}><span className="text-white text-sm">M</span></div>
//           <span className="text-sm">Buzzsession</span>
//         </div>
//         <SharedNavigation onNavigate={onNavigate} currentPage="buzzsession" />
//       </header>

//       <main className="max-w-3xl mx-auto p-4">
//         <div className="mb-4">
//             {/* We'll add a create post page later, this is a placeholder button */}
//             <Button className="w-full text-white" style={{backgroundColor: selectedColor}} onClick={() => alert("Create post functionality coming soon!")}>
//                 <PlusCircle size={16} className="mr-2"/> Create a New Post
//             </Button>
//         </div>
//         <div className="space-y-4">
//             {posts.map(post => (
//                 <div key={post._id} className="bg-white p-4 rounded-lg border cursor-pointer hover:border-blue-400" onClick={() => onSelectPost(post._id)}>
//                     <p className="text-xs text-gray-500 mb-2">Posted by {post.author.username}</p>
//                     <h2 className="text-lg font-bold mb-2">{post.title}</h2>
//                     <div className="flex items-center space-x-4 text-sm text-gray-500">
//                         <div className="flex items-center space-x-1">
//                             <ThumbsUp size={14}/>
//                             <span>{post.upvotes.length}</span>
//                         </div>
//                          <div className="flex items-center space-x-1">
//                             <ThumbsDown size={14}/>
//                             <span>{post.downvotes.length}</span>
//                         </div>
//                         <div className="flex items-center space-x-1">
//                             <MessageSquare size={14}/>
//                             <span>{post.comments.length} Comments</span>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//       </main>
//     </div>
//   );
// }
import { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft, MessageSquare, ChevronUp, ChevronDown, Flag, Search, Hash, Trash2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { SharedNavigation } from "./SharedNavigation";
import axios from "axios";

interface BuzzsessionPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onSelectPost: (postId: string) => void;
  userId: string;
}

interface Post {
    _id: string;
    title: string;
    content?: string;
    author: { _id: string, username: string };
    upvotes: string[];
    downvotes: string[];
    comments: string[];
    tags: string[];
    createdAt: string;
}

export function BuzzsessionPage({ onBack, onNavigate, onSelectPost, userId }: BuzzsessionPageProps) {
  const { selectedColor } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [popularTags, setPopularTags] = useState<string[]>([]);

  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => { setPosts(res.data); setIsLoading(false); })
      .catch(err => { console.error("Failed to fetch posts", err); setIsLoading(false); });
  }

  useEffect(() => {
    fetchPosts();
    // Fetch popular tags
    axios.get('http://localhost:5000/api/posts/tags/popular')
        .then(res => setPopularTags(res.data))
        .catch(err => console.error("Failed to fetch popular tags", err));
  }, []);
  
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = selectedTag === null || post.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  const handleVote = async (e: React.MouseEvent, postId: string, voteType: 'up' | 'down') => {
    e.stopPropagation();
    const originalPosts = [...posts];
    const newPosts = posts.map(p => {
        if (p._id === postId) {
            const upvoted = p.upvotes.includes(userId);
            const downvoted = p.downvotes.includes(userId);
            const newUpvotes = p.upvotes.filter(id => id !== userId);
            const newDownvotes = p.downvotes.filter(id => id !== userId);
            if (voteType === 'up' && !upvoted) newUpvotes.push(userId);
            if (voteType === 'down' && !downvoted) newDownvotes.push(userId);
            return { ...p, upvotes: newUpvotes, downvotes: newDownvotes };
        }
        return p;
    });
    setPosts(newPosts);
    try {
        await axios.post(`http://localhost:5000/api/posts/${postId}/vote`, { userId, voteType });
    } catch (error) {
        console.error("Vote failed, reverting UI", error);
        setPosts(originalPosts);
    }
  };

  const handleDelete = async (e: React.MouseEvent, postId: string) => {
      e.stopPropagation();
      if (window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
          try {
              await axios.delete(`http://localhost:5000/api/posts/${postId}`, { data: { userId } });
              setPosts(posts.filter(p => p._id !== postId));
          } catch (error) {
              console.error("Failed to delete post", error);
              alert("You are not authorized to delete this post or an error occurred.");
          }
      }
  };


  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading posts...</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-5 h-5" /></Button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center ml-2" style={{ backgroundColor: selectedColor }}><span className="text-white text-sm">M</span></div>
            <span className="text-sm font-semibold">Buzzsession</span>
        </div>
        <SharedNavigation onNavigate={onNavigate} currentPage="buzzsession" />
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white p-3 rounded-xl border flex items-center gap-4 mb-4 shadow-sm">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="Search posts, tags, or topics..." className="pl-14 h-12 text-base border-none focus-visible:ring-0" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Button className="text-white h-12 px-6 rounded-lg" style={{backgroundColor: selectedColor}} onClick={() => onNavigate('create-post')}>Post</Button>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <button onClick={() => setSelectedTag(null)} className={`text-sm px-4 py-2 rounded-full transition-colors ${selectedTag === null ? 'text-white font-semibold' : 'bg-white text-gray-700 hover:bg-gray-200'}`} style={{backgroundColor: selectedTag === null ? selectedColor : undefined}}>All</button>
            {popularTags.map(tag => (
                <button key={tag} onClick={() => setSelectedTag(tag)} className={`text-sm px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 whitespace-nowrap ${selectedTag === tag ? 'text-white font-semibold' : 'bg-white text-gray-700 hover:bg-gray-200'}`} style={{backgroundColor: selectedTag === tag ? selectedColor : undefined}}>
                    <Hash size={14}/> {tag}
                </button>
            ))}
        </div>

        <div className="space-y-1">
            {filteredPosts.map(post => {
                const voteScore = post.upvotes.length - post.downvotes.length;
                const userVote = post.upvotes.includes(userId) ? 'up' : post.downvotes.includes(userId) ? 'down' : null;

                return (
                    <div key={post._id} className="flex gap-4 p-4 rounded-lg cursor-pointer hover:bg-white" onClick={() => onSelectPost(post._id)}>
                        <div className="flex flex-col items-center text-gray-500 space-y-1 pt-1">
                            <button onClick={(e) => handleVote(e, post._id, 'up')} className={`p-1 rounded-full hover:bg-gray-200 ${userVote === 'up' ? 'text-blue-500' : ''}`}><ChevronUp size={22}/></button>
                            <span className="font-bold text-base text-black">{voteScore}</span>
                            <button onClick={(e) => handleVote(e, post._id, 'down')} className={`p-1 rounded-full hover:bg-gray-200 ${userVote === 'down' ? 'text-red-500' : ''}`}><ChevronDown size={22}/></button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{post.content}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags?.map(tag => (
                                    <span key={tag} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-md">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-4">
                                    <span>by {post.author.username}</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <div className="flex items-center gap-1.5"><MessageSquare size={14}/><span>{post.comments.length} comments</span></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {post.author._id === userId && (
                                        <button onClick={(e) => handleDelete(e, post._id)} className="p-1 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-full"><Trash2 size={14}/></button>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); alert('Report functionality coming soon!'); }} className="p-1 hover:bg-gray-200 rounded-full"><Flag size={14}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </main>
    </div>
  );
}