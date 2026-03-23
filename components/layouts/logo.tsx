import { cn } from "@/lib/utils";

export type LogoProps = {
	className?: string;
	size?: "sm" | "md" | "lg";
};

const sizeClassBySize: Record<NonNullable<LogoProps["size"]>, string> = {
	sm: "text-sm",
	md: "text-base",
	lg: "text-lg",
};

export function Logo({ size = "md", className }: LogoProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center font-medium leading-none tracking-tight",
				sizeClassBySize[size],
				className
			)}
		>
			Kumar Srivathsan
		</span>
	);
}

