-- Storage: samo vlasnik može upload/delete, svi mogu read
-- Pokreni NAKON 03_add_owner.sql
-- Trenutne public write politike zamenjujemo sa authenticated (ali svaki ulogovan može upload)

-- Obriši public write politike
drop policy if exists "salon-images insert public" on storage.objects;
drop policy if exists "salon-images update public" on storage.objects;
drop policy if exists "salon-images delete public" on storage.objects;

-- Obriši stare auth politike ako postoje
drop policy if exists "salon-images insert auth" on storage.objects;
drop policy if exists "salon-images update auth" on storage.objects;
drop policy if exists "salon-images delete auth" on storage.objects;

-- SELECT ostaje public (već postoji "salon-images public read")

-- INSERT/UPDATE/DELETE: samo ulogovani (kasnije može da se veže i za owner_id preko path-a)
create policy "salon-images insert auth"
on storage.objects for insert
to authenticated
with check (bucket_id = 'salon-images');

create policy "salon-images update auth"
on storage.objects for update
to authenticated
using (bucket_id = 'salon-images');

create policy "salon-images delete auth"
on storage.objects for delete
to authenticated
using (bucket_id = 'salon-images');

-- Napomena: fajl path u kodu je `salons/<user_id>/...` ili `salons/<salon_id>/...`
-- pa u app logici proveravamo vlasništvo pre brisanja. RLS ovde samo traži da je ulogovan.
