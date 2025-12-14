import React, { useState } from 'react';
import { Goal } from '../types';
import { CheckCircle2, Circle, ArrowRight, Plus } from 'lucide-react';

interface GoalsViewProps {
  goals: Goal[];
  onToggleGoal: (id: string) => void;
  onGoToStudy: (goalTitle: string) => void;
}

const GoalsView: React.FC<GoalsViewProps> = ({ goals, onToggleGoal, onGoToStudy }) => {
  const [newGoalTitle, setNewGoalTitle] = useState('');

  // We are handling adding locally for demo, but realistically this would bubble up
  // Since we don't have a direct 'addGoal' prop here in this interface for manual adds 
  // without changing the App structure, let's keep it simple for now and rely on 
  // the 'Future' tab adding goals or just visualizing the list. 
  // However, I'll add a simple input for completeness.

  return (
    <div className="p-5">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Goals</h1>
          <p className="text-sm text-gray-500">{goals.filter(g => !g.isCompleted).length} pending tasks</p>
        </div>
      </header>

      <div className="space-y-3">
        {goals.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No goals yet. Use "My Future" to find gaps!</p>
          </div>
        ) : (
          goals.map((goal) => (
            <div 
              key={goal.id} 
              className={`bg-white p-4 rounded-xl border transition-all ${
                goal.isCompleted ? 'border-gray-100 opacity-60' : 'border-gray-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <button 
                  onClick={() => onToggleGoal(goal.id)}
                  className={`mt-0.5 ${goal.isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-indigo-500'}`}
                >
                  {goal.isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${goal.isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {goal.title}
                  </h3>
                  {goal.source === 'ai-recommendation' && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] rounded-full font-medium">
                      AI Recommended
                    </span>
                  )}
                </div>

                {!goal.isCompleted && (
                  <button 
                    onClick={() => onGoToStudy(goal.title)}
                    className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200"
                  >
                    Study
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalsView;