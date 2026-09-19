# Lex Interface

The Lex Interface website is a responsive Next.js App Router experience for a contemporary Indian law firm. It is built around the “Brief in Motion” visual direction: ink navy, paper white, Lex orange, editorial typography, and carefully loaded legal 3D assets.

## Included

- Multi-page routes for Home, Firm, Practice, People, Careers, and Contact.
- Shared active-location rail on desktop and touch-friendly navigation on mobile.
- Responsive typography and layout with a low-bandwidth mobile 3D fallback.
- Supplied `judges_gavel.glb` and Lady Justice model integrated from `/public/models`.
- Supabase-backed enquiry form with RLS and no service-role key in the browser.
- Accessible labels, keyboard-friendly accordions, click-to-call and Google Maps links.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`. The production schema is documented in `supabase/migrations/202609150001_create_inquiries.sql`.

## Content boundary

The site uses only the firm facts supplied in the brief and the public LinkedIn listing. Detailed biographies and Bar-enrolment information are intentionally not invented. The contact form warns visitors not to share confidential details and states that submission does not create an attorney-client relationship.
