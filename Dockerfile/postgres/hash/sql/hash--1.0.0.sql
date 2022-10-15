CREATE TYPE hash;

-- input/output function
CREATE FUNCTION hash_in(cstring)           RETURNS hash AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_out(hash)          RETURNS cstring AS 'hash' LANGUAGE C IMMUTABLE STRICT;

-- functions backing operators (and btree opclass)
CREATE FUNCTION hash_eq(hash, hash)  RETURNS boolean AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_neq(hash, hash) RETURNS boolean AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_leq(hash, hash) RETURNS boolean AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_lt(hash, hash)  RETURNS boolean AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_geq(hash, hash) RETURNS boolean AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_gt(hash, hash)  RETURNS boolean AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_cmp(hash, hash) RETURNS int     AS 'hash' LANGUAGE C IMMUTABLE STRICT;

CREATE FUNCTION hash_recv(internal)        RETURNS hash AS 'hash' LANGUAGE C IMMUTABLE STRICT;
CREATE FUNCTION hash_send(hash)         RETURNS bytea   AS 'hash' LANGUAGE C IMMUTABLE STRICT;

CREATE TYPE hash (
    INPUT = hash_in,
    OUTPUT = hash_out,
    INTERNALLENGTH = 16,
    SEND = hash_send,
    RECEIVE = hash_recv
);

-- some basic support for implicit casts
CREATE CAST (hash AS text) WITH INOUT AS IMPLICIT;
CREATE CAST (text AS hash) WITH INOUT AS IMPLICIT;

CREATE OPERATOR = (
    PROCEDURE = hash_eq,
    LEFTARG = hash,
    RIGHTARG = hash,
    COMMUTATOR = =,
    NEGATOR = <>,
    RESTRICT = eqsel,
    JOIN = eqjoinsel,
    MERGES,
    HASHES
);

CREATE OPERATOR <> (
    PROCEDURE = hash_neq,
    LEFTARG = hash,
    RIGHTARG = hash,
    COMMUTATOR = <>,
    NEGATOR = =,
    RESTRICT = neqsel,
    JOIN = neqjoinsel
);

CREATE OPERATOR < (
    PROCEDURE = hash_lt,
    LEFTARG = hash,
    RIGHTARG = hash,
    COMMUTATOR = >,
    NEGATOR = >=,
    RESTRICT = scalarltsel,
    JOIN = scalarltjoinsel
);

CREATE OPERATOR > (
    PROCEDURE = hash_gt,
    LEFTARG = hash,
    RIGHTARG = hash,
    COMMUTATOR = <,
    NEGATOR = <=,
    RESTRICT = scalargtsel,
    JOIN = scalargtjoinsel
);

CREATE OPERATOR <= (
    PROCEDURE = hash_leq,
    LEFTARG = hash,
    RIGHTARG = hash,
    COMMUTATOR = >=,
    NEGATOR = >,
    RESTRICT = scalarltsel,
    JOIN = scalarltjoinsel
);

CREATE OPERATOR >= (
    PROCEDURE = hash_geq,
    LEFTARG = hash,
    RIGHTARG = hash,
    COMMUTATOR = <=,
    NEGATOR = <,
    RESTRICT = scalargtsel,
    JOIN = scalargtjoinsel
);

CREATE OPERATOR CLASS btree_hash_ops
DEFAULT FOR TYPE hash USING btree
AS
        OPERATOR        1       <,
        OPERATOR        2       <=,
        OPERATOR        3       =,
        OPERATOR        4       >= ,
        OPERATOR        5       > ,
        FUNCTION        1       hash_cmp(hash, hash);
