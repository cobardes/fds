import { ClientHome } from "./components/ClientHome";
import { getEventsQuery } from "./components/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const santiagoDateStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Santiago",
  });
  const [year, month, day] = santiagoDateStr.split("-").map(Number);
  const today = new Date(Date.UTC(year, month - 1, day));

  const data = await getEventsQuery(today);
  const events = data.filter((item) => item.occurrences?.length);

  return <ClientHome initialEvents={events} initialDate={today} />;
}
