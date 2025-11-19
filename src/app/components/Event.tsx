"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { EventData } from "./types.ts";
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
    <Link href={event.url} target="_blank" className="group relative rounded-lg flex">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight">{event.title}</h3>
            <Chip className="font-medium text-foreground border-foreground/80">
              {formattedEventType}
            </Chip>
          </div>
          <p className="text-sm line-clamp-3">{event.summary}</p>
        </div>
        <div className="flex flex-col rounded-xl overflow-hidden bg-green-500/30 opacity-90 mix-blend-multiply relative">
          {event.imageUrl && (
            <Image
              unoptimized
              src={event.imageUrl}
              alt={event.title}
              height={100}
              width={100}
              className="opacity-100 saturate-0 block w-full object-cover mix-blend-luminosity"
            />
          )}
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
    </Link>
  );
};
