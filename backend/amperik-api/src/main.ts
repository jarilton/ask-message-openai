// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Registry, collectDefaultMetrics } from 'prom-client';
import * as express from 'express';
import { logger } from './config/logger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // Security
  app.use(helmet());
  app.use(cors({ origin: (origin, cb) => cb(null, true), credentials: true }));
  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
      standardHeaders: true,
      legacyHeaders: false,
    }) as unknown as express.RequestHandler,
  );
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Amperik Core API')
    .setDescription('API para orquestrar LangChain + OpenAI')
    .setVersion('1.0.0')
    .addTag('ask')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  // Prometheus
  const register = new Registry();
  collectDefaultMetrics({ register });
  app
    .getHttpAdapter()
    .getInstance()
    .get('/metrics', async (_req, res) => {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    });
  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
  logger.info(`API running on http://localhost:${port}`);
}
bootstrap();
