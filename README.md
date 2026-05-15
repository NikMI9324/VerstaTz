# VerstaTz

Запуск (Docker): в корне репозитория выполните:

```bash
docker compose up -d --build
```

**http://localhost:5173** — фронт, **http://localhost:5214** — API.

Также можно поднять отдельные сервисы Docker, например только PostgreSQL:

```bash
docker compose up -d --build postgres
```

Для запуска backend **без** Docker (из корня проекта):

```bash
cd .\Backend\Versta.Api\
dotnet run
```

Нужен доступный PostgreSQL (например контейнер из шага выше или локально на порту **5433**, как в `appsettings`).

Для запуска frontend **без** Docker (из корня проекта):

```bash
cd .\Frontend
npm run dev
```
Если вы уже в `.\Backend\Versta.Api\`:

```bash
cd ..\..\Frontend\
npm run dev
```
