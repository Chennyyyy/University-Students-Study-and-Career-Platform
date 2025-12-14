import React from 'react';
import { MessageSquare, Heart, Share2, Plus } from 'lucide-react';

const CommunityView: React.FC = () => {
  const posts = [
    {
      id: 1,
      author: 'Sarah Lee',
      avatar: 'https://picsum.photos/seed/1/100',
      title: 'How to prepare for Frontend Interviews?',
      content: 'I have been studying React for 3 months. Any tips for big tech interviews?',
      likes: 24,
      comments: 8,
      tag: 'Career'
    },
    {
      id: 2,
      author: 'Mike Chen',
      avatar: 'https://picsum.photos/seed/2/100',
      title: 'Join our Data Science Study Group!',
      content: 'We meet every Tuesday online. Beginners welcome. Let us crack the algorithms together.',
      likes: 45,
      comments: 12,
      tag: 'Club'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-full pb-20">
       <div className="bg-white sticky top-0 z-10 px-5 py-4 shadow-sm border-b border-gray-100 flex justify-between items-center">
         <h1 className="text-xl font-bold text-gray-800">Community</h1>
         <button className="bg-indigo-600 text-white p-2 rounded-full shadow-lg shadow-indigo-200">
           <Plus size={20} />
         </button>
       </div>

       <div className="p-5 space-y-4">
         {posts.map(post => (
           <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-3">
               <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
               <div>
                 <h3 className="text-sm font-bold text-gray-800">{post.author}</h3>
                 <span className="text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{post.tag}</span>
               </div>
             </div>
             
             <h2 className="font-bold text-gray-800 mb-2">{post.title}</h2>
             <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.content}</p>
             
             <div className="flex items-center justify-between border-t border-gray-50 pt-3 text-gray-400">
               <button className="flex items-center gap-1.5 text-xs hover:text-red-500 transition-colors">
                 <Heart size={16} /> {post.likes}
               </button>
               <button className="flex items-center gap-1.5 text-xs hover:text-indigo-500 transition-colors">
                 <MessageSquare size={16} /> {post.comments}
               </button>
               <button className="flex items-center gap-1.5 text-xs hover:text-gray-600 transition-colors">
                 <Share2 size={16} /> Share
               </button>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};

export default CommunityView;