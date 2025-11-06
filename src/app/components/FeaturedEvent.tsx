"use client";

import Image from "next/image";

import type { EventData } from "./types";

export const FeaturedEvent = ({ event, venue, occursAt }: EventData) => {
  const formattedDate = occursAt
    ? new Date(occursAt).toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <div
      key={event.id}
      className="w-[80%] sm:w-[20%] flex-shrink-0 aspect-[7/8] relative rounded-xl overflow-hidden"
    >
      {event.imageUrl && (
        <Image unoptimized src={event.imageUrl} alt={event.title} fill className="object-cover" />
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-xl font-semibold text-white">{event.title}</h2>
        <p className="text-sm text-white">{venue?.name || "Unknown venue"}</p>
        {formattedDate && <p className="text-sm text-white">{formattedDate}</p>}
      </div>
    </div>
  );
};
