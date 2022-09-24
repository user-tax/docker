#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex

pkg=@user.tax/webp-linux-x64-musl

name=$(basename $pkg)
npmmirror=mirrors.cloud.tencent.com/npm

ver=$(curl -s https://$npmmirror/$pkg|jq -r '."dist-tags".latest')

dir=/tmp/$name
rm -rf $dir
mkdir -p $dir
cd $dir
rm -rf $name.tgz
wget https://registry.npmmirror.com/$pkg/-/$name-$ver.tgz -O $name.tgz
tar zxvf $name.tgz

find . -name '*.node' -exec mv {} $DIR/api \;
cd $DIR/api
git add *.node
git commit -madd
rm -rf $dir
