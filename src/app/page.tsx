import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import { events, venues } from "../../drizzle/schema";
import { db } from "../index";

export default async function Home() {
  const data = await db
    .select({
      event: events,
      venue: venues,
    })
    .from(events)
    .leftJoin(venues, eq(events.venueId, venues.id));

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  const featuredEvents = data.slice(0, 3);
  const remainingEvents = data.slice(3);

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 p-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          fds.
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/panel" className="text-sm text-gray-600 hover:text-gray-900">
            Admin
          </Link>
          <button className="text-xl">🔍</button>
        </div>
      </nav>

      <main className="p-4 space-y-8">
        {/* Featured Events Carousel */}
        <div className="flex gap-4 overflow-x-auto">
          {featuredEvents.map(({ event, venue }) => (
            <div
              key={event.id}
              className="w-[80%] flex-shrink-0 aspect-[7/8] relative rounded-xl overflow-hidden"
            >
              {event.imageUrl && (
                <Image
                  unoptimized
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-semibold text-white">{event.title}</h2>
                <p className="text-sm text-white">{venue?.name || "Unknown venue"}</p>
                <p className="text-sm text-white">Event Details</p>
              </div>
            </div>
          ))}
        </div>

        {/* Date Browser */}
        <div className="flex items-center justify-between">
          <button>&lt;</button>
          <span>{formattedDate}</span>
          <button>&gt;</button>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {remainingEvents.map(({ event, venue }) => (
            <div key={event.id}>
              <h3>{event.title}</h3>
              <div className="flex justify-between items-center">
                <span>{venue?.name || "Unknown venue"}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
