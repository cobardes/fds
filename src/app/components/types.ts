import { and, asc, eq, gte, lt, sql } from "drizzle-orm";

import { eventOccurrences, events, venues } from "@/drizzle/schema";
import { db } from "@/index";

// Define query structure to infer types
export const getEventsQuery = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const startOfDayIso = startOfDay.toISOString();
  const endOfDayIso = endOfDay.toISOString();

  const occurrencesAggregate = sql<string[]>`
    coalesce(
      json_agg(${eventOccurrences.occursAt} ORDER BY ${eventOccurrences.occursAt}),
      '[]'::json
    )
  `;

  const firstOccurrenceOrder = sql`
    min(${eventOccurrences.occursAt})
  `;

  return db
    .select({
      event: events,
      venue: venues,
      occurrences: occurrencesAggregate,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .leftJoin(eventOccurrences, eq(events.id, eventOccurrences.eventId))
    .where(
      and(gte(eventOccurrences.occursAt, startOfDayIso), lt(eventOccurrences.occursAt, endOfDayIso))
    )
    .groupBy(events.id, venues.id)
    .orderBy(asc(firstOccurrenceOrder))
    .limit(35);
};

export type EventData = Awaited<ReturnType<typeof getEventsQuery>>[number];
