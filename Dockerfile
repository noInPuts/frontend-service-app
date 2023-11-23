FROM node:21-alpine

ARG REACT_APP_BACKEND_URL=http://http://167.71.45.53/
ENV REACT_APP_BACKEND_URL=http://http://167.71.45.53/

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]