import { Search, ArrowLeft, ArrowRight } from "lucide-react";
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
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const events = data.filter((item) => !!item.occursAt);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full top-0 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          fds.
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/panel" className="text-sm text-white hover:text-gray-900">
            Admin
          </Link>
          <button>
            <Search size={24} strokeWidth={2.25} className="transform scale-x-[-1]" />
          </button>
        </div>
      </nav>

      <main className="px-4 space-y-16 max-w-5xl mx-auto mt-20">
        {/* Date Browser */}
        <div className="flex items-center justify-between font-medium">
          <button>
            <ArrowLeft size={20} strokeWidth={2.25} />
          </button>
          <span className="text-2xl">{formattedDate}</span>
          <button>
            <ArrowRight size={20} strokeWidth={2.25} />
          </button>
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
