import { eq, gte, asc } from "drizzle-orm";

import { eventOccurrences, events, venues } from "@/drizzle/schema";
import { db } from "@/index";

// Define query structure to infer types
export const getEventsQuery = () => {
  const nowIso = new Date().toISOString();
  return db
    .select({
      event: events,
      venue: venues,
      occursAt: eventOccurrences.occursAt,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id))
    .leftJoin(eventOccurrences, eq(events.id, eventOccurrences.eventId))
    .where(gte(eventOccurrences.occursAt, nowIso))
    .orderBy(asc(eventOccurrences.occursAt))
    .limit(35);
};

export type EventData = Awaited<ReturnType<typeof getEventsQuery>>[number];
