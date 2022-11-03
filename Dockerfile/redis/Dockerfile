FROM redis:7-alpine AS build

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

RUN apk add make gcc
# musl-dev clang gcc llvm python3

#COPY plugin /plugin

#RUN /plugin/pguint.sh
#RUN /plugin/md5hash/build.sh

FROM redis:7-alpine

#COPY --from=build \
#  /usr/local/share/postgresql/extension\
  #  /usr/local/share/postgresql/extension

