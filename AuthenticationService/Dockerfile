# Usa la imagen oficial de Node.js con Alpine (ligera)
FROM node:20-slim

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código al contenedor
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=2048

# Compila TypeScript y ejecuta la app según tus scripts
RUN npm run build

# Expone el puerto (ajústalo si tu servicio escucha en otro)
EXPOSE 5002

# Ejecuta el comando principal de tu sistema (ya compila y corre)
CMD ["npm", "start"]
