import { Metadata } from 'next';
import ProfileContent from "@/components/features/profile/ProfileContent";
import enDict from '@/app/i18n/dictionaries/en.json';

export const metadata: Metadata = {
	title: 'Profile｜harema',
	description: 'プロフィールページです。',
};

export default function EnProfilePage() {
	return <ProfileContent dict={enDict.profile} isEn={true}/>;
}