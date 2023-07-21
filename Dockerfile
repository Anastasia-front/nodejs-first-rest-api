FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3007

CMD ["node", "server"]