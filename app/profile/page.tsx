import ProfileContent from "@/components/features/profile/ProfileContent";
import jaDict from '@/app/i18n/dictionaries/ja.json';

export const metadata = {
	title: 'Profile｜harema',
	description: 'This is the profile page.',
};

export default function JaProfilePage() {
	return <ProfileContent dict={jaDict.profile} />;
}