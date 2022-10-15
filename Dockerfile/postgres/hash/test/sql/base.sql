CREATE EXTENSION hash;

SELECT hash('A')::hash;
SELECT hash('B')::hash;
SELECT hash('A')::hash = hash('A')::hash;
SELECT hash('A')::hash = hash('B')::hash;

SELECT hash('A')::hash <= hash('B')::hash;
SELECT hash('A')::hash <  hash('B')::hash;
SELECT hash('A')::hash >= hash('B')::hash;
SELECT hash('A')::hash >  hash('B')::hash;

CREATE TABLE test ( id hash );
INSERT INTO test SELECT hash(i::text) FROM generate_series(1,10000) s(i);
ANALYZE test;
SELECT relpages FROM pg_class WHERE relname = 'test';