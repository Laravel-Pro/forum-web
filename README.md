# Laravel Pro Web

![Test](https://github.com/laravel-pro/forum-web/workflows/Test/badge.svg?branch=master)

### 开始开发

#### 安装

```
yarn install

cp .env.example .env
```

#### 单元测试

```
yarn test
```


### 集成测试

```
# 先为E2E测试启动服务
# 每次开始前建议先运行 pull 来获取最新的 image
docker-compose -f docker-composer-e2e.yml pull

docker-compose -f docker-composer-e2e.yml up --force-recreate --renew-anon-volumes

# --renew-anon-volumes 参数防止mysql重用原来的数据
# 运行后可能需要下面的命令清除过多的volumes
docker volume prune

# 运行集成测试
yarn test:e2e
```
