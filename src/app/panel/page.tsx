import Link from "next/link";
import { venues, agendas } from "../../../drizzle/schema";
import { db } from "../../index";
import { eq } from "drizzle-orm";
import { logout } from "../login/actions";

export default async function AdminPanel() {
  // Fetch venues and agendas with their relationships
  const venuesData = await db.select().from(venues);
  const agendasData = await db
    .select({
      agenda: agendas,
      venue: venues,
    })
    .from(agendas)
    .leftJoin(venues, eq(agendas.venueId, venues.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to Site
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Venues Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Venues</h2>
              <Link
                href="/panel/venues/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
              >
                + Add Venue
              </Link>
            </div>

            <div className="space-y-4">
              {venuesData.length === 0 ? (
                <p className="text-gray-500 italic">No venues found</p>
              ) : (
                venuesData.map((venue) => (
                  <div
                    key={venue.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">{venue.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{venue.streetAddress}</p>
                    <div className="mt-2 flex gap-4 text-sm">
                      <a
                        href={venue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Website
                      </a>
                      {venue.logoUrl && (
                        <a
                          href={venue.logoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Logo
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Agendas Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Agendas</h2>
              <Link
                href="/panel/agendas/new"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                + Add Agenda
              </Link>
            </div>

            <div className="space-y-4">
              {agendasData.length === 0 ? (
                <p className="text-gray-500 italic">No agendas found</p>
              ) : (
                agendasData.map(({ agenda, venue }) => (
                  <div
                    key={agenda.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <a
                          href={agenda.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {agenda.url}
                        </a>
                        {venue && <p className="text-gray-600 text-sm mt-1">Venue: {venue.name}</p>}
                        <p className="text-gray-500 text-xs mt-1">
                          Detail URLs: {agenda.hasDetailUrls ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
