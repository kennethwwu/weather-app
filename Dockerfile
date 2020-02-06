FROM node
WORKDIR /home/node/app
COPY ./ ./
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]