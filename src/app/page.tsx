import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Event } from "./components/Event";
import { getEventsQuery, type EventData } from "./components/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type HomeProps = {
  searchParams?: {
    date?: string;
  };
};

const formatDateParam = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.toISOString().split("T")[0];
};

const parseDateParam = (value?: string) => {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export default async function Home({ searchParams }: HomeProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parsedDate = parseDateParam(searchParams?.date);
  const targetDate = parsedDate ? new Date(parsedDate) : new Date(today);
  targetDate.setHours(0, 0, 0, 0);

  const data = await getEventsQuery(targetDate);

  const formattedDate = targetDate.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const nextDate = new Date(targetDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const previousDate = new Date(targetDate);
  previousDate.setDate(previousDate.getDate() - 1);

  const showPrevious = targetDate.getTime() > today.getTime();

  const events = data.filter((item) => item.occurrences?.length);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full top-0 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          fds.
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/panel" className="text-sm text-background hover:text-gray-900">
            Admin
          </Link>
          <button>
            <Search size={24} strokeWidth={2.25} className="transform scale-x-[-1]" />
          </button>
        </div>
      </nav>

      <main className="px-4 space-y-16 max-w-5xl mx-auto mt-20">
        {/* Date Browser */}
        <div className="flex items-center justify-between font-semibold">
          {showPrevious ? (
            <Link
              href={`/?date=${formatDateParam(previousDate)}`}
              aria-label="Día anterior"
              className="p-1 rounded hover:text-gray-900"
            >
              <ArrowLeft size={22} strokeWidth={2.5} />
            </Link>
          ) : (
            <span className="w-[22px]" aria-hidden />
          )}
          <span className="text-2xl">{formattedDate}</span>
          <Link
            href={`/?date=${formatDateParam(nextDate)}`}
            aria-label="Día siguiente"
            className="p-1 rounded hover:text-gray-900"
          >
            <ArrowRight size={22} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Event List */}
        <div className="space-y-4 sm:columns-3 sm:gap-4 sm:space-y-6">
          {events.map((item: EventData) => (
            <div key={item.event.id} className="break-inside-avoid">
              <Event {...item} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
