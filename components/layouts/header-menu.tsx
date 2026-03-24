"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRightIcon } from "lucide-react";
import { socialLinks } from "@/config/socials";
import { navLinks } from "@/config/navigation";

export function HeaderMenu() {
	const [open, setOpen] = useState(false);

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger asChild>
				<Button
					aria-controls="mobile-menu"
					aria-expanded={open}
					aria-label="Toggle menu"
					className="gap-1.5 rounded-full px-3"
					size="lg"
					style={{
						// @ts-expect-error cornerShape is a non-standard style prop
						cornerShape: "squircle",
					}}
				>
					<span className="w-10 text-start">{open ? "Close" : "Menu"}</span>
					<div className="relative size-4 translate-y-px">
						<span
							className={cn(
								"absolute size-1 rounded-full bg-primary-foreground transition-all duration-200",
								open
									? "top-1.5 -left-px h-0.5 w-4 -rotate-45"
									: "top-0.5 left-1.5"
							)}
						/>
						<span
							className={cn(
								"absolute size-1 rounded-full bg-primary-foreground transition-all duration-200",
								open ? "top-1.5 -left-px h-0.5 w-4 rotate-45" : "top-2 left-1.5"
							)}
						/>
					</div>
					<span className="sr-only">Toggle Menu</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="-mr-2 w-[92svw] gap-0 overflow-hidden p-0 md:w-48"
				sideOffset={12}
			>
				<ul className="grid grid-cols-1 border-b bg-background p-2">
					{navLinks.map((item) => (
						<li className="w-full" key={item.label}>
							<a
								className="rounded-md group flex w-full items-center justify-between px-3 py-2 font-medium hover:bg-muted active:bg-muted dark:hover:bg-muted/50"
								href={item.href}
								onClick={() => setOpen(false)}
							>
								<div className="flex items-center gap-2">
									<div className="[&>svg]:size-4 [&>svg]:text-primary/80">
										{item.icon}
									</div>
									<p className="md:text-sm">{item.label}</p>
								</div>
								<div className="relative ml-auto flex h-full w-4 items-center">
									<ArrowRightIcon className="size-4 opacity-50 transition-all group-hover:translate-x-0 group-hover:opacity-50 md:-translate-x-2 md:opacity-0" />
								</div>
							</a>
						</li>
					))}
				</ul>
				<div className="flex justify-center gap-x-2 p-2">
					{socialLinks.map((item, index) => (
						<Button
							asChild
							className="[&>svg]:text-primary/80"
							key={`social-${item.label}-${index}`}
							onClick={() => setOpen(false)}
							size="icon-sm"
							variant="outline"
						>
							<a
								aria-label={item.label}
								href={item.href}
								rel="noopener noreferrer"
								target="_blank"
							>
								{item.icon}
							</a>
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}

