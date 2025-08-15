Backend — Amperik Core API


cd backend/amperik-api
npm install
Configure variáveis de ambiente:

bash
Copiar
Editar
cp .env.sample .env
# Ajuste as chaves: OPENAI_API_KEY, PORT, REDIS_URL etc.
Rodar API:

bash
Copiar
Editar
# Dev
npm run start:dev

# Prod (build)
npm run build
npm run start:prod

2.2 Rodando com Docker
bash
Copiar
Editar
docker-compose up --build
Inclui serviço API + Redis (opcional)

API acessível em http://localhost:3333

Swagger em http://localhost:3000/docs

2.3 Endpoints principais
Método	Rota	Descrição	Body	Resposta
POST	/ask	Envia pergunta → LangChain/OpenAI	{ "question": "string" }	{ answer: string, usageTokens: number, latencyMs: number } (ou SSE/WebSocket)


=================== // ======================================== // =====================================


Mobile

cd mobile
npm install
Configure .env:

bash
Copiar
Editar
cp .env.example .env
# EXPO_PUBLIC_API_URL=http://localhost:3333
Rodar App:

bash
Copiar
Editar
# Iniciar Expo
npm run start?

# Iniciar dev
npm run android
