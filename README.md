to build node application :
=============================
1. Build mongodb : sudo docker run -d -p 27017:27017 --network host --name mongodb mongo:4.4
2. Build redis : sudo docker run -d -p 6379:6379 --network host --name redis -d redis
3. Build back end :
   a. cd zimozi, cp back/Dockerfile.back Dockerfile
   b. sudo docker build . -t 192.168.56.31:5000/backapp:v1
   c. sudo docker run -it -p 8099:8099 --network host --name backend 192.168.56.31:5000/backapp:v1
4. Build front end :
   a. cd zimozi, cp front/Dockerfile.front.nginx Dockerfile
   b. sudo docker build . -t 192.168.56.31:5000/frontapp:v1
   c. sudo docker run -it -p 80:80 --network host --name frontend 192.168.56.31:5000/frontapp:v1
