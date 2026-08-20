// Centralizovan sadržaj sajta (srpski). Odvojeno od UI komponenti radi lakšeg
// kasnijeg povezivanja sa CMS-om ili backendom.

export const brand = {
  name: "SmartDesk",
  tagline: "AI recepcioner vašeg salona.",
  taglineAlt: "SmartDesk odgovara na poruke. Vi se bavite klijentima.",
};

export const nav = [
  { label: "Kako funkcioniše", href: "#kako-funkcionise" },
  { label: "Mogućnosti", href: "#mogucnosti" },
  { label: "Cene", href: "#cene" },
  { label: "Pitanja", href: "#pitanja" },
];

export const hero = {
  eyebrow: "AI za salone lepote",
  title: "AI recepcioner vašeg salona.",
  subtitle:
    "SmartDesk odgovara klijentima, zakazuje termine i preuzima ponavljajuće poruke — 24 sata dnevno, 7 dana u nedelji.",
  ctaPrimary: "Počnite besplatno",
  ctaSecondary: "Pogledajte kako radi",
  microcopy: "Bez komplikovanog podešavanja. Bez propuštenih poruka. Samo više zakazanih termina.",
  floatingCards: [
    { label: "12 zakazanih termina" },
    { label: "Dostupno 24/7" },
    { label: "87 obrađenih poruka" },
  ],
  chat: {
    name: "SmartDesk",
    status: "Onlajn",
    messages: [
      { from: "client" as const, text: "Zdravo! Da li imate slobodan termin sutra popodne?" },
      { from: "bot" as const, text: "Naravno! Slobodni smo u 14:30 i 16:00. Šta vam više odgovara?" },
      { from: "client" as const, text: "14:30, molim." },
      { from: "bot" as const, text: "Sjajno! Zakazani ste za sutra u 14:30 ✨" },
    ],
    confirmation: "Termin potvrđen ✓",
  },
};

export const trustBar = {
  title: "Napravljeno za vlasnike salona koji nemaju vremena za čekanje",
  categories: ["Frizerski saloni", "Berbernice", "Saloni za nokte", "Saloni lepote", "Spa centri"],
  note: "Nikad ne propustite klijenta zato što ste bili zauzeti drugim.",
};

export const problem = {
  title: "Vaši klijenti ne čekaju.",
  subtitle:
    "Dok vi radite, poruke se gomilaju. Svaka neodgovorena poruka je potencijalno izgubljen termin.",
  cards: [
    {
      icon: "MessageSquareOff",
      title: "Propuštene poruke",
      text: "Klijenti pišu dok ste zauzeti drugim klijentom.",
    },
    {
      icon: "Repeat",
      title: "Ponavljajuća pitanja",
      text: "Svaki dan odgovarate na ista pitanja.",
    },
    {
      icon: "CalendarX",
      title: "Izgubljeni termini",
      text: "Spor odgovor često znači izgubljenu rezervaciju.",
    },
    {
      icon: "MoonStar",
      title: "Poruke van radnog vremena",
      text: "Klijenti najčešće pišu kada je salon zatvoren.",
    },
  ],
  closing: "SmartDesk sve ovo rešava automatski.",
};

export const howItWorks = {
  title: "Od poruke do termina. Automatski.",
  steps: [
    {
      number: "01",
      title: "Klijent vam piše",
      text: "Klijent šalje poruku preko povezanog kanala komunikacije.",
    },
    {
      number: "02",
      title: "SmartDesk odgovara",
      text: "SmartDesk razume pitanje i prirodno odgovara koristeći informacije o salonu.",
    },
    {
      number: "03",
      title: "Termin je zakazan",
      text: "Klijent dobija slobodan termin i potvrdu rezervacije.",
    },
  ],
  flow: ["Poruka", "AI odgovor", "Zakazan termin"],
};

export type Feature = {
  icon: string;
  title: string;
  text: string;
  note?: string;
};

