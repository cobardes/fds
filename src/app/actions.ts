"use server";

import { getEventsQuery } from "./components/types";

export async function fetchEvents(date: Date) {
  return getEventsQuery(date);
}
