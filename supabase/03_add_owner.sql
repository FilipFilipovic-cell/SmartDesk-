-- Dodaje owner_id za autentifikaciju vlasnika salona
-- Pokreni u Supabase SQL Editor -> New query -> Run
-- Nakon ovoga: samo ulogovan vlasnik može da kreira/menja/briše SVOJ salon

-- 1. Dodaj kolonu owner_id (nullable da ne puknu postojeći demo saloni)
alter table public.salons
  add column if not exists owner_id uuid references auth.users(id) on delete cascade;

create index if not exists salons_owner_id_idx on public.salons (owner_id);

-- 2. Obriši public write politike (ako si ih dodao u koraku za MVP)
drop policy if exists "salons_insert_public" on public.salons;
drop policy if exists "salons_update_public" on public.salons;
drop policy if exists "salons_delete_public" on public.salons;

-- Obriši i stare auth politike ako postoje (da ih zamenimo owner-specifičnim)
drop policy if exists "salons_insert_auth" on public.salons;
drop policy if exists "salons_update_auth" on public.salons;
drop policy if exists "salons_delete_auth" on public.salons;

-- 3. SELECT ostaje public (svi mogu da vide salone na /saloni)
-- već postoji "salons_select_all" na public — ne diraj

-- 4. NOVE politike: samo vlasnik može INSERT/UPDATE/DELETE svojih redova
-- INSERT: mora da pošalje owner_id = auth.uid()
create policy "salons_insert_owner"
  on public.salons for insert
  to authenticated
  with check (owner_id = auth.uid());

-- UPDATE: može samo gde je owner_id = auth.uid()
create policy "salons_update_owner"
  on public.salons for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- DELETE: isto
create policy "salons_delete_owner"
  on public.salons for delete
  to authenticated
  using (owner_id = auth.uid());

-- 5. (Opciono) Jedan vlasnik = jedan salon — spreči da neko napravi 10 lažnih
-- Ako želiš da dozvoliš više salona po vlasniku (Business plan), preskoči ovo.
-- Otkomentariši sledeću liniju za "1 vlasnik = 1 salon":
-- create unique index if not exists salons_owner_unique on public.salons (owner_id) where owner_id is not null;

-- 6. Dodeli postojeće demo salone na null (ostaju vidljivi svima ali ih niko ne može menjati)
-- Ako želiš da ih dodeliš sebi, nakon što se registruješ, pokreni:
-- update public.salons set owner_id = 'TV0J-USER-UUID' where owner_id is null;
