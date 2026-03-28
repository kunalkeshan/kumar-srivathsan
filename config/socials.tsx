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
	external?: boolean;
};

export const phoneLinks: PhoneLink[] = [
	{ label: "Primary", phone: "+91 7358338788", href: "tel:+917358338788" },
];

export const emailLinks: EmailLink[] = [
	{
		label: "Personal",
		email: "kumarsrivathsan02@gmail.com",
		href: "mailto:kumarsrivathsan02@gmail.com",
	},
];

export const socialLinks: SocialLink[] = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/kumar-srivathsan-251003377/",
		icon: <LinkedInIcon />,
		contactText: "Connect on LinkedIn",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/kumar_srivat",
		icon: <InstagramIcon />,
		contactText: "DM on Instagram",
	},
	{
		label: "WhatsApp",
		href: "https://wa.me/917358338799",
		icon: <WhatsAppIcon />,
		contactText: "Message on WhatsApp",
	},
	{
		label: "Facebook",
		href: "https://www.facebook.com/kumar.srivat",
		icon: <FacebookIcon />,
		contactText: "Follow on Facebook",
	},
	{ label: "Phone", href: phoneLinks[0].href, icon: <PhoneIcon />, external: false },
	{ label: "Email", href: emailLinks[0].href, icon: <MailIcon />, external: false },
];
