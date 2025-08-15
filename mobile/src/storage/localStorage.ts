import AsyncStorage from "@react-native-async-storage/async-storage";
import { Message } from "../models/Message";


const KEY = 'amperik_chat_history_v1';
const MAX_MESSAGES = 50;

export const saveMessages = async (messages: Message[]) => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)));
  } catch (e) {
    console.warn('saveMessages error', e);
  }
};

export const loadMessages = async (): Promise<Message[]> => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Message[]) : [];
  } catch (e) {
    console.warn('loadMessages error', e);
    return [];
  }
};
