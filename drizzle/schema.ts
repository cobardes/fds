import { bigint, boolean, doublePrecision, foreignKey, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const eventType = pgEnum("event_type", ['theater', 'fair', 'festival', 'concert', 'exhibition', 'food_and_drinks', 'movie_screening', 'workshop', 'party', 'other'])


export const venues = pgTable("venues", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "venues_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	name: text().notNull(),
	streetAddress: text("street_address").notNull(),
	url: text().notNull(),
	logoUrl: text("logo_url"),
});

export const agendas = pgTable("agendas", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "agendas_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	url: text().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	venueId: bigint("venue_id", { mode: "number" }),
	hasDetailUrls: boolean("has_detail_urls").default(true),
	enabled: boolean().default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "agendas_venue_id_venues_id_fk"
		}),
]);

export const eventOccurrences = pgTable("event_occurrences", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "event_occurrences_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	eventId: bigint("event_id", { mode: "number" }).notNull(),
	occursAt: timestamp("occurs_at", { withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "event_occurrences_event_id_events_id_fk"
		}),
]);

export const events = pgTable("events", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "events_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	title: text().notNull(),
	description: text().notNull(),
	summary: text().notNull(),
	freeAdmission: boolean("free_admission").notNull(),
	fromPrice: doublePrecision("from_price"),
	imageUrl: text("image_url"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	venueId: bigint("venue_id", { mode: "number" }).notNull(),
	eventType: eventType("event_type").notNull(),
	registrationRequired: boolean("registration_required"),
	soldOut: boolean("sold_out"),
	venueDetails: text("venue_details"),
	url: text().notNull(),
	isOngoing: boolean("is_ongoing").default(false).notNull(),
	isVisible: boolean("is_visible").default(true).notNull(),
	isReviewed: boolean("is_reviewed").default(false).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.venueId],
			foreignColumns: [venues.id],
			name: "events_venue_id_venues_id_fk"
		}),
]);
