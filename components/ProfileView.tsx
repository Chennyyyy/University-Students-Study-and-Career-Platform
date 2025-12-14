import React from 'react';
import { UserState } from '../types';
import { Settings, LogOut, ChevronRight, GraduationCap, MapPin } from 'lucide-react';

interface ProfileViewProps {
  userState: UserState;
}

const ProfileView: React.FC<ProfileViewProps> = ({ userState }) => {
  return (
    <div className="bg-gray-50 min-h-full">
      {/* Header / Banner */}
      <div className="bg-indigo-600 pt-12 pb-24 px-6 text-white relative">
         <div className="flex justify-between items-start mb-6">
            <h1 className="text-xl font-bold">My Home</h1>
            <Settings size={20} className="text-indigo-200" />
         </div>
         
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full border-2 border-indigo-400 p-1">
              <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Alex Chen</h2>
              <p className="text-indigo-200 text-sm">Computer Science • Junior Year</p>
            </div>
         </div>
         
         {/* Status Badge - Synced from Study Room */}
         <div className="absolute bottom-6 right-6">
            {userState.isStudying ? (
              <div className="flex items-center gap-2 bg-green-400/20 backdrop-blur-md border border-green-400/30 px-3 py-1.5 rounded-full text-green-100 text-xs font-bold shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Currently Studying
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-indigo-100 text-xs">
                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                 Offline
              </div>
            )}
         </div>
      </div>

      {/* Stats Cards */}
      <div className="px-5 -mt-10 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex justify-between">
           <div className="text-center flex-1 border-r border-gray-100">
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-xs text-gray-400">Goals Done</p>
           </div>
           <div className="text-center flex-1 border-r border-gray-100">
              <p className="text-2xl font-bold text-gray-800">45h</p>
              <p className="text-xs text-gray-400">Total Study</p>
           </div>
           <div className="text-center flex-1">
              <p className="text-2xl font-bold text-gray-800">85</p>
              <p className="text-xs text-gray-400">Skill Score</p>
           </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-5 space-y-3">
        <MenuItem icon={<GraduationCap size={18} />} label="My University" value="Tsinghua University" />
        <MenuItem icon={<MapPin size={18} />} label="Location" value="Beijing" />
        <div className="h-px bg-gray-200 my-2"></div>
        <MenuItem icon={<LogOut size={18} />} label="Logout" isDanger />
      </div>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; value?: string; isDanger?: boolean }> = ({ 
  icon, label, value, isDanger 
}) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between active:bg-gray-50 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isDanger ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600'}`}>
        {icon}
      </div>
      <span className={`font-medium ${isDanger ? 'text-red-500' : 'text-gray-700'}`}>{label}</span>
    </div>
    <div className="flex items-center gap-2 text-gray-400">
      {value && <span className="text-sm">{value}</span>}
      {!isDanger && <ChevronRight size={16} />}
    </div>
  </div>
);

export default ProfileView;