FROM node:16-alpine

# Копирует проект в образ

WORKDIR /project
COPY server /project/server
COPY frontend /project/frontend

# Устанавливает зависимости сервера

COPY package.json /project
RUN npm install

# Устанавливает зависимости фронта

WORKDIR /project/frontend
RUN npm install

# Собирает фронт

RUN npm run build

# Запускает скрипты для создания базы

WORKDIR /project/

COPY entrypoint.sh /project
COPY scripts /project/scripts/

RUN ["npm", "run", "initdb"]
RUN ["npm", "run", "devdata"]

# Запускает сервер

CMD ["node", "server/index.js"]

EXPOSE 8080