export const features: Feature[] = [
  {
    icon: "MessagesSquare",
    title: "AI razgovori",
    text: "SmartDesk prirodno komunicira sa vašim klijentima.",
  },
  {
    icon: "CalendarCheck2",
    title: "Zakazivanje termina",
    text: "Pomaže klijentima da pronađu slobodan termin.",
  },
  {
    icon: "Clock",
    title: "Dostupnost 24/7",
    text: "Vaš salon odgovara i kada je zatvoren.",
  },
  {
    icon: "CircleHelp",
    title: "Automatski odgovori na česta pitanja",
    text: "Odgovara na pitanja o cenama, uslugama, lokaciji, radnom vremenu i drugom.",
  },
  {
    icon: "UserRound",
    title: "Informacije o klijentima",
    text: "Održava razgovore organizovanim i preglednim.",
  },
  {
    icon: "BellRing",
    title: "Pametna obaveštenja",
    text: "Obaveštava salon kada je potrebna ljudska intervencija.",
  },
  {
    icon: "Share2",
    title: "Više kanala komunikacije",
    text: "Povežite kanale koje vaši klijenti već koriste.",
    note: "Arhitektura je spremna za integracije poput Instagrama, WhatsApp-a, Facebook Messenger-a i sajt chata.",
  },
  {
    icon: "Handshake",
    title: "Predaja razgovora osoblju",
    text: "Kada je razgovoru potreban čovek, SmartDesk ga prosleđuje osoblju salona.",
  },
];

export const dashboardDemo = {
  greeting: "Dobro jutro 👋",
  sidebar: ["Pregled", "Razgovori", "Termini", "Klijenti", "Baza znanja", "Podešavanja"],
  cards: [
    { label: "Termini", value: "24" },
    { label: "Obrađene poruke", value: "187" },
    { label: "Vreme odgovora", value: "< 1 min" },
    { label: "Opsluženi klijenti", value: "143" },
  ],
  conversations: [
    { name: "Jovana M.", preview: "Da li radite nedeljom?", time: "09:14" },
    { name: "Miloš P.", preview: "Hvala, vidimo se sutra!", time: "08:52" },
    { name: "Ana K.", preview: "Koliko traje farbanje?", time: "08:20" },
  ],
  appointments: [
    { time: "10:00", client: "Nina R.", service: "Šišanje" },
    { time: "11:30", client: "Marko S.", service: "Brada" },
    { time: "14:30", client: "Jovana M.", service: "Farbanje" },
  ],
  activity: [
    "SmartDesk je odgovorio klijentkinji Ani K.",
    "Zakazan novi termin za 14:30",
    "Razgovor prosleđen osoblju",
  ],
};

export const roi = {
  title: "Koliko vredi propušten klijent?",
  text: "Zamislite da mesečno primite 40 poruka od potencijalnih klijenata. Ako samo deo njih postane redovan klijent, SmartDesk lako pokrije sopstvenu cenu.",
  disclaimer: "Ovo su procenjene vrednosti za ilustraciju, ne garancija prihoda.",
  calculator: {
    messagesLabel: "Broj poruka dnevno",
    valueLabel: "Prosečna vrednost termina",
    resultLabel: "Potencijalno zaštićen mesečni prihod",
  },
};

