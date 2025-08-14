// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import envConfig from './config/env.config';

// import { AskController } from './interfaces/http/ask.controller';
// import { AskUseCase } from './application/usecases/ask.usecase';

// import { LangchainOpenAIProvider } from './infrastructure/providers/langchain-openai.provider';
// import { RedisCacheAdapter } from './infrastructure/adapters/redis-cache.adapter';
// import { AI_PORT, CACHE_PORT } from './domain/ports';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [envConfig],
//     }),
//   ],
//   controllers: [AskController],
//   providers: [
//     AskUseCase,
//     {
//       provide: AI_PORT,
//       useClass: LangchainOpenAIProvider,
//     },
//     {
//       provide: CACHE_PORT,
//       useClass: RedisCacheAdapter,
//     },
//   ],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AskModule } from './ask/ask.module';

@Module({
  imports: [AskModule],
})
export class AppModule {}
