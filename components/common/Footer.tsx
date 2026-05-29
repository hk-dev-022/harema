"use client";

import { Container } from "../ui/Container"
import Link from "next/link"

export default function Footer() {
	const handleMailClick = () => {
		const user = "hk";
		const domain = "halllll.com";
		window.location.href = `mailto:${user}@${domain}`;
	}

	return (
		<footer className='w-full text-xs text-right pt-7 pb-5 absolute bottom-0 right-0'>
			<Container>
				<button
					onClick={handleMailClick}
					className="underline mr-5 hover:opacity-60"
				>
					<span>Contact Mail</span>
				</button>
				<small className="text-xs">&copy;&nbsp;harema</small>
			</Container>
		</footer>
	)
}