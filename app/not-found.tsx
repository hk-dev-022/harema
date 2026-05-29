import { client } from "@/libs/client";
import { headers } from "next/headers";
import { Container } from "@/components/ui/Container";
import WorksList from "@/components/features/WorkList";


export default async function NotFound() {
	const headersList = await headers();
	const currentPath = headersList.get("x-invoke-path") || headersList.get("referer") || "";
	const isEn = currentPath.includes("/en/") || currentPath.endsWith("/en");

	try {
		const data = await client.get({
			endpoint: "works",
			queries: {
				limit: 100,
			},
		});

		return (
			<div>
				<Container className="mb-10">
					<h1 className="text-lg font-bold">404 Not Found</h1>
					<p className="mt-2">お探しのページは見つかりませんでした。既に削除されているか、URLが間違っている可能性があります。<br/>The page you are looking for could not be found. It may have been deleted or the URL may be incorrect.</p>
				</Container>
	
				<WorksList works={data.contents} isEn={isEn} />
			</div>
		);
	} catch (error) {
		return (
			<Container>
				<h1 className="text-lg font-bold">404｜Page Not Found</h1>
				<p className="mt-3">お探しのページは見つかりませんでした。既に削除されているか、URLが間違っている可能性があります。<br/>The page you are looking for could not be found. It may have been deleted or the URL may be incorrect.</p>
			</Container>
		)
	}
}