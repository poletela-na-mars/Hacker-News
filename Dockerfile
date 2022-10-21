FROM node:16.17.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY . .

EXPOSE 3000

RUN npm run build --prod

CMD ["npm", "start"]