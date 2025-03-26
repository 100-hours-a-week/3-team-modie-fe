# 🔹 1. Node.js 20 버전 (Alpine)으로 빌드 단계
FROM node:20-alpine AS build

# 🔹 2. 작업 디렉토리 설정
WORKDIR /app

# 🔹 3. package.json과 yarn.lock 복사 후 의존성 설치
ENV NODE_ENV=development
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 🔹 4. 소스 코드 복사 및 빌드
COPY . .
RUN yarn build

# 🔹 5. Node.js 20 버전 (Alpine)으로 실행 단계 (가벼운 이미지)
FROM node:20-alpine AS run

# 🔹 6. 작업 디렉토리 설정
WORKDIR /app

# 🔹 7. 빌드된 정적 파일 및 설정 복사
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/vite.config.ts /app/vite.config.ts

# 🔹 8. Vite 프리뷰 서버 실행을 위한 환경 변수 적용
ENV VITE_HOST=dev.modie.site

# 🔹 9. Vite 프리뷰 서버 실행을 위한 의존성 설치
RUN yarn global add vite

# 🔹 10. 4173 포트 노출 (Vite 기본 프리뷰 포트)
EXPOSE 4173

# 🔹 11. 실행 (Vite 프리뷰 서버 사용)
CMD ["vite", "preview", "--port", "4173", "--host", "0.0.0.0"]
