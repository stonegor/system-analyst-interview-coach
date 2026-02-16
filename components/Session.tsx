import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, BookOpen, ExternalLink, RefreshCw } from 'lucide-react';
import { getSmartQueue, saveProgress, skipQuestion } from '../services/storageService';
import { Question, EvaluationResult } from '../types';
import { ChatInterface } from './ChatInterface';
import ReactMarkdown from 'react-markdown';

interface Props {
  onExit: () => void;
  initialQuestion?: Question | null;
}

export const Session: React.FC<Props> = ({ onExit, initialQuestion }) => {
  const [queue, setQueue] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  useEffect(() => {
    if (initialQuestion) {
        setQueue([initialQuestion]);
        setCurrentIndex(0);
    } else {
        setQueue(getSmartQueue());
        setCurrentIndex(0);
    }
  }, [initialQuestion]);

  const currentQuestion = queue[currentIndex];
  const isLastQuestion = currentIndex >= queue.length - 1;
  // If we are in "single question mode" (initialQuestion provided), the end action is to exit, not load smart queue.
  const isSingleMode = !!initialQuestion;

  const handleComplete = (evalResult: EvaluationResult) => {
    if (currentQuestion) {
        saveProgress(currentQuestion.id, evalResult.score);
        setResult(evalResult);
    }
  };

  const nextQuestion = () => {
    setResult(null);
    if (!isLastQuestion) {
        setCurrentIndex(prev => prev + 1);
    } else {
        if (isSingleMode) {
            onExit();
        } else {
            // Smart Queue finished, reload
            setQueue(getSmartQueue());
            setCurrentIndex(0);
        }
    }
  };

  const handleSkip = () => {
      if (currentQuestion) {
          skipQuestion(currentQuestion.id);
          nextQuestion();
      }
  };

  if (!currentQuestion) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Загрузка...</h2>
            <button onClick={onExit} className="px-6 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-blue-700">
                Вернуться
            </button>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col md:flex-row max-w-6xl mx-auto w-full md:p-6 p-0 gap-6">
      {/* Sidebar / Question Info */}
      <div className="md:w-1/3 w-full bg-slate-50 md:rounded-2xl p-6 flex flex-col border-b md:border-r border-slate-200 md:h-full shrink-0 overflow-y-auto">
        <button onClick={onExit} className="mb-6 flex items-center text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Меню
        </button>

        <div className="mb-4">
             <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Вопрос {currentIndex + 1}</span>
             <h1 className="text-xl md:text-2xl font-bold text-slate-800 mt-2 leading-tight">
                {currentQuestion.question}
             </h1>
        </div>

        {/* Evaluation Result View */}
        {result ? (
            <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`p-4 rounded-xl border mb-4 ${
                    result.score === 3 ? 'bg-green-50 border-green-200' :
                    result.score === 2 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'
                }`}>
                    <div className="flex items-center gap-2 mb-2">
                        <Star className={`w-5 h-5 ${result.score >= 1 ? 'fill-current' : 'opacity-30'}`} />
                        <Star className={`w-5 h-5 ${result.score >= 2 ? 'fill-current' : 'opacity-30'}`} />
                        <Star className={`w-5 h-5 ${result.score >= 3 ? 'fill-current' : 'opacity-30'}`} />
                        <span className="font-bold ml-auto text-lg">
                            {result.score === 3 ? 'Отлично' : result.score === 2 ? 'Хорошо' : 'Надо учить'}
                        </span>
                    </div>
                </div>

                <div className="prose prose-sm mb-6">
                    <h3 className="text-slate-900 font-semibold">Обратная связь:</h3>
                    <p>{result.feedback}</p>
                    
                    <h3 className="text-slate-900 font-semibold mt-4">Правильный ответ:</h3>
                    <ReactMarkdown>{result.correctAnswer}</ReactMarkdown>
                </div>

                {currentQuestion.sources && currentQuestion.sources.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-slate-500 mb-2">Полезные ссылки:</h4>
                        <ul className="space-y-2">
                            {currentQuestion.sources.map((src, idx) => (
                                <li key={idx}>
                                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline text-sm">
                                        <ExternalLink className="w-3 h-3 mr-2" />
                                        {src.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button 
                    onClick={nextQuestion}
                    className={`mt-auto w-full py-3 text-white rounded-xl font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2 ${
                        isSingleMode && isLastQuestion ? 'bg-slate-700' : 'bg-slate-900'
                    }`}
                >
                    {isSingleMode && isLastQuestion ? 'Вернуться к списку' : 'Следующий вопрос'} 
                    {isSingleMode && isLastQuestion ? <ArrowLeft className="w-4 h-4"/> : <RefreshCw className="w-4 h-4" />}
                </button>
            </div>
        ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-slate-400 opacity-50">
                <BookOpen className="w-16 h-16 mb-4" />
                <p>Ответьте на вопрос в чате справа</p>
            </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-[60vh] md:h-full md:rounded-2xl overflow-hidden shadow-xl">
        {result ? (
            <div className="h-full bg-slate-100 flex items-center justify-center p-8 text-center text-slate-500">
                Чат завершен. Изучите результаты слева.
            </div>
        ) : (
            <ChatInterface 
                key={currentQuestion.id} 
                question={currentQuestion} 
                onComplete={handleComplete}
                onSkip={handleSkip} 
            />
        )}
      </div>
    </div>
  );
};