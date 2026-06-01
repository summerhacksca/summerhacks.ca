-- Minimal table setup for application form submissions in public schema.
-- Run this manually in Supabase SQL editor (or psql) before using /api/application/submit.

create table if not exists public.application_submissions (
  id uuid primary key default gen_random_uuid(),
  applicant_email text,
  application_data jsonb not null,
  created_at timestamptz not null default now(),
  constraint application_submissions_application_data_object
    check (jsonb_typeof(application_data) = 'object')
);

create index if not exists application_submissions_created_at_idx
  on public.application_submissions (created_at desc);

create index if not exists application_submissions_email_idx
  on public.application_submissions (applicant_email);
