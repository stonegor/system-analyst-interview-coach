import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, EvaluationResult, Question } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";
import { localStorageService } from "./localStorageService";

const getAI = () => {
  const prefs = localStorageService.loadPreferences();
  let apiKey = prefs?.apiKey;
  let baseUrl = prefs?.baseUrl;

  // Fallback to env vars
  if (!apiKey) {
    apiKey = process.env.VITE_GEMINI_API_KEY || process.env.API_KEY;
  }

  if (!baseUrl) {
    baseUrl = process.env.GEMINI_BASE_URL;
  }

  if (!apiKey) {
    throw new Error("API Key is missing. Please configure it in Settings.");
  }

  const options: any = { apiKey };
  if (baseUrl) {
    options.httpOptions = { baseUrl };
  }
  return new GoogleGenAI(options);
};

export const sendChatMessage = async (
  history: ChatMessage[],
  newMessage: string,
  modelName: string = "gemini-3-flash-preview"
): Promise<string> => {
  const ai = getAI();

  // Filter out system messages and transform to Gemini format
  const validHistory = history.filter(msg => msg.role !== 'system');
  const historyParts = validHistory.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  const chat = ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
    history: historyParts
  });

  const result = await chat.sendMessage({ message: newMessage });
  return result.text || "Извините, произошла ошибка при генерации ответа.";
};

export const sendCoachMessage = async (
  history: ChatMessage[],
  newMessage: string,
  reviewContext: { question: string, feedback: string, score: number },
  modelName: string = "gemini-3-flash-preview"
): Promise<string> => {
  const ai = getAI();

  // Filter out system messages and transform to Gemini format
  const validHistory = history.filter(msg => msg.role !== 'system');
  const historyParts = validHistory.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  const coachInstruction = `
    You are a helpful System Analyst Interview Coach.
    The formal interview session has ended. Your role now is to help the user understand their performance and learn from their mistakes.
    
    Context:
    - The user was asked: "${reviewContext.question}"
    - The feedback provided was: "${reviewContext.feedback}"
    
    Guidelines:
    - Answer the user's questions clearly and concisely.
    - Explain concepts if they are confused.
    - Reference the specific feedback given if relevant.
    - Do NOT continue the roleplay as an interviewer. Be a mentor/teacher now.
    - Never use analogies in the explanations.
    - Respond in Russian.
  `;

  const chat = ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: coachInstruction,
      temperature: 0.7,
    },
    history: historyParts
  });

  const result = await chat.sendMessage({ message: newMessage });
  return result.text || "Извините, произошла ошибка при генерации ответа.";
};

export const evaluateSession = async (
  question: Question,
  conversationHistory: ChatMessage[]
): Promise<EvaluationResult> => {
  const ai = getAI();

  // Contextualize the evaluation
  const prompt = `
    Analyze the following conversation where I (the User) was tested on the question: "${question.question}".
    The expected answer essence/summary is: "${question.answer}".

    Conversation Transcript:
    ${conversationHistory.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}

    TASK:
    1. Rate my understanding (1 = Poor/Wrong, 2 = Okay/Incomplete, 3 = Excellent/Correct).
    2. Provide constructive feedback in Russian.
    3. State the correct answer clearly.
    4. If I've used any terms imprecisely, please correct me, but it shouldn't heavily influence the ranking.
    5. Answer the last question, if left unanswered.

    Return JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          feedback: { type: Type.STRING },
          correctAnswer: { type: Type.STRING }
        },
        required: ["score", "feedback", "correctAnswer"]
      }
    }
  });

  const jsonText = response.text || "{}";
  try {
    return JSON.parse(jsonText) as EvaluationResult;
  } catch (e) {
    return {
      score: 1,
      feedback: "Ошибка обработки результата. Попробуйте снова.",
      correctAnswer: question.answer
    };
  }
};