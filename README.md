
构建镜像
```
docker build -t image-name .

```

启动镜像

```
docker run -d -p 1080:3001 --name node-service_v1.0.3 --link mongo:mongo node-service_v1.0.3
docker run  -p 1080:3001 --name node-service_v1.1.3 --link mongo:mongo node-service_v1.1.3


https://chandao.derucci.com:6443/node-service/git-push-data?key=5d4ce0b3-db28-4aec-abb8-36022bcd5763

```