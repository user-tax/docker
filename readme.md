CREATE TABLE public.user_mail
(
    id bigserial NOT NULL,
    oid u64 NOT NULL,
    uid u64 NOT NULL,
    mail_id u64 NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "user_mail.oid.mail_id" UNIQUE (oid, mail_id)
);

ALTER TABLE IF EXISTS public.user_mail OWNER to "user.tax";
ALTER TABLE public.user_mail ALTER COLUMN id TYPE u64;

CREATE TABLE public.user_password
(
    id bigserial NOT NULL,
    oid u64 NOT NULL,
    uid u64 NOT NULL,
    hash md5hash,
    ctime u64 NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "user_mail.oid.uid" UNIQUE (oid, uid)
);

ALTER TABLE IF EXISTS public.user_password OWNER to "user.tax";
ALTER TABLE public.user_password ALTER COLUMN id TYPE u64;

CREATE TABLE public.user_log
(
    id bigserial NOT NULL,
    oid u64 NOT NULL,
    cid u16 NOT NULL,
    uid u64 NOT NULL,
    val bytea NOT NULL DEFAULT '',
    ctime u64 NOT NULL DEFAULT default date_part('epoch', now()),
    PRIMARY KEY (id),
    CONSTRAINT "user_mail.oid.uid" UNIQUE (oid, uid)
);

ALTER TABLE IF EXISTS public.user_log OWNER to "user.tax";
ALTER TABLE public.user_log ALTER COLUMN id TYPE u64;
