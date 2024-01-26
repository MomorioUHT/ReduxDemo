FROM node:18
WORKDIR /app
RUN apt-get update && apt-get install -y python3 && apt install python-is-python3
COPY package*.json ./
RUN npm install
COPY . . 
EXPOSE 8000
CMD ["npm","start"]
