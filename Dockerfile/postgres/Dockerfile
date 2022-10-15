FROM postgres:15-alpine AS pg

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add make musl-dev clang gcc llvm

COPY md5hash /md5hash

RUN /md5hash/build.sh

FROM postgres:15-alpine 

COPY --from=pg \
  /usr/local/share/postgresql/extension\
  /usr/local/share/postgresql/extension

COPY --from=pg \
  /usr/local/lib/postgresql\
  /usr/local/lib/postgresql
