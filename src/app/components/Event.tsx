"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

import type { EventData } from "./types";
import type { ReactNode } from "react";

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
    <div className="group relative rounded-lg flex">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-none">{event.title}</h3>
          <Chip className="font-medium text-foreground border-foreground/80">
            {formattedEventType}
          </Chip>
        </div>
        <div className="flex flex-col rounded-xl overflow-hidden bg-foreground/95 relative">
          {event.imageUrl && (
            <Image
              unoptimized
              src={event.imageUrl}
              alt={event.title}
              height={100}
              width={100}
              className="block w-full object-cover mix-blend-luminosity group-hover:opacity-0 transition-all duration-500"
            />
          )}
          <div className="absolute p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
            <p className="line-clamp-3 text-background text-sm">{event.description}</p>
          </div>
        </div>
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
    </div>
  );
};
