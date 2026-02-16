import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Category, Question } from '../types';

interface Props {
  category: Category;
  onBack: () => void;
  onSelectQuestion: (q: Question) => void;
}

export const TopicDetails: React.FC<Props> = ({ category, onBack, onSelectQuestion }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 h-full flex flex-col">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Назад к темам
      </button>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{category.title}</h1>
        <p className="text-slate-600">{category.questions.length} вопросов в этой теме. Выберите вопрос для тренировки.</p>
      </header>

      <div className="grid gap-3 overflow-y-auto pb-6">
        {category.questions.map((q) => (
          <button
            key={q.id}
            onClick={() => onSelectQuestion(q)}
            className="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group w-full"
          >
             <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-50 group-hover:text-primary transition-colors">
                <Play size={18} className="fill-current ml-0.5" />
             </div>
             <div className="flex-1">
               <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors mb-1 pr-4">
                 {q.question}
               </h3>
               <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  q.difficulty === 'База' ? 'bg-green-100 text-green-700' :
                  q.difficulty === 'Хардкор' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
               }`}>
                  {q.difficulty}
               </span>
             </div>
          </button>
        ))}
      </div>
    </div>
  );
};