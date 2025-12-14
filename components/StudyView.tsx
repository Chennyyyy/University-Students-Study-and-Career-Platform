import React, { useState, useEffect } from 'react';
import { UserState } from '../types';
import { Play, Pause, Coffee, Headphones } from 'lucide-react';

interface StudyViewProps {
  userState: UserState;
  onStatusChange: (isStudying: boolean) => void;
  targetGoalTitle?: string;
}

const StudyView: React.FC<StudyViewProps> = ({ userState, onStatusChange, targetGoalTitle }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      onStatusChange(true);
    } else {
      clearInterval(interval);
      onStatusChange(false);
    }
    return () => clearInterval(interval);
  }, [isActive, onStatusChange]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="min-h-full flex flex-col p-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-[80px]"></div>
         <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full filter blur-[80px]"></div>
      </div>

      <header className="relative z-10 flex justify-between items-center mb-10">
        <div>
          <h1 className="text-xl font-bold">Cloud Study Room</h1>
          {targetGoalTitle ? (
            <p className="text-slate-400 text-sm mt-1">Focus: {targetGoalTitle}</p>
          ) : (
            <p className="text-slate-400 text-sm mt-1">Immersive Mode</p>
          )}
        </div>
        <div className="bg-slate-800 p-2 rounded-full">
          <Headphones size={20} className="text-indigo-400" />
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        {/* Timer Circle */}
        <div className="w-64 h-64 rounded-full border-4 border-slate-700 flex items-center justify-center relative shadow-2xl shadow-indigo-900/50">
          {isActive && (
            <div className="absolute w-full h-full rounded-full border-4 border-indigo-500 border-t-transparent animate-spin-slow"></div>
          )}
          <div className="text-center">
            <div className="text-5xl font-mono font-bold tracking-wider mb-2">
              {formatTime(seconds)}
            </div>
            <span className="text-slate-400 text-sm uppercase tracking-widest">
              {isActive ? 'Focusing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center gap-8">
          <button 
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform active:scale-95 ${
              isActive 
                ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between border border-slate-700/50">
        <div className="flex items-center gap-3">
          <Coffee size={20} className="text-orange-400" />
          <div className="text-sm">
            <p className="text-slate-200">White Noise</p>
            <p className="text-slate-500 text-xs">Rainy Cafe</p>
          </div>
        </div>
        <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors">
          Change
        </button>
      </div>
    </div>
  );
};

export default StudyView;