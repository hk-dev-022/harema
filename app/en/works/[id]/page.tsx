import { client } from "@/libs/client";
import WorkDetail from "@/app/works/[id]/WorkDetail";
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
			title: `${work.title_en} | harema`,
			description: work.body_en ? work.body_en.replace(/<[^>]*>/g, "").slice(0, 100) : "",
		};
	} catch {
		return { title: "Works" };
	}
}

export default async function EnWorkDetailPage({ params }: Props) {
	const { id } = await params;

	try {
		const work = await client.get({
			endpoint: "works",
			contentId: id,
		});

		return <WorkDetail work={work} isEn={true} />;
	} catch (error) {
		notFound();
	}
}