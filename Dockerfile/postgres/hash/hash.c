/*
 * hash.c - data type representing hash hash values (128-bit)
 *
 * Copyright (C) Tomas Vondra, 2011
 */

#include "postgres.h"
#include <string.h>

#include "fmgr.h"

#include "access/htup.h"
#include "lib/stringinfo.h"
#include "libpq/pqformat.h"

#ifdef PG_MODULE_MAGIC
PG_MODULE_MAGIC;
#endif

#define HASH_BYTES 16
#define HASH_CHARS (HASH_BYTES * 2)
#define HASH_LENGTH (HASH_CHARS + 1)

PG_FUNCTION_INFO_V1(hash_in);
PG_FUNCTION_INFO_V1(hash_out);

PG_FUNCTION_INFO_V1(hash_recv);
PG_FUNCTION_INFO_V1(hash_send);

PG_FUNCTION_INFO_V1(hash_eq);
PG_FUNCTION_INFO_V1(hash_neq);

PG_FUNCTION_INFO_V1(hash_leq);
PG_FUNCTION_INFO_V1(hash_lt);

PG_FUNCTION_INFO_V1(hash_geq);
PG_FUNCTION_INFO_V1(hash_gt);
PG_FUNCTION_INFO_V1(hash_cmp);

Datum hash_in(PG_FUNCTION_ARGS);
Datum hash_out(PG_FUNCTION_ARGS);

Datum hash_eq(PG_FUNCTION_ARGS);
Datum hash_neq(PG_FUNCTION_ARGS);

Datum hash_leq(PG_FUNCTION_ARGS);
Datum hash_lt(PG_FUNCTION_ARGS);

Datum hash_geq(PG_FUNCTION_ARGS);
Datum hash_gt(PG_FUNCTION_ARGS);

Datum hash_cmp(PG_FUNCTION_ARGS);

Datum hash_recv(PG_FUNCTION_ARGS);
Datum hash_send(PG_FUNCTION_ARGS);

typedef struct hash_t {
  unsigned char bytes[HASH_BYTES];
} hash_t;

__inline__ static char decode(char byte[2]);

/* encode binary value (unsigned char) as a hex value */

__inline__ static char
decode(char byte[2])
{
  unsigned char result = 0;

  /* process two characters at once */
  unsigned char a = toupper(byte[0]);
  unsigned char b = toupper(byte[1]);

  if (a >= 48 && a <= 57)
    result = 16 * (a - 48);
  else
    result = 16 * (a - 65 + 10);

  if (b >= 48 && b <= 57)
    result += (b - 48);
  else
    result += (b - 65 + 10);

  return result;
}

Datum hash_in(PG_FUNCTION_ARGS)
{
  hash_t* result;
  bytea* data = PG_GETARG_BYTEA_PP(0);
  char* raw_data = VARDATA_ANY(data);
  uint32 data_length = VARSIZE_ANY(data);
  if (data_length != 16)
    ereport(ERROR,
        (errcode(ERRCODE_INVALID_TEXT_REPRESENTATION),
            errmsg("invalid input length for hash: expected 16")));

  result = (hash_t*)palloc(sizeof(hash_t));
  memcpy(result->bytes, raw_data, HASH_BYTES);

  PG_RETURN_POINTER(result);
}

Datum hash_out(PG_FUNCTION_ARGS)
{
  hash_t* hash = (hash_t*)PG_GETARG_POINTER(0);

  bytea* data;
  data = palloc(HASH_BYTES);
  SET_VARSIZE(data, HASH_BYTES);
  memcpy(hash->bytes, data, HASH_BYTES);
  PG_RETURN_POINTER(data);
}

Datum hash_eq(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_BOOL(r == 0);
}

Datum hash_neq(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_BOOL(r != 0);
}

Datum hash_leq(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_BOOL(r <= 0);
}

Datum hash_lt(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_BOOL(r < 0);
}

Datum hash_geq(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_BOOL(r >= 0);
}

Datum hash_gt(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_BOOL(r > 0);
}

Datum hash_cmp(PG_FUNCTION_ARGS)
{
  hash_t* a = (hash_t*)PG_GETARG_POINTER(0);
  hash_t* b = (hash_t*)PG_GETARG_POINTER(1);

  int r = memcmp(a->bytes, b->bytes, HASH_BYTES);

  PG_RETURN_INT32(r);
}

Datum hash_recv(PG_FUNCTION_ARGS)
{
  StringInfo buf = (StringInfo)PG_GETARG_POINTER(0);
  hash_t* result;

  result = (hash_t*)palloc(sizeof(hash_t));
  pq_copymsgbytes(buf, (char*)result->bytes, HASH_BYTES);

  PG_RETURN_POINTER(result);
}

Datum hash_send(PG_FUNCTION_ARGS)
{
  hash_t* hash = (hash_t*)PG_GETARG_POINTER(0);
  StringInfoData buf;

  pq_begintypsend(&buf);
  pq_sendbytes(&buf, (char*)hash->bytes, HASH_BYTES);

  PG_RETURN_BYTEA_P(pq_endtypsend(&buf));
}
