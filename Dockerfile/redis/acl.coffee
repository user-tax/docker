#!/usr/bin/env coffee

> fs > existsSync
  @rmw/thisdir
  path > dirname join
  dotenv > parse
  utax/read
  utax/write
  utax/utf8 > utf8e

ROOT = dirname dirname thisdir import.meta
ENV = join ROOT, '.env'
{ REDIS_PASSWORD } = parse read ENV
REDIS_PASSWORD = utf8e REDIS_PASSWORD.trim()
HASH = (Buffer.from (await crypto.subtle.digest("SHA-256", REDIS_PASSWORD))).toString 'hex'

PREFIX = "user default on "
USER = PREFIX+"##{HASH} ~* &* +@all"
ACL = join ROOT,'data/redis/acl'

li = []

to_set = true

if existsSync(ACL)
  acl = read(ACL).split('\n')
  for i from acl
    if to_set and i.startsWith(PREFIX)
      to_set = false
      li.push USER
    else if i
      li.push i

if to_set
  li =[USER].concat(li)

write ACL, li.join('\n')+'\n'


