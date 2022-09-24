# docker

如果要使用 redis 管理工具，可以编辑
`Dockerfile/redis/redis.conf`

注释掉 `#rename-command CONFIG ""`

然后 `docker-compose restart`
