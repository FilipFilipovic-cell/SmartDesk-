-- Demo seed: dopuni postojeće demo salone sa grad i radno_vreme
-- Pokreni NAKON 05_add_grad.sql
-- Ako saloni već imaju grad/radno_vreme, neće ih pregaziti (samo gde je null)

update public.salons set grad = 'Beograd', radno_vreme = 'Pon-Pet 09:00-20:00, Sub 09:00-15:00'
where ime = 'Elite Hair Studio' and (grad is null or radno_vreme is null);

update public.salons set grad = 'Novi Sad', radno_vreme = 'Pon-Sub 10:00-20:00'
where ime = 'Blade & Fade' and (grad is null or radno_vreme is null);

update public.salons set grad = 'Beograd', radno_vreme = 'Pon-Pet 09:00-19:00'
where ime = 'Nail Atelier' and (grad is null or radno_vreme is null);

-- Provera:
-- select ime, grad, radno_vreme from public.salons;
