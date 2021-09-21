FROM node
MAINTAINER Ximena Romero
Workdir /app
COPY . .
Run npm install
Expose 3000
CMD npm start