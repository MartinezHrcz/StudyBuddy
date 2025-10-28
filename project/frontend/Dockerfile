FROM node:18-bullseye

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++ git

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild rollup --force

CMD ["npm", "run", "dev", "--", "--host"]