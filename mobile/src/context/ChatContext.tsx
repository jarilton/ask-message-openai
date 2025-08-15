
import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { api } from '../service/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_CHAT' };

const initialState: ChatState = {
  messages: [],
  loading: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'CLEAR_CHAT':
      return { ...state, messages: [] };
    default:
      return state;
  }
}

export const ChatContext = createContext<{
  state: ChatState;
  sendMessage: (question: string) => Promise<void>;
  clearChat: () => void;
} | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = useCallback(async (question: string) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { id: Date.now().toString(), role: 'user', content: question } });
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const { data } = await api.post('/ask', { question });

      if (!data.answer) {
        throw new Error('Resposta não encontrada.');
      }

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { id: Date.now().toString(), role: 'assistant', content: data.answer },
      });
    } catch (err) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: { id: Date.now().toString(), role: 'assistant', content: '[Erro ao obter resposta.]' },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
  }, []);

  return (
    <ChatContext.Provider value={{ state, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};


