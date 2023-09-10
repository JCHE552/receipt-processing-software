FROM node

WORKDIR /app

COPY package.json ./

RUN npm install -g npm@10.0.0
RUN npm install -d react-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "start"]