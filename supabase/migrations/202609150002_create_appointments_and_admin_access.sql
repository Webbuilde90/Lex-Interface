create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 160),
  phone text not null check (char_length(phone) between 3 and 50),
  preferred_date date not null,
  preferred_time text not null check (preferred_time in ('Morning (10:00–12:00)', 'Afternoon (12:00–15:00)', 'Evening (15:00–18:00)')),
  nature text not null default 'Other / Not sure',
  message text not null default '' check (char_length(message) <= 4000),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined', 'completed'))
);

alter table public.appointments enable row level security;
revoke all on public.appointments from anon, authenticated;
grant insert on public.appointments to anon, authenticated;
grant select, update on public.appointments to authenticated;

drop policy if exists "Public can request appointments" on public.appointments;
create policy "Public can request appointments"
  on public.appointments for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can view appointments" on public.appointments;
create policy "Admins can view appointments"
  on public.appointments for select
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'connect@lexlawoffices.com');

drop policy if exists "Admins can update appointments" on public.appointments;
create policy "Admins can update appointments"
  on public.appointments for update
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'connect@lexlawoffices.com')
  with check ((select auth.jwt() ->> 'email') = 'connect@lexlawoffices.com');

alter table public.inquiries add column if not exists status text not null default 'new';
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'inquiries_status_check') then
    alter table public.inquiries add constraint inquiries_status_check check (status in ('new', 'reviewing', 'closed'));
  end if;
end $$;

grant select, update on public.inquiries to authenticated;

drop policy if exists "Admins can view enquiries" on public.inquiries;
create policy "Admins can view enquiries"
  on public.inquiries for select
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'connect@lexlawoffices.com');

drop policy if exists "Admins can update enquiries" on public.inquiries;
create policy "Admins can update enquiries"
  on public.inquiries for update
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'connect@lexlawoffices.com')
  with check ((select auth.jwt() ->> 'email') = 'connect@lexlawoffices.com');

