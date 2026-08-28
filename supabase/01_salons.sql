-- Supabase SQL — tabela `salons`
-- Pokreni u Supabase Dashboard -> SQL Editor -> New query
-- Kolone: ime, slika, opis, kategorija (+ id, created_at, updated_at)

-- 1. Tabela
create table if not exists public.salons (
  id uuid primary key default gen_random_uuid(),
  ime text not null check (char_length(ime) between 2 and 120),
  slika text, -- public URL iz storage bucket-a `salon-images`, može biti null
  opis text check (opis is null or char_length(opis) <= 1000),
  kategorija text not null check (
    kategorija in (
      'Frizerski salon',
      'Berbernica',
      'Salon za nokte',
      'Salon lepote',
      'Spa centar',
      'Ostalo'
    )
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Index za pretragu/filter
create index if not exists salons_kategorija_idx on public.salons (kategorija);
create index if not exists salons_created_at_idx on public.salons (created_at desc);

-- 3. Trigger za auto-update `updated_at`
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_salons_updated_at on public.salons;
create trigger set_salons_updated_at
  before update on public.salons
  for each row execute function public.handle_updated_at();

-- 4. Row Level Security (RLS)
-- Za MVP: dozvoli public read, a write samo autentifikovanim korisnicima.
-- Ako želiš potpuno public write (bez auth), zameni `to authenticated` sa `to anon, authenticated`
-- ili `to public`.

alter table public.salons enable row level security;

-- Public može da čita sve salone
drop policy if exists "salons_select_all" on public.salons;
create policy "salons_select_all"
  on public.salons for select
  to public
  using (true);

-- Samo ulogovani mogu insert/update/delete
-- Za javni MVP bez auth, zakomentariši ova 3 i otkomentariši public verzije ispod
drop policy if exists "salons_insert_auth" on public.salons;
create policy "salons_insert_auth"
  on public.salons for insert
  to authenticated
  with check (true);

drop policy if exists "salons_update_auth" on public.salons;
create policy "salons_update_auth"
  on public.salons for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "salons_delete_auth" on public.salons;
create policy "salons_delete_auth"
  on public.salons for delete
  to authenticated
  using (true);

-- -- ALTERNATIVA: public write (bez auth) — koristi ako nemaš auth na sajtu
-- drop policy if exists "salons_insert_public" on public.salons;
-- create policy "salons_insert_public" on public.salons for insert to public with check (true);
-- drop policy if exists "salons_update_public" on public.salons;
-- create policy "salons_update_public" on public.salons for update to public using (true) with check (true);
-- drop policy if exists "salons_delete_public" on public.salons;
-- create policy "salons_delete_public" on public.salons for delete to public using (true);

-- 5. Demo podaci (opciono)
insert into public.salons (ime, opis, kategorija, slika) values
  ('Elite Hair Studio', 'Moderan frizerski salon u centru grada. Specijalizovani za farbanje i svečane frizure.', 'Frizerski salon', null),
  ('Blade & Fade', 'Berbernica sa tradicijom — klasično brijanje i moderni fade.', 'Berbernica', null),
  ('Nail Atelier', 'Salon za nokte — gel, manikir i nail art.', 'Salon za nokte', null)
on conflict do nothing;
