FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY . .
RUN yarn install 
EXPOSE 3009
CMD ["npm", "run", "dev"]