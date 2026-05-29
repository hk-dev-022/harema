import { client } from "@/libs/client";
import WorkDetail from "./WorkDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	try {
		const work = await client.get({ endpoint: "works", contentId: id });
		return {
			title: `${work.title}｜harema`,
			description: work.body ? work.body.replace(/<[^>]*>/g, "").slice(0, 100) : "",
			openGraph: {
				images: [
					{
						url: work.thumbnail.url,
						width: 1200,
						height: 630,
					},
				],
			},
		};
	} catch {
		return { title: "Works｜harema" };
	}
}

export default async function WorkDetailPage({ params }: Props) {
	const { id } = await params;

	try {
		const work = await client.get({
			endpoint: "works",
			contentId: id,
		});

		return <WorkDetail work={work} />;
	} catch (error) {
		notFound();
	}
}
