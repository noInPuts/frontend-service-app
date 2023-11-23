FROM node:21-alpine

ARG REACT_APP_BACKEND_URL=http://localhost
ENV REACT_APP_BACKEND_URL=http://localhost

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]