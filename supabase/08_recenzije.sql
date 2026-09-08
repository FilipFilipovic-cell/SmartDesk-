-- Recenzije/ocene za salone
-- Pokreni u Supabase SQL Editor -> New query -> Run

create table if not exists public.recenzije (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references public.salons(id) on delete cascade,
  klijent_ime text not null check (char_length(klijent_ime) between 2 and 60),
  ocena smallint not null check (ocena between 1 and 5),
  komentar text check (komentar is null or char_length(komentar) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists recenzije_salon_id_idx on public.recenzije (salon_id);
create index if not exists recenzije_ocena_idx on public.recenzije (ocena);
create index if not exists recenzije_created_at_idx on public.recenzije (created_at desc);

alter table public.recenzije enable row level security;

-- Svi mogu da čitaju recenzije (public na /saloni/:id)
drop policy if exists "recenzije_select_public" on public.recenzije;
create policy "recenzije_select_public" on public.recenzije for select to public using (true);

-- Svi (anon + auth) mogu da ostave recenziju — za produkciju može i samo auth
drop policy if exists "recenzije_insert_public" on public.recenzije;
create policy "recenzije_insert_public" on public.recenzije for insert to anon, authenticated, public with check (true);

-- Dozvoli anon/auth insert grant
grant select on public.recenzije to anon, authenticated, public;
grant insert on public.recenzije to anon, authenticated, public;

-- (Opciono) omogući brisanje samo vlasniku salona - ne treba za demo
