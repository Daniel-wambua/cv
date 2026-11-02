import manifest from './certificate-manifest.json';

export interface Certificate {
	id: number;
	key: string;
	file: string;
	driveFileId: string;
	name: string;
	issuer: string;
	date: string;
	description: string;
	skills: string[];
	credentialId: string;
	verified: boolean;
	image: string;
}

export const certificates: Certificate[] = manifest.certificates.map((certificate) => ({
	...certificate,
	image: `/certificates/${certificate.file}`
}));

export const certificateImages: Record<string, string> = manifest.certificates.reduce(
	(images, certificate) => {
		images[certificate.key] = `/certificates/${certificate.file}`;
		return images;
	},
	{} as Record<string, string>
);

export interface AchievementPhoto {
	file: string;
	driveFileId?: string;
	size?: string;
	width?: number;
	height?: number;
	alt: string;
	caption: string;
	image: string;
}

export const achievementPhotos: AchievementPhoto[] = manifest.achievementGallery.map((photo) => ({
	...photo,
	image: 'image' in photo && photo.image ? photo.image : `/certificates/${photo.file}`
}));
