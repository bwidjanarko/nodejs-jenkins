FROM node:alpine
LABEL authors="Bernard Widjanarko <berniex@gmail.com>"
RUN mkdir /app
WORKDIR /app
COPY /back/package.json ./
COPY /back/yarn.lock ./
RUN yarn install
COPY /back/./ ./
EXPOSE 8099
CMD ["node", "--log-all", "./"]
