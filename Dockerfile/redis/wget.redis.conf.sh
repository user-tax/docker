#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

ver=$(cat ../../docker-compose.yml|rg "redis:\d"|head -1 |awk -F: '{print $3}').0

if [ -f "redis.conf" ]; then
exit 0
fi

rm -rf redis.conf
wget https://ghproxy.com/https://raw.githubusercontent.com/redis/redis/$ver/redis.conf

conf(){
  sed -i -e "/^$1/c$2" redis.conf
}

conf "# save 3600 " "save 3600 1 300 100 60 10000"
conf "appendonly " "appendonly yes"
conf "bind " "bind * -::*"
conf "port " "port $REDIS_PORT"
conf "# requirepass " "requirepass $REDIS_PASSWORD"
# https://cloud.tencent.com/developer/article/1836825
conf "# repl-backlog-size " "repl-backlog-size 200m"
# conf 'logfile ' "logfile /log/redis.log"
conf 'dir ' 'dir /data'
conf '# rename-command CONFIG ""' 'rename-command FLUSHALL ""\nrename-command FLUSHDB  ""\nrename-command CONFIG   ""\nrename-command KEYS  ""\n'

sysctl_conf=/etc/sysctl.conf

if ! grep -q "vm.overcommit_memory" "$sysctl_conf"; then
echo -e "\nvm.overcommit_memory=1\n" >> $sysctl_conf
fi

sysctl vm.overcommit_memory=1

