#Con que trabajaremos
FROM node:latest
#Donde trabajaremos
WORKDIR /app
#Archivos principales
COPY package*.json ./
#Iniciamos node_modules
RUN npm install
#Compiamos todo en el directorio
COPY . .
#Puerto de salida
EXPOSE 8090
#Comando a ejecutar
CMD [ "npm", "start" ]