import { ReactNode } from "react";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { InstagramIcon } from "@/components/icons/instagram";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { FacebookIcon } from "@/components/icons/facebook";
import { MailIcon, PhoneIcon } from "lucide-react";

export type PhoneLink = { label: string; phone: string; href: string };
export type EmailLink = { label: string; email: string; href: string };
export type SocialLink = {
	label: string;
	href: string;
	icon: ReactNode;
	contactText?: string;
};

export const phoneLinks: PhoneLink[] = [
	{ label: "Primary", phone: "+91 XXXXX XXXXX", href: "tel:+91XXXXXXXXXX" },
];

export const emailLinks: EmailLink[] = [
	{
		label: "Personal",
		email: "kumar@example.com",
		href: "mailto:kumar@example.com",
	},
];

export const socialLinks: SocialLink[] = [
	{
		label: "LinkedIn",
		href: "#",
		icon: <LinkedInIcon />,
		contactText: "Connect on LinkedIn",
	},
	{
		label: "Instagram",
		href: "#",
		icon: <InstagramIcon />,
		contactText: "DM on Instagram",
	},
	{
		label: "WhatsApp",
		href: "#",
		icon: <WhatsAppIcon />,
		contactText: "Message on WhatsApp",
	},
	{
		label: "Facebook",
		href: "#",
		icon: <FacebookIcon />,
		contactText: "Follow on Facebook",
	},
	{ label: "Phone", href: phoneLinks[0].href, icon: <PhoneIcon /> },
	{ label: "Email", href: emailLinks[0].href, icon: <MailIcon /> },
];
