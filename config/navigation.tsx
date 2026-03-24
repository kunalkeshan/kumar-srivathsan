import { ReactNode } from "react";
import {
	FileTextIcon,
	InfoIcon,
	NotebookPenIcon,
	SparklesIcon,
} from "lucide-react";

export type NavLink = {
	label: string;
	href: string;
	isLive: boolean;
	icon?: ReactNode;
};

export const commonLinks: NavLink[] = [
	{ label: "About", href: "#about", isLive: true, icon: <InfoIcon /> },
	{ label: "Services", href: "#", isLive: true, icon: <SparklesIcon /> },
	{ label: "Blog", href: "#", isLive: true, icon: <NotebookPenIcon /> },
];

export const navLinks: NavLink[] = [...commonLinks];

export const footerLinks: NavLink[] = [
	...commonLinks,
	{ label: "Contact", href: "#", isLive: true },
	{ label: "Privacy", href: "#", isLive: true },
	{ label: "Terms", href: "#", isLive: true },
];
