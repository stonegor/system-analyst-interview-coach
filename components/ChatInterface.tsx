import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, StopCircle, User, Bot, Loader2, SkipForward } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Question, ChatMessage, EvaluationResult } from '../types';
import { sendChatMessage, evaluateSession } from '../services/geminiService';

interface Props {
  question: Question;
  onComplete: (result: EvaluationResult) => void;
  onSkip: () => void;
}

export const ChatInterface: React.FC<Props> = ({ question, onComplete, onSkip }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const init = async () => {
        setMessages([
            {
                id: 'init',
                role: 'model',
                text: `Давай обсудим этот вопрос: **${question.question}**\n\nЧто ты можешь рассказать об этом?`
            }
        ]);
    };
    init();
  }, [question]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await sendChatMessage(messages, inputValue);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: 'err', role: 'system', text: 'Ошибка сети. Попробуйте еще раз.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFinish = async () => {
    setIsEvaluating(true);
    try {
      const result = await evaluateSession(question, messages);
      onComplete(result);
    } catch (e) {
      console.error(e);
      // Fallback
      onComplete({ score: 1, feedback: "Error evaluating", correctAnswer: question.answer });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
        <div>
            <h3 className="font-semibold text-slate-800">Интервью с ИИ</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
                question.difficulty === 'База' ? 'bg-green-100 text-green-700' :
                question.difficulty === 'Хардкор' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
                {question.difficulty}
            </span>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={onSkip}
                disabled={isEvaluating}
                title="Пропустить вопрос"
                className="text-sm flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
                <SkipForward className="w-4 h-4" />
                <span className="hidden sm:inline">Пропустить</span>
            </button>
            <button 
                onClick={handleFinish}
                disabled={messages.length < 2 || isEvaluating}
                className="text-sm flex items-center gap-2 px-3 py-1.5 bg-secondary text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
                {isEvaluating ? <Loader2 className="w-4 h-4 animate-spin"/> : <CheckCircle className="w-4 h-4" />}
                Завершить
            </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 
                msg.role === 'system' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
            }`}>
                {msg.role === 'user' ? <User size={16}/> : <Bot size={16}/>}
            </div>
            
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
            }`}>
              {msg.role === 'system' ? (
                  <span className="text-red-500">{msg.text}</span>
              ) : (
                <div className={`markdown prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                    <ReactMarkdown 
                        components={{
                            p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />
                        }}
                    >
                        {msg.text}
                    </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
               <Bot size={16}/>
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
             </div>
           </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative flex items-center gap-2">
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ваш ответ..."
                className="w-full resize-none rounded-xl border border-slate-300 pl-4 pr-12 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none max-h-32"
                rows={1}
            />
            <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping || isEvaluating}
                className="absolute right-2 p-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                <Send size={16} />
            </button>
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
            ИИ задает наводящие вопросы. Нажмите "Завершить", когда будете готовы получить оценку.
        </p>
      </div>
    </div>
  );
};