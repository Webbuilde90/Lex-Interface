create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 160),
  phone text not null check (char_length(phone) between 3 and 50),
  nature text not null default 'Other / Not sure',
  message text not null default '' check (char_length(message) <= 4000)
);

alter table public.inquiries enable row level security;

drop policy if exists "Public can submit enquiries" on public.inquiries;
create policy "Public can submit enquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

revoke all on public.inquiries from anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
