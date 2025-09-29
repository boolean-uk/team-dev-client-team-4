
FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./

RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund


COPY . .

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]