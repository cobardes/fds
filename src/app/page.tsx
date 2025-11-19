import { ClientHome } from "./components/ClientHome";
import { getEventsQuery } from "./components/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const data = await getEventsQuery(today);
  const events = data.filter((item) => item.occurrences?.length);

  return <ClientHome initialEvents={events} initialDate={today} />;
}
