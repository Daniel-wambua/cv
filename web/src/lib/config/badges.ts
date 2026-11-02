import manifest from './certificate-manifest.json';

export interface Badge {
	name: string;
	imageUrl: string;
	link?: string;
	earned: boolean;
}

export const certificationBadges: Badge[] = manifest.badges.map((badge) => ({
	name: badge.name,
	imageUrl: `/certificates/${badge.file}`,
	link: badge.link,
	earned: badge.earned
}));

export const getEarnedBadges = (): Badge[] => certificationBadges.filter((badge) => badge.earned);
export const getTargetBadges = (): Badge[] => certificationBadges.filter((badge) => !badge.earned);
