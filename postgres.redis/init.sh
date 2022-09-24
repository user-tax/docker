#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

../Dockerfile/redis/wget.redis.conf.sh
