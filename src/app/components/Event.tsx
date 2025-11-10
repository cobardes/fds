"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

import type { EventData } from "./types";

export const Event = ({ event, venue, occursAt }: EventData) => {
  const formattedDate = occursAt
    ? new Date(occursAt).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="group relative rounded-lg flex hover:bg-foreground">
      <div className="group-hover:opacity-0 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        {event.imageUrl && (
          <Image
            unoptimized
            src={event.imageUrl}
            alt={event.title}
            height={100}
            width={100}
            className="block w-full object-cover group-hover:opacity-0 rounded-xl"
          />
        )}
        <div className="flex flex-col">
          {venue && (
            <span className="flex items-center gap-1">
              <MapPin size={16} strokeWidth={2} />
              {venue.name}
            </span>
          )}
          {occursAt && (
            <span className="flex items-center gap-1">
              <Clock size={16} strokeWidth={2} />
              {formattedDate}
            </span>
          )}
        </div>
      </div>
      <div className="not-group-hover:hidden absolute inset-0 text-background flex flex-col space-y-4 p-4">
        <h3 className="text-lg font-semibold text-background flex-shrink-0">{event.title}</h3>
        <p className="overflow-hidden text-background flex-1 min-h-0">{event.description}</p>
      </div>
    </div>
  );
};
