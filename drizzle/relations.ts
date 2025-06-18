import { relations } from 'drizzle-orm/relations';
import { venues, events } from './schema';

export const eventsRelations = relations(events, ({ one }) => ({
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
}));

export const venuesRelations = relations(venues, ({ many }) => ({
  events: many(events),
}));
