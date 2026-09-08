-- Admin odobravanje: salon mora biti odobren da bi bio javan na /saloni
-- Pokreni u Supabase SQL Editor -> New query -> Run

alter table public.salons add column if not exists odobren boolean not null default false;
create index if not exists salons_odobren_idx on public.salons (odobren);

-- Postojeći demo i tvoj salon neka budu odobreni da ne nestanu
update public.salons set odobren = true where odobren = false;

-- RLS: public sme da vidi samo odobrene
drop policy if exists "salons_select_all" on public.salons;
create policy "salons_select_all" on public.salons for select to public using (odobren = true);

-- Vlasnik sme da vidi i svoj neodobren (da vidi status u /admin/saloni)
drop policy if exists "salons_select_own" on public.salons;
create policy "salons_select_own" on public.salons for select to authenticated using (owner_id = auth.uid());

-- Admin vidi sve na čekanju (za odobravanje) — zameni email tvojim admin nalogom
drop policy if exists "salons_select_admin" on public.salons;
create policy "salons_select_admin" on public.salons for select to authenticated using ((auth.jwt() ->> 'email') = 'filipovicfilip865@gmail.com');

-- Admin može da menja odobren
drop policy if exists "salons_update_odobren" on public.salons;
create policy "salons_update_odobren" on public.salons for update to authenticated using ((auth.jwt() ->> 'email') = 'filipovicfilip865@gmail.com') with check ((auth.jwt() ->> 'email') = 'filipovicfilip865@gmail.com');

-- Napomena: ostale owner polise za update/delete ostaju, ova ih dopunjuje za odobren
