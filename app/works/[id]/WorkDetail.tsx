"use client";

import Image from "next/image";
import Link from "next/link";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import style from "./WorkDetail.module.scss";
import { Heading } from "@/components/ui/Heading";
import { Container } from "@/components/ui/Container";
import { SecInner } from "@/components/ui/Container";

type Props = {
	work: any;
	isEn?: boolean;
};

const parseOptions: HTMLReactParserOptions = {
	replace: (domNode: any) => {
		if (domNode.name === 'img') {
			const { src, alt, width, height } = domNode.attribs;
			return (
				<div className="w-full">
					<Image
						src={src}
						alt={alt || "本文画像"}
						width={1200}
						height={1200}
						className="w-full h-auto aspect-auto"
					/>
				</div>
			)
		}
	}
}

export default function WorkDetail({ work, isEn = false }: Props) {
	const roles: string[] = Array.isArray(work.role)
		? work.role.filter((r: any): r is string => typeof r === "string")
		: [];

	const displayTitle = isEn ? work.title_en : work.title;
	const displayBody = isEn ? work.body_en : work.body;
	const displayCredit = isEn ? work.credit_en : work.credit;

	return (
		<article className="pb-[72px]">
			<div className="md:flex md:justify-between">
				<div className="md:max-w-[348px] md:mr-10 md:relative">
					<div className="md:sticky md:top-[120px] xl:top-[150px]">
						<Container className="">
							{/* HEAD */}
							<div 
								key={work.id}
								className="flex justify-between"
							>
								<div>
									<div className="flex items-center leading-[1.35]">
										<h2 className="text-base text-left font-semibold mr-2">{displayTitle}</h2>
										<Heading
											as="p"
											className="text-xs font-[400] !mb-0"
										>
											{work.date}
										</Heading>
									</div>
									<div className="flex text-[0.6875rem] text-left leading-[1.2] mt-1">
										<p className="shrink-0">{work.type}</p>
										<span>｜</span>
										{roles.length > 0 && (
											<p>
												{roles.join(", ")}
											</p>
										)}
									</div>
								</div>
							</div>
						
							{/* BODY */}
							{displayBody ? (
								<p className={`whitespace-pre-wrap mt-10 
									${isEn
										? "text-left"
										: "text-justify"
									}`}>{displayBody}</p>
							) : null}

							{/* URL */}
							{ work.domain ? (
								<SecInner size="sm">
									<Heading as="h2">URL</Heading>
									<Link 
										href={work.url} 
										target="_blank" 
										rel="noopener noreferrer"
										className="max-w-[75px] ml-4 sm:max-w-full"
									>
										<span className="flex items-center">
											<span className="text-xs text-right underline break-all mr-[2px]">{work.domain}</span>
											<span className="shrink-0 block w-[11px]">
												<img src="/svg/icon_arrow.svg" alt="arrow" />
											</span>
										</span>
									</Link>
								</SecInner>
							) : null }

							{/* SKILLS / TOOLS */}
							{work.skills.length > 0 ? (
								<section className="mt-5">
									<Heading as="h2">Skills / Tools</Heading>
									{Array.isArray(work.skills) && work.skills.length > 0 ? (
										<p className="text-xs text-left leading-[1.8]">
											{work.skills.join(" / ")}
										</p>
									) : null}
								</section>
							): null}
			
							{/* CREDIT */}
							{displayCredit ? (
								<section className="mt-4">
									<Heading as="h2">Credit</Heading>
									<p className="text-xs whitespace-pre-wrap leading-[1.8]">{displayCredit}</p>
								</section>
							) : null}

							{/* BUTTON BACK */}
							<div className="hidden md:block md:mt-10">
								<Link
									href="/"
									className="underline"
								>
									Back
								</Link>
							</div>
						</Container>
					</div>
				</div>

				<SecInner as="div" className="md:w-[60%] md:pt-0 md:mt-0">
					<Container size="sm">
						{/* THUMBNAIL */}
						{work.thumbnail?.url ? (
							<div className="aspect-[3/2] w-full border-[4px] border-[#000] rounded-[2px] relative sm:border-[8px] sm:rounded-[6px]">
								<Image
									src={work.thumbnail.url}
									alt={work.title}
									fill
								/>
							</div>
						) : null}

						{/* IMAGES */}
						{work.images ? (
							<div className={`${style.richContent} mt-[2px]`}>
								{parse(work.images, parseOptions)}
							</div>
						) : null}
		
						{/* BUTTON BACK */}
						<SecInner
							as="div"
							className="text-center md:hidden"
						>
							<Link
								href="/"
								className="underline"
							>
								Back
							</Link>
						</SecInner>
					</Container>
				</SecInner>
			</div>
		</article>
	)
}
