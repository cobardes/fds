"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import type { EventData } from "./types";

const chipBaseClasses =
  "inline-flex items-center rounded-full px-1.5 py-0.5 text-xs uppercase tracking-wide border";

const Chip = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={`${chipBaseClasses}${className ? ` ${className}` : ""}`}>{children}</span>
);

export const Event = ({ event, venue, occurrences }: EventData) => {
  const visibleOccurrences = occurrences?.slice(0, 3) ?? [];
  const remainingOccurrences =
    occurrences && occurrences.length > visibleOccurrences.length
      ? occurrences.length - visibleOccurrences.length
      : 0;

  const formatTime = (value: string) =>
    new Date(value).toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatEventType = (value: string) =>
    value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const formattedVisibleTimes = visibleOccurrences.map(formatTime).join(" y ");
  const formattedEventType = formatEventType(event.eventType);

  return (
    <div className="group relative rounded-lg flex hover:bg-foreground">
      <div className="group-hover:opacity-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-none">{event.title}</h3>
          <Chip className="font-medium text-foreground border-foreground/80">{formattedEventType}</Chip>
        </div>
        {event.imageUrl && (
          <Image
            unoptimized
            src={event.imageUrl}
            alt={event.title}
            height={100}
            width={100}
            className="block w-full object-cover group-hover:opacity-0 rounded-xl "
          />
        )}
        <div className="flex flex-col">
          {venue && (
            <span className="flex items-center gap-1">
              <MapPin size={16} strokeWidth={2} />
              {venue.name}
            </span>
          )}
          {visibleOccurrences.length > 0 && (
            <div className="flex items-center gap-2">
              <Clock size={16} strokeWidth={2} />
              <div className="flex items-center gap-2">
                <span>{formattedVisibleTimes}</span>
                {remainingOccurrences > 0 && (
                  <span className="text-xs text-gray-500">{`+ ${remainingOccurrences} ${
                    remainingOccurrences === 1 ? "horario más" : "horarios más"
                  }`}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="not-group-hover:hidden absolute inset-0 text-background flex flex-col space-y-4 p-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <h3 className="text-lg font-semibold text-background leading-snug">{event.title}</h3>
          <Chip className="text-background/80 border-background/40">{formattedEventType}</Chip>
        </div>
        <p className="overflow-hidden text-background flex-1 min-h-0">{event.description}</p>
      </div>
    </div>
  );
};
