-- Dodaje kolone grad i radno_vreme za salone
-- Pokreni u Supabase SQL Editor -> New query -> Run
alter table public.salons
  add column if not exists grad text check (grad is null or char_length(grad) between 2 and 60);
create index if not exists salons_grad_idx on public.salons (grad);

alter table public.salons
  add column if not exists radno_vreme text check (radno_vreme is null or char_length(radno_vreme) between 2 and 100);
create index if not exists salons_radno_vreme_idx on public.salons (radno_vreme);

-- Ako želiš da grad bude obavezan za nove salone, a stari ostanu null, ostavi ovako.
-- Za strože: alter table public.salons alter column grad set not null; -- tek nakon što popuniš postojeće
