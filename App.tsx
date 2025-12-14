import React, { useState } from 'react';
import Layout from './components/Layout';
import FutureView from './components/FutureView';
import ChatView from './components/ChatView';
import GoalsView from './components/GoalsView';
import StudyView from './components/StudyView';
import CommunityView from './components/CommunityView';
import ProfileView from './components/ProfileView';
import { Tab, Goal, UserState } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  
  // Global State (mocking a Context or Redux store)
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Learn React Hooks', description: 'Master useEffect', isCompleted: false, source: 'manual' },
    { id: '2', title: 'Calculus Review', description: 'Prepare for finals', isCompleted: true, source: 'manual' }
  ]);
  
  const [userState, setUserState] = useState<UserState>({
    isStudying: false,
    studyStartTime: null,
    accumulatedMinutes: 0
  });

  const [studyTarget, setStudyTarget] = useState<string | undefined>(undefined);

  // Actions
  const handleAddGoal = (title: string) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      description: 'Added via Future Analysis',
      isCompleted: false,
      source: 'ai-recommendation'
    };
    setGoals(prev => [newGoal, ...prev]);
    setActiveTab(Tab.GOALS); // Switch to goals tab to see it
  };

  const handleToggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, isCompleted: !g.isCompleted } : g));
  };

  const handleGoToStudy = (goalTitle: string) => {
    setStudyTarget(goalTitle);
    setActiveTab(Tab.STUDY);
  };

  const handleStatusChange = (isStudying: boolean) => {
    setUserState(prev => ({ ...prev, isStudying }));
  };

  // Router / Render Logic
  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <ProfileView userState={userState} />;
      case Tab.FUTURE:
        return <FutureView onAddGoal={handleAddGoal} />;
      case Tab.CHAT:
        return <ChatView />;
      case Tab.GOALS:
        return <GoalsView goals={goals} onToggleGoal={handleToggleGoal} onGoToStudy={handleGoToStudy} />;
      case Tab.STUDY:
        return <StudyView userState={userState} onStatusChange={handleStatusChange} targetGoalTitle={studyTarget} />;
      case Tab.COMMUNITY:
        return <CommunityView />;
      default:
        return <ProfileView userState={userState} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;