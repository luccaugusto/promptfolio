import React from 'react';
import { Skillset } from '../promptfolio/components/Skillset';
import { MobileAbout } from './apps/MobileAbout';
import { MobileResume } from './apps/MobileResume';
import { MobileEmail } from './apps/MobileEmail';
import { YouPoop } from '../youpoop/YouPoop';

export type MobileApp = {
	name: string;
	label: string;
	icon: string;
	kind: 'content' | 'redirect';
	url?: string;
	Component?: React.FC;
};

const asset = (file: string) => `${process.env.PUBLIC_URL}/${file}`;

export const apps: MobileApp[] = [
	{
		name: 'about',
		label: 'About',
		icon: asset('about.png'),
		kind: 'content',
		Component: MobileAbout,
	},
	{
		name: 'skillset',
		label: 'Skills',
		icon: asset('skills.png'),
		kind: 'content',
		Component: Skillset,
	},
	{
		name: 'resume',
		label: 'Resume',
		icon: asset('document-icon.jpg'),
		kind: 'content',
		Component: MobileResume,
	},
	{
		name: 'email',
		label: 'Email',
		icon: asset('email.webp'),
		kind: 'content',
		Component: MobileEmail,
	},
	{
		name: 'gallery',
		label: 'Gallery',
		icon: asset('gallery-icon.png'),
		kind: 'redirect',
		url: 'https://luccaaugusto.xyz',
	},
	{
		name: 'youpoop',
		label: 'YouPoop',
		icon: asset('youtube-icon.png'),
		kind: 'content',
		Component: YouPoop,
	},
	{
		name: 'github',
		label: 'GitHub',
		icon: asset('github-icon.png'),
		kind: 'redirect',
		url: process.env.REACT_APP_GITHUB_URL,
	},
	{
		name: 'linkedin',
		label: 'LinkedIn',
		icon: asset('linkedin-icon.png'),
		kind: 'redirect',
		url: process.env.REACT_APP_LINKEDIN_URL,
	},
];
