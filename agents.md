# fds · Agents Brief

## TL;DR

- **fds** is a Next.js 15 App Router project that lists daily cultural events in Santiago and offers an authenticated admin workspace to seed venues and scrape-friendly agendas.
- Event data lives in Postgres and is accessed through Drizzle ORM; authentication and session management ride on Supabase (SSR helpers plus middleware-based protection).
- The public homepage renders today’s events using `getEventsQuery`, while `/panel` exposes CRUD-lite forms for venues and agendas once a Supabase session is present.

## Stack & Infrastructure

- **Framework:** Next.js 15 (App Router, React Server Components, `force-dynamic` pages) with Tailwind utilities in `globals.css`.
- **Database:** PostgreSQL queried via Drizzle (`src/index.ts` exports the client; schema + migrations under `drizzle/`).
- **Auth:** Supabase email/password flows (`utils/supabase/{server,client,middleware}.ts`) plus middleware guarding `/panel` and redirecting authenticated users away from `/login`.
- **UI Toolkit:** Hand-rolled components with `lucide-react` icons and Next/Image for event artwork.

## Data Model Highlights (`drizzle/schema.ts`)

- `venues`: name, street address, URL, optional logo.
- `events`: ties to a venue, stores description, summary, pricing flags, media, event type enum, and external URL.
- `event_occurrences`: timestamped showings linked to events (used to fan out daily schedules).
- `agendas`: source URLs (optionally per venue) that indicate whether downstream scrapers can find detail pages.

## Runtime Flow

1. `src/app/page.tsx`
   - Computes “today” (midnight-local), runs `getEventsQuery` to pull events plus occurrences for that day, filters out entries without showtimes, and renders masonry cards via `Event`.
   - `Event.tsx` formats event types, displays venue + next three times, and links out to the event’s canonical URL.
2. `src/app/panel/page.tsx`
   - Server component that loads all venues and agendas, showing administrative lists with CTAs to create new records.
3. `src/app/panel/venues/new/page.tsx` & `panel/agendas/new/page.tsx`
   - Form-driven server actions that insert into Drizzle tables and redirect back to the panel.
4. Auth middleware (`src/middleware.ts` + `utils/supabase/middleware.ts`)
   - Refreshes Supabase sessions on every request, blocks unauthenticated access to `/panel`, and bounces logged-in users away from `/login`.

## Operational Notes

- Required env vars: `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, plus Supabase service credentials used by the runtime.
- Common scripts: `npm run dev` (Next dev server), `npm run lint`, `npm run type-check`, and Drizzle migrations via `drizzle-kit` (configured in `drizzle.config.ts`).
- Images live under `public/`; fonts are instrumented in `src/app/layout.tsx`.

## Suggested Entry Points for Agents

- **Content surface:** `src/app/page.tsx`, `src/app/components/Event.tsx`, `src/app/components/types.ts`.
- **Admin features:** `src/app/panel/**` and `src/app/login/**`.
- **Auth/session plumbing:** `utils/supabase/*`, `src/middleware.ts`.
- **Database schema + migrations:** `drizzle/schema.ts`, `drizzle/*.sql`.
