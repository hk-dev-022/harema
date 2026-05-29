import { client } from "@/libs/client";
import WorksList from "@/components/features/WorkList"; 
import { notFound } from "next/navigation";

export default async function EnWorksListPage() {
	try {
		const data = await client.get({
			endpoint: "works",
		});

		return (
			<WorksList works={data.contents} isEn={true} />
		);
	} catch (error) {
		notFound();
	}
}