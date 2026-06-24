-- Minimal table setup for application form submissions in public schema.
-- Run this manually in Supabase SQL editor (or psql) before using /api/application/submit.

create table if not exists public.application_submissions (
  id uuid primary key default gen_random_uuid(),
  applicant_email text,
  application_data jsonb not null,
  created_at timestamptz not null default now(),
  constraint application_submissions_application_data_object
    check (jsonb_typeof(application_data) = 'object'),
  -- Prevents authenticated users from submitting more than once.
  -- The API route also returns a 409 on this error code (23505).
  constraint application_submissions_email_unique unique (applicant_email)
);

create index if not exists application_submissions_created_at_idx
  on public.application_submissions (created_at desc);

create index if not exists application_submissions_email_idx
  on public.application_submissions (applicant_email);

-- SECURITY: Enable Row-Level Security.
-- All reads/writes go through the service-role key (which bypasses RLS),
-- so no permissive policies are needed. This blocks the public anon key
-- from reading submitted applications directly via the Supabase REST API.
alter table public.application_submissions enable row level security;
