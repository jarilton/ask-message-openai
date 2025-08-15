export type Sender = 'me' | 'ai';

export interface Message {
  id: string;
  sender: Sender;
  text: string;
  createdAt?: string;
}
