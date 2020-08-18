FROM node:12-alpine
EXPOSE 5000
WORKDIR /apps/vue-backend/functions
RUN npm i npm@6.14.4
WORKDIR /apps/vue-backend
RUN npm install -g firebase-tools
RUN npm install -g firebase-functions
RUN npm install -g firebase
COPY ./vue-backend .
WORKDIR /apps/vue-backend/functions
# COPY ./vue-backend/functions/package*.json ./
RUN npm install --silent
# COPY ./vue-backend/functions/. .
WORKDIR /apps
RUN npm install -g pm2
WORKDIR /apps/pm2
COPY pm2.json .
CMD [ "pm2-runtime", "start", "pm2.json" ]

# CMD ["firebase","login","--no-localhost"]
#CMD [ "firebase", "serve","--host","0.0.0.0:3000" ]
# EXPOSE 3000
