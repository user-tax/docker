FROM postgres:15-alpine AS pg

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

RUN apk add make musl-dev clang gcc llvm

COPY plugin /plugin

RUN /plugin/pguint.sh
RUN /plugin/md5hash/build.sh

FROM postgres:15-alpine 

COPY init/*.sql /docker-entrypoint-initdb.d/

RUN chown postgres:postgres /docker-entrypoint-initdb.d/*.sql

COPY --from=pg \
  /usr/local/share/postgresql/extension\
  /usr/local/share/postgresql/extension

COPY --from=pg \
  /usr/local/lib/postgresql\
  /usr/local/lib/postgresql
