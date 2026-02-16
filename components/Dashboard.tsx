import React from 'react';
import { Play, Brain, List, Trophy, ChevronRight } from 'lucide-react';
import { INITIAL_DATA } from '../constants';
import { Stats } from './Stats';
import { Category } from '../types';

interface Props {
  onStart: () => void;
  onSelectCategory: (category: Category) => void;
}

export const Dashboard: React.FC<Props> = ({ onStart, onSelectCategory }) => {
  const { app_metadata, categories } = INITIAL_DATA;

  return (
    <div className="max-w-4xl mx-auto p-6 h-full overflow-y-auto">
      <header className="mb-8 mt-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-xl mb-4">
            <Brain size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{app_metadata.title}</h1>
        <p className="text-slate-600 max-w-2xl">{app_metadata.description}</p>
      </header>

      <section className="mb-8">
        <Stats />
      </section>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Call to Action */}
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg flex flex-col items-start justify-between min-h-[160px]">
            <div>
                <h2 className="text-xl font-bold mb-2">Начать тренировку</h2>
                <p className="text-blue-100 text-sm mb-4">Умный алгоритм подберет вопросы, которые вам нужно повторить именно сейчас.</p>
            </div>
            <button 
                onClick={onStart}
                className="group flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
                <Play size={20} className="fill-current" /> Поехали
            </button>
        </div>

        {/* Tips */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trophy size={18} className="text-yellow-500" /> Советы
            </h3>
            <ul className="space-y-3">
                {app_metadata.author_tips.slice(0, 3).map((tip, i) => (
                    <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-primary">•</span> {tip}
                    </li>
                ))}
            </ul>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <List size={20} /> Темы вопросов
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
                <button 
                    key={cat.id} 
                    onClick={() => onSelectCategory(cat)}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer text-left group w-full"
                >
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-slate-700 group-hover:text-primary transition-colors">{cat.title}</h4>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">{cat.questions.length} вопр.</span>
                        <div className="flex gap-0.5">
                            {cat.questions.slice(0, 5).map(q => (
                                <div key={q.id} className={`w-1.5 h-1.5 rounded-full ${
                                    q.difficulty === 'База' ? 'bg-green-300' :
                                    q.difficulty === 'Хардкор' ? 'bg-red-300' : 'bg-blue-300'
                                }`} />
                            ))}
                        </div>
                    </div>
                </button>
            ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-slate-400 text-sm pb-6">
        System Analyst Coach v{app_metadata.version}
      </footer>
    </div>
  );
};