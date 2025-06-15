import {
  pgTable,
  bigint,
  varchar,
  text,
  timestamp,
  foreignKey,
  unique,
  boolean,
  real,
} from 'drizzle-orm/pg-core';

export const venues = pgTable('venues', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
    name: 'venues_id_seq',
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 9223372036854775807,
    cache: 1,
  }),
  name: varchar().notNull(),
  sources: text().array().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const events = pgTable(
  'events',
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
      name: 'events_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    title: text().notNull(),
    description: text().notNull(),
    summary: text().notNull(),
    freeAdmission: boolean('free_admission').default(false).notNull(),
    pricingGa: real('pricing_ga'),
    imageUrl: text('image_url'),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    venueId: bigint('venue_id', { mode: 'number' }).notNull(),
    url: text().notNull(),
    schedule: timestamp({ withTimezone: true, mode: 'string' }).array().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.venueId],
      foreignColumns: [venues.id],
      name: 'events_venue_id_fkey',
    }),
    unique('events_url_key').on(table.url),
  ]
);
