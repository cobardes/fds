import {
  pgTable,
  bigint,
  text,
  boolean,
  doublePrecision,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define the event_type enum
export const eventTypeEnum = pgEnum('event_type', [
  'theater',
  'fair',
  'festival',
  'concert',
  'exhibition',
  'food_and_drinks',
  'movie_screening',
  'workshop',
  'party',
  'other',
]);

// Venues table
export const venues = pgTable('venues', {
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  name: text('name').notNull(),
  streetAddress: text('street_address').notNull(),
  url: text('url').notNull(),
  logoUrl: text('logo_url'),
});

// Agendas table
export const agendas = pgTable('agendas', {
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  url: text('url').notNull(),
  venueId: bigint('venue_id', { mode: 'number' }),
  hasDetailUrls: boolean('has_detail_urls').default(true),
});

// Events table
export const events = pgTable('events', {
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  eventType: eventTypeEnum('event_type').notNull(),
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  description: text('description').notNull(),
  freeAdmission: boolean('free_admission').notNull(),
  registrationRequired: boolean('registration_required'),
  fromPrice: doublePrecision('from_price'),
  soldOut: boolean('sold_out'),
  imageUrl: text('image_url'),
  venueDetails: text('venue_details'), // Extra details, eg. "Sala Roberto Bolaño"
  venueId: bigint('venue_id', { mode: 'number' }).notNull(),
});

export const eventOccurrences = pgTable('event_occurrences', {
  id: bigint('id', { mode: 'number' }).generatedByDefaultAsIdentity().primaryKey(),
  eventId: bigint('event_id', { mode: 'number' }).notNull(),
  occursAt: timestamp('occurs_at', { withTimezone: true }).notNull(),
});
