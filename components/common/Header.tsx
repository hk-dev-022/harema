'use client';

import Link from 'next/link';
import { Container } from '../ui/Container';
import { usePathname } from 'next/navigation';

export default function Header() {
	const pathname = usePathname();
	const isLoginPage = pathname === "/login";
	const isEn = pathname === '/en' || pathname.startsWith('/en/');
	let jaPath = '/';
	let enPath ='/en';

	if (isEn) {
		jaPath = pathname.replace(/^\/en/, '') || '/';
		enPath = pathname;
	} else {
		jaPath = pathname;
		enPath = pathname === '/' ? '/en' : `/en${pathname}`;
	}

	return (
		<header className='w-full bg-white pt-12 fixed top-0 left-0 z-10'>
			<Container>
				<div className='flex justify-between'>
					<h1 className='text-[0.9375rem]'>
						<Link href="/">harema</Link>
					</h1>
					<nav className='flex items-center'>
						{!isLoginPage && (
							<div className='flex items-center mr-[20px]'>
								<Link 
									href={jaPath}
									className={!isEn ? 'pointer-events-none opacity-30' : 'underline'}
								>
									JA
								</Link>
								<span>｜</span>
								<Link 
									href={enPath}
									className={isEn ? 'pointer-events-none opacity-30' : 'underline'}
								>
									EN
								</Link>
							</div>
						)}
						<Link
							href={isEn ? '/en/profile' : '/profile'}
							className='underline'
						>
							Profile
						</Link>
					</nav>
				</div>
			</Container>
		</header>
	);
}