#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR

if [ -z $1 ];then
  echo -e "usage :\n./up.sh xxx"
  exit 1
fi

set -ex

if ! [ -x "$(command -v direnv)" ]; then
curl -sfL https://direnv.net/install.sh | bash
fi

direnv allow

if ! [ -x "$(command -v docker-compose)" ]; then
pip3 install docker-compose
fi

if [ ! -f ".env" ] ;then
direnv exec . ./env.coffee
fi

if [ -f $1/init.sh ]; then
direnv exec . $1/init.sh
fi

rm -rf docker-compose.yml
ln -s $1/docker-compose.yml .
direnv exec . docker-compose up -d
