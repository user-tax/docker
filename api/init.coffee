#!/usr/bin/env coffee

> chalk
  ./RedisLua
  ./mail_ban_host
  ./sercet_key
  ./i18n
  ./PgUint

li = []
for mod from [
  PgUint
  RedisLua
  i18n
  MailBanHost
  SercetKey
]
  li.push mod()

await Promise.all li

process.exit()
