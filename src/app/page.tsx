import Link from "next/link";

import { Event } from "./components/Event";
import { getEventsQuery, type EventData } from "./components/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const data = await getEventsQuery();
  console.log(data);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  const events = data.filter((item) => !!item.occursAt);

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

      <main className="p-4 space-y-8 max-w-6xl mx-auto">
        {/* Date Browser */}
        <div className="flex items-center justify-between">
          <button>&lt;</button>
          <span>{formattedDate}</span>
          <button>&gt;</button>
        </div>

        {/* Event List */}
        <div className="space-y-4 sm:columns-3 sm:gap-6 sm:space-y-6">
          {events.map((item: EventData) => (
            <div key={item.event.id + item.occursAt!} className="break-inside-avoid">
              <Event {...item} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
