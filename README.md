### 참고사항
#### ./tasio_pro : tasio-app frontend(vue.js) 해당 파일을 clone 해야함
#### ./pm2/vue-backend : tasio-app backend(express) 해당 파일을 clone 해야함
#### 도메인 변경시 1. docker-compose.yml 파일, nginx/tasio.conf 파일, vue-backend/functions/index.js 파일 수정 필요.

### 실행
#### docker-compose build & up 
docker-compose up -d --build
#### pm2 위에 돌아가는 express 는 firebase login 이 필요함으로 아래 과정이 필요합니다.
docker exec -it pm2 /bin/sh
firebase login --no-localhost
##### login <- firebase 에 연결된 계정이 필요 (6)
pm2 start pm2.json



