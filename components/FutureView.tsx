import React, { useState } from 'react';
import { analyzeCareerPath } from '../services/geminiService';
import { CareerAnalysisResult, Goal } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { Plus, ArrowRight, Sparkles, MapPin, Briefcase } from 'lucide-react';

interface FutureViewProps {
  onAddGoal: (title: string) => void;
}

const FutureView: React.FC<FutureViewProps> = ({ onAddGoal }) => {
  const [skills, setSkills] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CareerAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!skills || !city) return;
    setLoading(true);
    try {
      const data = await analyzeCareerPath(skills, city);
      setResult(data);
    } catch (e) {
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Future</h1>
        <p className="text-sm text-gray-500">AI-powered Career Trajectory Planning</p>
      </header>

      {!result ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target City</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Shanghai, Beijing"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Skills & Interests</label>
            <textarea 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="I know Python basics, enjoy data analysis, but confused about web dev..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none h-32 resize-none"
            />
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <Sparkles size={18} />
                Explore Future
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
           {/* Summary Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-indigo-100 text-sm mb-1">Recommended Path</p>
                  <h2 className="text-2xl font-bold mb-2">{result.recommendedRole}</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  <span className="text-xs font-bold">{city}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Briefcase size={16} className="text-indigo-200"/>
                <span className="text-lg font-medium">Est. Salary: {result.salaryRange}</span>
              </div>
              <p className="mt-4 text-sm text-indigo-100 opacity-90 leading-relaxed">
                "{result.summary}"
              </p>
            </div>
            {/* Decor */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-4 ml-2">Skill Gap Analysis</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.gapAnalysis}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Required"
                    dataKey="requiredLevel"
                    stroke="#818cf8"
                    strokeWidth={2}
                    fill="#818cf8"
                    fillOpacity={0.1}
                  />
                  <Radar
                    name="You"
                    dataKey="currentLevel"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fill="#4f46e5"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                <span className="text-gray-600">Your Level</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-indigo-300"></div>
                <span className="text-gray-600">Market Requirement</span>
              </div>
            </div>
          </div>

          {/* Actionable Gaps */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-800 mb-4">Improvement Plan</h3>
            <div className="space-y-4">
              {result.gapAnalysis.filter(g => g.requiredLevel > g.currentLevel).map((gap, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div>
                    <h4 className="font-semibold text-gray-800">{gap.skill}</h4>
                    <p className="text-xs text-gray-500">Gap: {gap.currentLevel}% → {gap.requiredLevel}%</p>
                  </div>
                  <button 
                    onClick={() => onAddGoal(`Master ${gap.skill}`)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors"
                  >
                    <Plus size={14} />
                    Add Goal
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setResult(null)} className="w-full py-3 text-gray-500 text-sm hover:text-gray-800">
            Start New Analysis
          </button>
        </div>
      )}
    </div>
  );
};

export default FutureView;