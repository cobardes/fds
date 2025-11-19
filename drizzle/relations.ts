import { relations } from "drizzle-orm/relations";

import { venues, agendas, events, eventOccurrences } from "./schema";

export const agendasRelations = relations(agendas, ({one}) => ({
	venue: one(venues, {
		fields: [agendas.venueId],
		references: [venues.id]
	}),
}));

export const venuesRelations = relations(venues, ({many}) => ({
	agendas: many(agendas),
	events: many(events),
}));

export const eventOccurrencesRelations = relations(eventOccurrences, ({one}) => ({
	event: one(events, {
		fields: [eventOccurrences.eventId],
		references: [events.id]
	}),
}));

export const eventsRelations = relations(events, ({one, many}) => ({
	eventOccurrences: many(eventOccurrences),
	venue: one(venues, {
		fields: [events.venueId],
		references: [venues.id]
	}),
}));