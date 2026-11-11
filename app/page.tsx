import { client } from "../libs/client";
import WorkList from "../components/features/WorkList";

// SSG
export default async function WorksPage() {
  const worksData = await client.get({
    endpoint: "works",
    customRequestInit: {
      next: {revalidate: 60},
    },
    queries: {
      limit: 100,
    },
  });

  return (
    <WorkList works={worksData.contents} />
  );
}