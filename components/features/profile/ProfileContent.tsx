import Image from 'next/image';
import { Heading } from '@/components/ui/Heading';
import { Container } from '@/components/ui/Container';
import { SecInner } from '@/components/ui/Container';

type ProfileDict = {
	role: string;
	body: string;
	skill_dd_high: string;
	skill_dd_mid: string;
	skill_dd_low: string;
	tool_dd_high: string;
	tool_dd_mid: string;
	tool_dd_low: string;
	personal: string;
};

type Props = {
	dict: ProfileDict;
	isEn?: boolean;
}

export default function ProfileContent({ dict, isEn = false }: Props) {
	return (
		<Container className='pb-[72px]'>
			<div className='sm:flex sm:justify-between'>
				<div className='w-full sm:max-w-[300px] sm:mr-10 sm:relative'>
					<div className='sm:sticky sm:top-[120px] xl:top-[150px]'>
						<div className='aspect-[2/1] w-full relative sm:aspect-[1/1] sm:max-w-[200px]'>
							<Image 
								src="/img/profile_cover.jpg"
								alt="Portrait"
								fill
								priority
								className='w-full object-cover'
							/>
						</div>
						<h2 className='flex flex-col leading-[1.6] mt-4'>
							<span className='text-base'>川﨑&nbsp;陽香</span>
							<span className='text-body-sm'>Haruka&nbsp;Kawasaki</span>
							<span className='text-body-sm mt-2'>{dict.role}</span>
						</h2>
					<p className={`whitespace-pre-wrap text-body-base mt-6 leading-[1.8] ${isEn ? 'text-left' : ''}`}>{dict.body}</p>
					</div>
				</div>
				<section className='mt-10 sm:w-[60%] sm:mt-0'>
					{/* <p className='whitespace-pre-wrap'>{dict.body}</p> */}
					<section>
						<Heading as="h3" className='!text-body-base'>
							Skills
						</Heading>
						<dl className='text-body-base leading-[1.6] text-left mt-2'>
							<dt className='font-bold'>★★★<br/>HTML5 / CSS / SCSS / PRECSS / BEM / jQuery</dt>
							<dd className='block text-xs leading-[1.6] mt-2 lg:whitespace-pre-wrap'>{dict.skill_dd_high}</dd>
							<dt className='font-bold mt-6'>★★<br/>Pug / JavaScript / PHP / Liquid / Git / Github</dt>
							<dd className='block text-xs leading-[1.6] mt-2 lg:whitespace-pre-wrap'>{dict.skill_dd_mid}</dd>
							<dt className='font-bold mt-6'>★<br/>Tailwind CSS / Next.js + JSX / React / Vue.js</dt>
							<dd className='block text-xs leading-[1.6] mt-2 lg:whitespace-pre-wrap'>{dict.skill_dd_low}</dd>
						</dl>
					</section>
					<section className='mt-10 sm:mt-[72px]'>
						<Heading as="h3" className='!text-body-base'>
							Tools
						</Heading>
						<dl className='text-body-base leading-[1.6] text-left mt-2'>
							<dt className='font-bold'>★★★<br/>Figma / Xd / Illustrator / Photoshop / Wordpress / Windsurf / Cursor / Visual Studio Code / Local / Slack / Messenger / Zoom / Meet</dt>
							<dd className='block text-xs leading-[1.6] mt-2 lg:whitespace-pre-wrap'>{dict.tool_dd_high}</dd>
							<dt className='font-bold mt-6'>★★<br/>Shopify / STUDIO / BASE / Google Search Console / Google Analytics / Chatwork</dt>
							<dd className='block text-xs leading-[1.6] mt-2 lg:whitespace-pre-wrap'>{dict.tool_dd_mid}</dd>
							<dt className='font-bold mt-6'>★<br/>micro CMS</dt>
							<dd className='block text-xs leading-[1.6] mt-2 lg:whitespace-pre-wrap'>{dict.tool_dd_low}</dd>
						</dl>
					</section>
					<section className='mt-10 sm:mt-[72px]'>
						<Heading as="h3" className='!text-body-base'>
							Personal
						</Heading>
						<p className='text-body-base leading-[1.6] text-left mt-2'>{dict.personal}</p>
					</section>
				</section>
			</div>
		</Container>
	)
}