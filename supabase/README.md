# Supabase setup — SmartDesk saloni

## 1. Kreiraj Supabase projekat
1. Idi na https://supabase.com -> New project
2. Sačekaj da se DB inicijalizuje
3. Otvori **Project Settings -> API** i kopiraj:
   - `Project URL` -> `VITE_SUPABASE_URL`
   - `anon public` key -> `VITE_SUPABASE_ANON_KEY`

## 2. Podesi lokalni `.env`
```bash
cp .env.example .env
# popuni vrednosti u .env
```

## 3. Pokreni SQL

U **Supabase Dashboard -> SQL Editor -> New query**, pokreni redom:

1. `supabase/01_salons.sql` — kreira tabelu `public.salons` (ime, slika, opis, kategorija)
2. `supabase/02_storage.sql` — kreira `salon-images` bucket + RLS politike

> Alternativno bucket možeš kreirati i preko UI: **Storage -> New bucket -> Name: `salon-images` -> Public: ON**

## 4. Proveri

```sql
select * from public.salons;
-- treba da vrati 3 demo salona
```

Storage: idi na **Storage -> salon-images** — treba da je public i prazan.

## 5. Storage podešavanja (preporučeno)

U **Storage -> salon-images -> Configuration**:

- Allowed MIME types: `image/jpeg, image/png, image/webp, image/avif`
- Max file size: `5MB`

## 6. RLS napomena

- **Read**: `public` — svako može da čita salone i slike (landing/demo stranice)
- **Write**: `authenticated` — samo ulogovani korisnici mogu insert/update/delete

Ako još nemaš auth na sajtu i želiš da testiraš public write:
u oba SQL fajla otkomentariši `public` politike i zakomentariši `authenticated` politike.

## 7. Korišćenje u kodu

```ts
import { getSalons, createSalonWithImage, SALON_KATEGORIJE } from "@/lib/salons";
import { isSupabaseConfigured } from "@/lib/supabase";

// Lista svih salona
const saloni = await getSalons();

// Kreiranje sa slikom
await createSalonWithImage(
  { ime: "Moj salon", opis: "Opis...", kategorija: "Frizerski salon" },
  fileFromInput // File | null
);
```

Vidi `src/lib/salons.ts` za sve funkcije i `src/components/SalonForm.example.tsx` za primer forme.