export type PricingPlan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 39,
    priceYearly: 31,
    description: "Za male salone.",
    features: [
      "AI recepcioner",
      "Automatski odgovori na česta pitanja",
      "Osnovno zakazivanje termina",
      "Dostupnost 24/7",
    ],
    cta: "Počnite besplatno",
  },
  {
    id: "professional",
    name: "Professional",
    priceMonthly: 59,
    priceYearly: 47,
    description: "Za salone koji rastu.",
    features: [
      "Sve iz Starter plana",
      "Zakazivanje termina",
      "Napredni razgovori",
      "Više kanala komunikacije",
      "Upravljanje klijentima",
      "Analitika",
      "Predaja razgovora osoblju",
    ],
    cta: "Počnite besplatno",
    highlighted: true,
    badge: "Najpopularniji",
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 99,
    priceYearly: 79,
    description: "Za salone sa više lokacija.",
    features: [
      "Sve iz Professional plana",
      "Više lokacija",
      "Napredna analitika",
      "Prioritetna podrška",
      "Prilagođeno AI podešavanje",
    ],
    cta: "Kontaktirajte nas",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// DEMO sadržaj — placeholder testimoniali dok ne budu prikupljeni pravi.
export const testimonials: Testimonial[] = [
  {
    quote:
      "SmartDesk mi štedi sate svake nedelje. Ne moram da prekidam rad da bih iznova odgovarala na ista pitanja.",
    name: "Sara",
    role: "Vlasnica salona",
  },
  {
    quote:
      "Klijenti sada dobijaju odgovor odmah, čak i kad smo zatvoreni. Manje propuštenih termina, manje stresa.",
    name: "Nikola",
    role: "Vlasnik berbernice",
  },
  {
    quote:
      "Konačno ne moram da biram između klijenta ispred mene i telefona koji zvoni.",
    name: "Milica",
    role: "Vlasnica salona za nokte",
  },
];

export const security = {
  title: "Vaši klijenti. Vaši podaci. Vaša kontrola.",
  text: "SmartDesk je osmišljen imajući u vidu privatnost i bezbednost podataka.",
  points: [
    "Bezbedna infrastruktura",
    "Zaštita podataka",
    "Pristup zasnovan na ulogama",
    "Kontrola od strane čoveka",
    "Arhitektura usmerena na privatnost",
  ],
};

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Šta je SmartDesk?",
    answer:
      "SmartDesk je AI recepcioner za salone lepote koji odgovara na poruke klijenata, pomaže u zakazivanju termina i preuzima ponavljajuće zadatke — tako da vi možete da se posvetite klijentu koji je fizički ispred vas.",
  },
  {
    question: "Da li SmartDesk zamenjuje moje zaposlene?",
    answer:
      "Ne. SmartDesk pomaže vašem osoblju tako što automatizuje ponavljajuće zadatke i odgovara na uobičajena pitanja. Za sve što zahteva ljudsku procenu, razgovor se prosleđuje vama ili vašem timu.",
  },
  {
    question: "Da li SmartDesk može da zakazuje termine?",
    answer:
      "Da. SmartDesk pomaže klijentima da pronađu i rezervišu slobodan termin u skladu sa vašim rasporedom.",
  },
  {
    question: "Da li mogu da prilagodim kako SmartDesk odgovara?",
    answer:
      "Da, ton i sadržaj odgovora mogu se prilagoditi informacijama i stilu vašeg salona.",
  },
  {
    question: "Šta se dešava kada klijent pita nešto što SmartDesk ne zna?",
    answer:
      "Razgovor se automatski prosleđuje vama ili vašem osoblju, kako klijent ne bi ostao bez odgovora.",
  },
  {
    question: "Da li mogu da povežem Instagram ili WhatsApp?",
    answer:
      "Podrška za pojedine kanale zavisi od izabranog plana i trenutno dostupnih integracija. Arhitektura je pripremljena za ovakva povezivanja.",
  },
  {
    question: "Da li mogu da otkažem u bilo kom trenutku?",
    answer: "Da, pretplatu možete otkazati kad god želite, bez dodatnih obaveza.",
  },
  {
    question: "Da li postoji besplatan probni period?",
    answer:
      "Detalji o probnom periodu biće dostupni prilikom registracije. Konfiguracija se lako prilagođava kada period bude aktivan.",
  },
];

export const finalCta = {
  title: "Prestanite da propuštate poruke. Počnite da zakazujete više klijenata.",
  text: "Neka SmartDesk vodi razgovore dok se vi posvećujete klijentima.",
  ctaPrimary: "Počnite odmah",
  ctaSecondary: "Zakažite demo",
};

export const footer = {
  tagline: "AI recepcioner vašeg salona.",
  productLinks: [
    { label: "Mogućnosti", href: "#mogucnosti" },
    { label: "Kako funkcioniše", href: "#kako-funkcionise" },
    { label: "Cene", href: "#cene" },
  ],
  companyLinks: [
    { label: "O nama", href: "#" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Privatnost", href: "#" },
    { label: "Uslovi korišćenja", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  copyright: "© 2026 SmartDesk. Sva prava zadržana.",
};
