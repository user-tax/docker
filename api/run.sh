#!/usr/bin/env sh

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

INIT='./init.js'

if [ -f "$INIT" ]; then
  $INIT
fi

exec node --es-module-specifier-resolution=node --trace-uncaught --expose-gc --unhandled-rejections=strict ./api.js
