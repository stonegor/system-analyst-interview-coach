import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Session } from './components/Session';
import { TopicDetails } from './components/TopicDetails';
import { Category, Question } from './types';
import { useStorage } from './contexts/StorageContext';
import { SettingsModal } from './components/SettingsModal';

enum View {
  DASHBOARD,
  TOPIC_DETAILS,
  SESSION
}

const App: React.FC = () => {
  const { preferences, isLoading } = useStorage();
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Automatically open settings if no API key is found
  useEffect(() => {
    if (!isLoading && (!preferences || !preferences.apiKey)) {
      setIsSettingsOpen(true);
    }
  }, [isLoading, preferences]);

  const handleStartSmartSession = () => {
    setSelectedQuestion(null);
    setView(View.SESSION);
  };

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setView(View.TOPIC_DETAILS);
  };

  const handleSelectQuestion = (q: Question) => {
    setSelectedQuestion(q);
    setView(View.SESSION);
  };

  const handleExitSession = () => {
    // If we were in a specific category, return there. Otherwise dashboard.
    if (selectedCategory && selectedQuestion) {
        setView(View.TOPIC_DETAILS);
        setSelectedQuestion(null);
    } else {
        setView(View.DASHBOARD);
        setSelectedQuestion(null);
        setSelectedCategory(null);
    }
  };

  const handleBackToDashboard = () => {
    setView(View.DASHBOARD);
    setSelectedCategory(null);
  };

  return (
    <div className="h-full bg-slate-50 font-sans antialiased text-slate-900 relative">
      {view === View.DASHBOARD && (
        <Dashboard 
          onStart={handleStartSmartSession} 
          onSelectCategory={handleSelectCategory} 
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}
      
      {view === View.TOPIC_DETAILS && selectedCategory && (
        <TopicDetails 
          category={selectedCategory} 
          onBack={handleBackToDashboard}
          onSelectQuestion={handleSelectQuestion}
        />
      )}
      
      {view === View.SESSION && (
        <Session 
          onExit={handleExitSession} 
          initialQuestion={selectedQuestion}
        />
      )}

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default App;