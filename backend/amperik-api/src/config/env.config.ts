import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  openAiKey: process.env.OPENAI_API_KEY!,
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .filter(Boolean),
}));
