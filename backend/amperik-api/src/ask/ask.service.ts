// import { Injectable } from '@nestjs/common';
// import Redis from 'ioredis';
// import OpenAI from 'openai';

// @Injectable()
// export class AskService {
//   private redis: Redis;
//   private openai: OpenAI;

//   constructor() {
//     // Conexão Redis
//     this.redis = new Redis({
//       host: 'localhost', // ou o host do seu container/serviço
//       port: 6379,
//     });

//     // OpenAI
//     this.openai = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//   }

//   async ask(question: string): Promise<string> {
//     // 1️⃣ Checa cache
//     const cached = await this.redis.get(question);
//     if (cached) return cached;

//     // 2️⃣ Chama OpenAI
//     const completion = await this.openai.chat.completions.create({
//       model: 'gpt-4o-mini',
//       messages: [{ role: 'user', content: question }],
//     });

//     const answer = completion.choices[0].message?.content || 'Sem resposta';

//     // 3️⃣ Salva no Redis (cache por 1 hora)
//     await this.redis.set(question, answer, 'EX', 3600);

//     return answer;
//   }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class AskService {
  async ask(question: string): Promise<string> {
    // aqui você chama OpenAI, LangChain, Redis, etc.
    // por enquanto só um mock simples:
    return `Resposta para: ${question}`;
  }
}
