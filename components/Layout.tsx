import React from 'react';
import { Tab } from '../types';
import { Home, Compass, MessageCircle, ListTodo, BookOpen, Users } from 'lucide-react';

interface LayoutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          {children}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-50">
          <NavButton 
            active={activeTab === Tab.HOME} 
            onClick={() => onTabChange(Tab.HOME)} 
            icon={<Home size={20} />} 
            label="Home" 
          />
          <NavButton 
            active={activeTab === Tab.FUTURE} 
            onClick={() => onTabChange(Tab.FUTURE)} 
            icon={<Compass size={20} />} 
            label="Future" 
          />
          <NavButton 
            active={activeTab === Tab.CHAT} 
            onClick={() => onTabChange(Tab.CHAT)} 
            icon={<MessageCircle size={20} />} 
            label="AI Chat" 
          />
          <NavButton 
            active={activeTab === Tab.GOALS} 
            onClick={() => onTabChange(Tab.GOALS)} 
            icon={<ListTodo size={20} />} 
            label="Goals" 
          />
           <NavButton 
            active={activeTab === Tab.STUDY} 
            onClick={() => onTabChange(Tab.STUDY)} 
            icon={<BookOpen size={20} />} 
            label="Study" 
          />
          <NavButton 
            active={activeTab === Tab.COMMUNITY} 
            onClick={() => onTabChange(Tab.COMMUNITY)} 
            icon={<Users size={20} />} 
            label="Club" 
          />
        </div>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ 
  active, onClick, icon, label 
}) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors ${active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span className="text-[9px] font-medium mt-1">{label}</span>
  </button>
);

export default Layout;