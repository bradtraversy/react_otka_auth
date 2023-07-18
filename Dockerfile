FROM node:18-slim
WORKDIR app
COPY . /app
RUN npm install
ENV PORT 8000
CMD ["npm","start"]
