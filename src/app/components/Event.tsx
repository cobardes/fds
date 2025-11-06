"use client";

import type { EventData } from "./types";

export const Event = ({ event, venue, occursAt }: EventData) => {
  const formattedDate = occursAt
    ? new Date(occursAt).toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="border border-gray-200 p-2 rounded-lg flex flex-col gap-2 w-auto">
      <h3>{event.title}</h3>
      <div className="flex flex-col">
        <span>{venue?.name || "Unknown venue"}</span>
        {formattedDate && <span>{formattedDate}</span>}
      </div>
    </div>
  );
};
