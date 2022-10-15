MODULE_big = hash
OBJS = hash.o

EXTENSION = hash
DATA = sql/hash--1.0.0.sql sql/hash--1.0.0--1.0.0.sql
MODULES = hash

CFLAGS=`pg_config --includedir-server`

TESTS        = $(wildcard test/sql/*.sql)
REGRESS      = $(patsubst test/sql/%.sql,%,$(TESTS))
REGRESS_OPTS = --inputdir=test

PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)
