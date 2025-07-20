import { relations } from "drizzle-orm/relations";

import { venues, events, eventOccurrences, agendas } from "./schema";

export const eventsRelations = relations(events, ({one, many}) => ({
	venue: one(venues, {
		fields: [events.venueId],
		references: [venues.id]
	}),
	eventOccurrences: many(eventOccurrences),
}));

export const venuesRelations = relations(venues, ({many}) => ({
	events: many(events),
	agendas: many(agendas),
}));

export const eventOccurrencesRelations = relations(eventOccurrences, ({one}) => ({
	event: one(events, {
		fields: [eventOccurrences.eventId],
		references: [events.id]
	}),
}));

export const agendasRelations = relations(agendas, ({one}) => ({
	venue: one(venues, {
		fields: [agendas.venueId],
		references: [venues.id]
	}),
}));