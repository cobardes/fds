"use client";

import { useState, useTransition } from "react";

import { fetchEvents } from "../actions";
import { Event } from "./Event";
import { type EventData } from "./types";

interface ClientHomeProps {
  initialEvents: EventData[];
  initialDate: Date;
}

export function ClientHome({ initialEvents, initialDate }: ClientHomeProps) {
  const [date, setDate] = useState(() => new Date(initialDate));
  const [events, setEvents] = useState(initialEvents);
  const [isPending, startTransition] = useTransition();
  const isAtStart = date.getTime() <= new Date(initialDate).getTime();

  const handleDateChange = (direction: "prev" | "next") => {
    const newDate = new Date(date);
    if (direction === "prev") {
      newDate.setDate(date.getDate() - 1);
    } else {
      newDate.setDate(date.getDate() + 1);
    }

    // Keep the time at 00:00:00 for consistency
    newDate.setHours(0, 0, 0, 0);

    setDate(newDate);

    startTransition(async () => {
      const newEvents = await fetchEvents(newDate);
      // Filter logic same as server component
      const filteredEvents = newEvents.filter((item) => item.occurrences?.length);
      setEvents(filteredEvents);
    });
  };

  const formattedDate = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const visibleEvents = events.filter((item) => !item.event.isOngoing);

  return (
    <div>
      {/* New Navigation Header */}
      <nav className="sm:sticky w-full top-0 z-10 bg-background py-4">
        <div className="px-4 max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-5xl font-medium">
            <button
              onClick={() => handleDateChange("prev")}
              className="transition-all cursor-pointer font-murecho"
              disabled={isPending}
              aria-label="Previous day"
            >
              {isAtStart ? "☀" : "←"}
            </button>
            <span className="min-w-[200px]">{formattedDate}</span>

            <button
              onClick={() => handleDateChange("next")}
              className="transition-all cursor-pointer font-murecho"
              disabled={isPending}
              aria-label="Next day"
            >
              →
            </button>
          </div>
        </div>
      </nav>

      <main className="px-4 max-w-5xl mx-auto mt-24 mb-16">
        {/* Loading State Overlay */}
        {isPending && (
          <div className="fixed inset-0 bg-background/50 z-20 pointer-events-none transition-all duration-200" />
        )}

        {/* Event List */}
        <div className="space-y-4 sm:columns-3 sm:gap-4 sm:space-y-6 transition-all duration-200">
          {visibleEvents.length > 0 ? (
            visibleEvents.map((item: EventData) => (
              <div key={item.event.id} className="break-inside-avoid">
                <Event {...item} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No hay eventos para este día.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
