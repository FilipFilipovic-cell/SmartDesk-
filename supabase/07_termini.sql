-- Automatsko zakazivanje: tabela termini
-- Pokreni u Supabase SQL Editor -> New query -> Run
-- AI kreira termin automatski, vlasnik ga vidi u dashboardu

create table if not exists public.termini (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  klijent_ime text not null check (char_length(klijent_ime) between 2 and 80),
  klijent_telefon text check (klijent_telefon is null or char_length(klijent_telefon) between 6 and 20),
  usluga text not null check (char_length(usluga) between 2 and 80),
  pocetak timestamptz not null,
  kraj timestamptz not null,
  status text not null default 'zakazan' check (status in ('zakazan','potvrdjen','otkazan','zavrsen')),
  izvor text not null default 'ai' check (izvor in ('ai','rucno')),
  napomena text check (napomena is null or char_length(napomena) <= 300),
  created_at timestamptz not null default now(),
  check (kraj > pocetak)
);

create index if not exists termini_salon_id_idx on public.termini (salon_id);
create index if not exists termini_pocetak_idx on public.termini (pocetak);
create index if not exists termini_status_idx on public.termini (status);

-- Spreči dupli termin za isti salon u isto vreme (bez preklapanja)
-- Jednostavno: unique na salon_id + pocetak (AI proverava preklapanje u kodu)
create unique index if not exists termini_salon_pocetak_unique on public.termini (salon_id, pocetak) where status in ('zakazan','potvrdjen');

-- RLS
alter table public.termini enable row level security;

-- Public (i AI) može da kreira termin — AI je anon, zato public
drop policy if exists "termini_insert_public" on public.termini;
create policy "termini_insert_public" on public.termini for insert to public with check (true);

-- Public može da čita termine? Ne — samo vlasnik svog salona
drop policy if exists "termini_select_owner" on public.termini;
create policy "termini_select_owner" on public.termini for select to authenticated
  using (
    exists (select 1 from public.salons s where s.id = salon_id and s.owner_id = auth.uid())
  );

-- Vlasnik može update/delete svoje termine
drop policy if exists "termini_update_owner" on public.termini;
create policy "termini_update_owner" on public.termini for update to authenticated
  using (exists (select 1 from public.salons s where s.id = salon_id and s.owner_id = auth.uid()))
  with check (exists (select 1 from public.salons s where s.id = salon_id and s.owner_id = auth.uid()));

drop policy if exists "termini_delete_owner" on public.termini;
create policy "termini_delete_owner" on public.termini for delete to authenticated
  using (exists (select 1 from public.salons s where s.id = salon_id and s.owner_id = auth.uid()));

-- (Opciono) Public može da vidi samo slobodne slotove preko funkcije — ne direktno sve termine
-- Zato select za public nije dozvoljen.

-- Demo podaci (opciono)
-- insert into public.termini (salon_id, klijent_ime, usluga, pocetak, kraj) values
--   ((select id from public.salons limit 1), 'Demo Klijent', 'Šišanje', now() + interval '1 day 10:00', now() + interval '1 day 10:30');
