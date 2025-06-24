import Link from "next/link";
import { redirect } from "next/navigation";

import { venues, agendas } from "../../../../../drizzle/schema";
import { db } from "../../../../index";

async function createAgenda(formData: FormData) {
  "use server";

  const url = formData.get("url") as string;
  const venueId = formData.get("venueId") as string;
  const hasDetailUrls = formData.get("hasDetailUrls") === "true";

  if (!url) {
    throw new Error("URL is required");
  }

  await db.insert(agendas).values({
    url,
    venueId: venueId ? parseInt(venueId) : null,
    hasDetailUrls,
  });

  redirect("/panel");
}

export default async function NewAgenda() {
  // Fetch all venues for the dropdown
  const venuesData = await db.select().from(venues).orderBy(venues.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New Agenda</h1>
            <Link href="/panel" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Panel
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form action={createAgenda} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Agenda URL *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://example.com/agenda"
              />
            </div>

            <div>
              <label htmlFor="venueId" className="block text-sm font-medium text-gray-700 mb-2">
                Associated Venue (optional)
              </label>
              <select
                id="venueId"
                name="venueId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select a venue (optional)</option>
                {venuesData.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
              {venuesData.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  No venues available.{" "}
                  <Link href="/panel/venues/new" className="text-blue-600 hover:text-blue-800">
                    Create one first
                  </Link>
                  .
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Has Detail URLs
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasDetailUrls"
                    value="true"
                    defaultChecked
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Yes - This agenda contains links to detailed event pages
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasDetailUrls"
                    value="false"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    No - All event information is available on the main page
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Create Agenda
              </button>
              <Link
                href="/panel"
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
