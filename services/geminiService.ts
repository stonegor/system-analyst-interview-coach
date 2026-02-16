import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, EvaluationResult, Question } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

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

export const evaluateSession = async (
  question: Question,
  conversationHistory: ChatMessage[]
): Promise<EvaluationResult> => {
  const ai = getAI();
  
  // Contextualize the evaluation
  const prompt = `
    Analyze the following conversation where I (the User) was tested on the question: "${question.question}".
    The correct/expected answer essence is: "${question.answer}".

    Conversation Transcript:
    ${conversationHistory.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n')}

    TASK:
    1. Rate my understanding (1 = Poor/Wrong, 2 = Okay/Incomplete, 3 = Excellent/Correct).
    2. Provide constructive feedback in Russian.
    3. State the correct answer clearly.

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