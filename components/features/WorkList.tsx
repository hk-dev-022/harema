"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "../ui/Heading";
import { Container } from "../ui/Container";
import WorkDetail from "@/app/works/[id]/WorkDetail";

type Props = {
	works: any[];
	isEn?: boolean;
};

export default function WorksList({ works, isEn = false }: Props) {
	const [viewMode, setViewMode] = useState<"detail" | "gallery" | "list">("detail");
	const [activeType, setActiveType] = useState<string | null>(null);

	const getRoleNames = (work: any): string[] => {
		if (!work || !work.role || !Array.isArray(work.role)) {
			return [];
		}
	
		return work.role.filter(
			(r: any): r is string => typeof r === "string"
		);
	};
	
	const uniqueTypes = Array.from(
		new Set(
			works.flatMap((work) =>
				Array.isArray(work.type) ? work.type : []
			)
		)
	);

	const filteredWorks = activeType
		? works.filter((work) =>
				Array.isArray(work.type) && work.type.includes(activeType)
			)
		: works;

	return (
		<div>
			<Container>
				{/* DISPLAY SWITCH */}
				<div className="w-[108px] flex items-center bg-[#BBC5AA] rounded-full p-[3px] mx-auto relative">
					{/* SLIDER */}
					<div
						className={`absolute top-[3px] left-[3px] w-[34px] h-[34px] bg-[#FBFFF5] rounded-full shadow-sm transition-transform duration-200 ease-out pointer-events-none ${
							viewMode === "detail"
							? "translate-x-0"
							: viewMode === "gallery"
								? "translate-x-[34px]"
								: "translate-x-[68px]"
						}`}
					/>

					{/* DETAIL */}
					<button
						onClick={() => setViewMode("detail")}
						aria-label="詳細表示"
						aria-pressed={viewMode === "detail"}
						className="flex items-center justify-center w-[34px] h-[34px] rounded-full p-1 relative z-10"
					>
						<Image
							src="/svg/icon_detail.svg"
							alt="詳細アイコン"
							width={10}
							height={10}
							className={viewMode === "detail" ? "opacity-100" : "opacity-50"}
						/>
					</button>

					{/* GALLERY */}
					<button
						onClick={() => setViewMode("gallery")}
						aria-label="ギャラリー表示"
						aria-pressed={viewMode === "gallery"}
						className="flex items-center justify-center w-[34px] h-[34px] rounded-full p-1 relative z-10"
					>
						<Image
							src="/svg/icon_gallery.svg"
							alt="ギャラリーアイコン"
							width={12}
							height={12}
							className={viewMode === "gallery" ? "opacity-100" : "opacity-50"}
						/>
					</button>

					{/* LIST */}
					<button
						onClick={() => setViewMode("list")}
						aria-label="リスト表示"
						aria-pressed={viewMode === "list"}
						className="flex items-center justify-center w-[34px] h-[34px] rounded-full p-1 relative z-10"
					>
						<Image
							src="/svg/icon_list.svg"
							alt="リストアイコン"
							width={12}
							height={12}
							className={viewMode === "list" ? "opacity-100" : "opacity-50"}
						/>
					</button>
				</div>

				{/* TYPE NAVIGATION */}
				<nav className="leading-[1.2] mt-8">
					<ul className="flex items-center justify-center">
						<li>
							{ activeType === null ? (
								<span className="opacity-30 pointer-events-none">All</span>
							) : (
								<button
									onClick={() => setActiveType(null)}
									className="hover:opacity-60"
								>
									All
								</button>
							)}
						</li>
						{ uniqueTypes.map((roleName: string) => {
							const isSelected = activeType === roleName;

							return (
								<div
									key={roleName}
									className="flex items-center"
								>
									<span>｜</span>
									<li>
										{ isSelected ? (
											<span
												className="opacity-30 pointer-events-none"
											>
												{ roleName }
											</span>
										) : (
											<button
												onClick={() => setActiveType(roleName)}
												className="hover:opacity-60"
											>
												{ roleName }
											</button>
										)}
									</li>
								</div>
							);
						})}
					</ul>
				</nav>
			</Container>

			<div
				className={`mt-7 sm:mt-[72px] ${
					viewMode === "gallery"
						? "grid grid-cols-2 gap-[2px] px-[2px] sm:grid-cols-4"
						: viewMode === "list"
							? "max-w-[480px] flex flex-col gap-4 px-[16px] sm:max-w-[500px] sm:gap-5 md:px-[24px]"
							: "flex flex-col gap-16 md:gap-24"
				}`}
			>
				{ filteredWorks.map((work) => {
					const currentRoles = getRoleNames(work);
					const displayTitle = (isEn && work.title_en) ? work.title_en : work.title;
					const detailUrl = isEn ? `/en/works/${work.id}` : `/works/${work.id}`;

					if (viewMode === "detail") {
						// DETAIL VIEW
						return (
							<div
								key={work.id}
								className="border-b border-text/10 md:pb-4 md:pb-3"
							>
								<WorkDetail
									work={work}
									isEn={isEn}
									isPreview
								/>
							</div>
						);
					} else if (viewMode === "gallery") {
						// GALLERY VIEW
						return (
							<Link 
								href={detailUrl}
								key={work.id}
								className="aspect-[3/2] relative"
							>
								<div className="w-full">
									{ work.thumbnail?.url ? (
										<Image 
											src={work.thumbnail?.url}
											alt={displayTitle}
											fill
										/>
									) : (
										<Image
											src="/img/noimage.png"
											alt="No Image"
											fill
										/>
									) }
								</div>
							</Link>
						)
					} else {
						// LIST VIEW
						return (
							<div 
								key={work.id}
								className="flex justify-between"
							>
								<Link
									href={detailUrl}
								>
									<div className="flex items-center leading-[1.35]">
										<h2 className="text-left font-semibold underline mr-2">{displayTitle}</h2>
										<Heading
											as="p"
											className="text-xs font-[400] !mb-0"
										>
											{work.date}
										</Heading>
									</div>
									<div className="flex text-[0.6875rem] leading-[1.2] mt-1">
										<p className="shrink-0">{work.type}</p>
										<span>｜</span>
										<p>{currentRoles.join(",")}</p>
									</div>
								</Link>
								{ work.domain || work.url_github ? (
									<Link 
										href={ work.domain ? work.url : work.url_github}
										target="_blank"
										rel="noopener noreferrer"
										className="leading-[1.1] ml-4 sm:max-w-full"
									>
										<span className="flex items-center justify-end">
											<span className="text-[0.6875rem] text-right underline break-words mr-[2px] sm:text-xs">{ work.domain ? work.domain : "GitHub"}</span>
											<span className="shrink-0 block w-[11px]">
												<img src="/svg/icon_arrow.svg" alt="arrow" />
											</span>
										</span>
									</Link>
								) : null }
							</div>
						);
					}
				})}
			</div>
		</div>
	)
}