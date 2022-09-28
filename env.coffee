#!/usr/bin/env coffee

> path > dirname join
  @rmw/thisdir
  @iuser/write
  @iuser/read
  fs > existsSync
  fs/promises > opendir
  nanoid > nanoid
  os > cpus
  dotenv > parse

ROOT = thisdir(import.meta)
ENV = join(
  ROOT
  '.env'
)

if existsSync ENV
  pre = parse read ENV
else
  pre = {}

pg_pwd = nanoid()
host = 'user.tax'
data = {
  NODE_ENV: 'production'
  PG_HOST:'pg'
  PG_DB:host
  PG_USER:host
  PG_PORT:9997
  PG_POOL_CONN:32
  PG_SSL: 'false'
  PG_PASSWORD:pg_pwd

  LOG_HOST:'pg'
  LOG_DB:host
  LOG_USER:host
  LOG_PORT:9997
  LOG_POOL_CONN:16
  LOG_PASSWORD:pg_pwd

  REDIS_DB:0
  REDIS_USER:'default'
  REDIS_PASSWORD:nanoid()

  REDIS_HOST:'redis'
  REDIS_PORT:9998

  SMTP_HOST: 'smtp.user.tax'
  SMTP_PORT: 465
  SMTP_TLS: 1
  SMTP_USER: 'smtp_login_account'
  SMTP_PASSWORD: 'password'
  SMTP_NAME: 'display_name'

  API_PORT:80
  API_HTTPS:443

  CPU_NUM:cpus().length
}

txt = []
namespace = ''
for [k,v] from Object.entries data
  ns = k[...k.indexOf('_')]
  if namespace and ns != namespace
    txt.push ''
  namespace = ns

  txt.push "#{k}=#{pre[k] or v}"

if not 'DEBUG' of pre
  txt.push '# DEBUG=1'

await write ENV, txt.join('\n')+'\n'

for await fp from await opendir ROOT
  if not fp.isDirectory()
    continue
  docker = join(ROOT,fp.name,'docker-compose.yml')
  if not existsSync docker
    continue

  li = read(docker).split('\n')
  txt = []
  state = 0
  for i from li
    i = i.trimEnd()
    t = i.trimStart()
    if state == 2
      if t.endsWith ':'
        state = 3
        txt.push i
    else
      txt.push i
    if state == 1
      if t == 'environment:'
        state = 2
        for k from Object.keys data
          txt.push "      #{k}: ${#{k}}"
    else if t=='api:'
      state = 1

  await write docker, txt.join('\n')

