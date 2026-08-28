-- Supabase Storage — bucket `salon-images` za slike salona
-- Pokreni u SQL Editor NAKON što kreiraš bucket (vidi uputstvo ispod)
-- Alternativa GUI: Storage -> New bucket -> Name: salon-images -> Public: ON

-- 1. Kreiraj bucket (ako ne postoji) — preko SQL
insert into storage.buckets (id, name, public)
values ('salon-images', 'salon-images', true)
on conflict (id) do update set public = true;

-- 2. RLS politike za storage.objects
-- Dozvoli public read (da slike budu vidljive svima)
-- Write dozvoli autentifikovanim korisnicima (ili public ako nemaš auth)

-- Uključi RLS (već je uključen na storage.objects, ali bezbedno)
-- alter table storage.objects enable row level security; -- već je enabled, ne dirati

-- SELECT (public read)
drop policy if exists "salon-images public read" on storage.objects;
create policy "salon-images public read"
on storage.objects for select
to public
using (bucket_id = 'salon-images');

-- INSERT (upload) — za MVP: authenticated, za bez auth koristi `to public`
drop policy if exists "salon-images insert auth" on storage.objects;
create policy "salon-images insert auth"
on storage.objects for insert
to authenticated
with check (bucket_id = 'salon-images');

-- UPDATE — authenticated
drop policy if exists "salon-images update auth" on storage.objects;
create policy "salon-images update auth"
on storage.objects for update
to authenticated
using (bucket_id = 'salon-images');

-- DELETE — authenticated
drop policy if exists "salon-images delete auth" on storage.objects;
create policy "salon-images delete auth"
on storage.objects for delete
to authenticated
using (bucket_id = 'salon-images');

-- -- ALTERNATIVA: public write (bez auth) — otkomentariši ako želiš da svako može da uploaduje
-- drop policy if exists "salon-images insert public" on storage.objects;
-- create policy "salon-images insert public" on storage.objects for insert to public with check (bucket_id = 'salon-images');
-- drop policy if exists "salon-images update public" on storage.objects;
-- create policy "salon-images update public" on storage.objects for update to public using (bucket_id = 'salon-images');
-- drop policy if exists "salon-images delete public" on storage.objects;
-- create policy "salon-images delete public" on storage.objects for delete to public using (bucket_id = 'salon-images');

-- 3. Ograničenja (opciono, preko SQL ne može direktno — podesi u Dashboard -> Storage -> salon-images -> Configuration):
-- - Allowed MIME types: image/jpeg, image/png, image/webp, image/avif
-- - Max file size: 5MB
-- - Ako želiš, možeš dodati i file size check preko `storage.objects` trigger-a, ali za MVP nije potrebno.
