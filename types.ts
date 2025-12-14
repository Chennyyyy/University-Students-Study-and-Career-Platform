export interface SkillGap {
  skill: string;
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  description: string;
}

export interface CareerAnalysisResult {
  recommendedRole: string;
  salaryRange: string;
  gapAnalysis: SkillGap[];
  summary: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  source: 'manual' | 'ai-recommendation';
}

export interface UserState {
  isStudying: boolean;
  studyStartTime: number | null;
  accumulatedMinutes: number;
}

export enum Tab {
  HOME = 'HOME',
  FUTURE = 'FUTURE',
  GOALS = 'GOALS',
  STUDY = 'STUDY',
  COMMUNITY = 'COMMUNITY',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}