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
