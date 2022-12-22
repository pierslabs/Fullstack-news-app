FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./public ./public
COPY ./src ./src
ARG REACT_APP_DB_URL
ENV REACT_APP_DB_URL ${REACT_APP_DB_URL}
RUN npm i
EXPOSE 3000
CMD ["npm","start"]