import { relations } from 'drizzle-orm/relations';
import { venues, events, agendas, eventOccurrences } from './schema';

export const venuesRelations = relations(venues, ({ many }) => ({
  agendas: many(agendas),
  events: many(events),
}));

export const agendasRelations = relations(agendas, ({ one }) => ({
  venue: one(venues, {
    fields: [agendas.venueId],
    references: [venues.id],
  }),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  venue: one(venues, {
    fields: [events.venueId],
    references: [venues.id],
  }),
  occurrences: many(eventOccurrences),
}));

export const eventOccurrencesRelations = relations(eventOccurrences, ({ one }) => ({
  event: one(events, {
    fields: [eventOccurrences.eventId],
    references: [events.id],
  }),
}));
