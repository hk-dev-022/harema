"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "../ui/Heading";
import { Container } from "../ui/Container";

type Props = {
	works: any[];
	isEn?: boolean;
};

export default function WorksList({ works, isEn = false }: Props) {
	const [ViewMode, setViewMode] = useState<"gallery" | "list">("gallery");
	const [activeRole, setActiveRole] = useState<string | null>(null);

	const getRoleNames = (work: any): string[] => {
		if (!work || !work.role || !Array.isArray(work.role)) {
			return [];
		}
		return work.role.filter((r: any): r is string => typeof r === "string");
	};

	const ROLE_ORDER = [
		"Development",
		"Tech Direction",
		"Design",
	];

	const rawUniqueRoles = Array.from (
		new Set(
			works.flatMap((work) => getRoleNames(work))
		)
	);

	const uniqueRoles = rawUniqueRoles.sort((a, b) => {
		const indexA = ROLE_ORDER.indexOf(a);
		const indexB = ROLE_ORDER.indexOf(b);
		const finalIndexA = indexA === -1 ? 999: indexA;
		const finalIndexB = indexB === -1 ? 999: indexB;

		return finalIndexA - finalIndexB;
	})

	const filteredWorks = activeRole
		? works.filter((work) => getRoleNames(work).includes(activeRole))
		: works;

	return (
		<div>
			<Container>
				{/* DISPLAY SWITCH */}
				<div className="w-[74px] flex items-center bg-gray rounded-full p-[3px] mx-auto relative">
					<div className={`absolute top-[3px] left-[3px] w-[34px] h-[34px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-out pointer-events-none ${ViewMode === "list" ? "translate-x-[34px]" : "translate-x-0"}`}></div>
					<button
						onClick={() => setViewMode("gallery")}
						aria-label="ギャラリー表示"
						className="flex items-center justify-center w-[34px] h-[34px] rounded-full p-1 relative z-9"
					>
						<Image 
							src="/svg/icon_gallery.svg"
							alt="ギャラリーアイコン"
							width={12}
							height={12}
							className={`${ViewMode === "gallery" ? "opacity-100" : "opacity-50"}`}
						/>
					</button>
					<button
						onClick={() => setViewMode("list")}
						aria-label="リスト表示"
						className="flex items-center justify-center w-[34px] h-[34px] rounded-full p-1 relative z-9"
					>
						<Image 
							src="/svg/icon_list.svg"
							alt="リストアイコン"
							width={12}
							height={12}
							className={`${ViewMode === "list" ? "opacity-100" : "opacity-50"}`}
						/>
					</button>
				</div>

				{/* ROLE */}
				<nav className="leading-[1.2] mt-8">
					<ul className="flex items-center justify-center">
						<li>
							{ activeRole === null ? (
								<span className="opacity-30 pointer-events-none">All</span>
							) : (
								<button
									onClick={() => setActiveRole(null)}
									className="hover:opacity-60"
								>
									All
								</button>
							)}
						</li>
						{ uniqueRoles.map((roleName: string) => {
							const isSelected = activeRole === roleName;

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
												onClick={() => setActiveRole(roleName)}
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
					ViewMode === "gallery"
					? "grid grid-cols-2 gap-[2px] px-[2px] sm:grid-cols-4"
					: "max-w-[480px] flex flex-col gap-4 px-[16px] sm:max-w-[500px] sm:gap-5 md:px-[24px]"
				}`}
			>
				{ filteredWorks.map((work) => {
					const currentRoles = getRoleNames(work);
					const displayTitle = (isEn && work.title_en) ? work.title_en : work.title;
					const detailUrl = isEn ? `/en/works/${work.id}` : `/works/${work.id}`;

					if (ViewMode === "gallery") {
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
								{ work.domain ? (
									<Link 
										href={work.url} 
										target="_blank" 
										rel="noopener noreferrer"
										className="leading-[1.1] ml-4 sm:max-w-full"
									>
										<span className="flex items-center justify-end">
											<span className="text-[0.6875rem] text-right underline break-words mr-[2px] sm:text-xs">{work.domain}</span>
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