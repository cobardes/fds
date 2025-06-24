import Link from "next/link";
import { redirect } from "next/navigation";

import { venues } from "../../../../../drizzle/schema";
import { db } from "../../../../index";

async function createVenue(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const streetAddress = formData.get("streetAddress") as string;
  const url = formData.get("url") as string;
  const logoUrl = formData.get("logoUrl") as string;

  if (!name || !streetAddress || !url) {
    throw new Error("Name, street address, and URL are required");
  }

  await db.insert(venues).values({
    name,
    streetAddress,
    url,
    logoUrl: logoUrl || null,
  });

  redirect("/panel");
}

export default function NewVenue() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Create New Venue</h1>
            <Link href="/panel" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Panel
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form action={createVenue} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Venue Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter venue name"
              />
            </div>

            <div>
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Street Address *
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter street address"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL (optional)
              </label>
              <input
                type="url"
                id="logoUrl"
                name="logoUrl"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Create Venue
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
