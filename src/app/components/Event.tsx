"use client";

import Image from "next/image";

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
    <div className="group relative rounded-lg flex flex-col gap-2">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      {event.imageUrl && (
        <Image
          unoptimized
          src={event.imageUrl}
          alt={event.title}
          height={100}
          width={100}
          className="block w-full object-cover group-hover:opacity-0"
        />
      )}
      <div className="flex flex-col group-hover:opacity-0">
        <span>{venue?.name || "Unknown venue"}</span>
        {formattedDate && <span>{formattedDate}</span>}
      </div>
      <p className="not-group-hover:hidden absolute text-black bg-white line-clamp-7">
        {event.description}
      </p>
    </div>
  );
};
