import { ReactNode } from 'react';

export type ChipTone = 'default' | 'primary' | 'ghost';
export type ChipSize = 'sm' | 'md';

interface ChipButtonProps {
	label?: string;
	href?: string;
	target?: string;
	rel?: string;
	tone?: ChipTone;
	size?: ChipSize;
	active?: boolean;
	className?: string;
	ariaLabel?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: (event: React.MouseEvent) => void;
	children?: ReactNode;
}

const toneClasses: Record<ChipTone, string> = {
	default:
		'border-black/15 dark:border-white/20 bg-white/80 dark:bg-white/10 text-black dark:text-white hover:bg-white',
	primary:
		'border-primary/40 bg-primary text-white hover:bg-black hover:border-black dark:hover:bg-white dark:hover:text-black',
	ghost: 'border-white/25 bg-white/5 text-white hover:bg-white/10'
};

const sizeClasses: Record<ChipSize, string> = {
	sm: 'px-3 py-2.5 sm:py-1 text-xs min-h-[44px] sm:min-h-0',
	md: 'px-4 py-3 sm:py-2 text-sm min-h-[44px] sm:min-h-0'
};

export default function ChipButton({
	label = '',
	href,
	target,
	rel,
	tone = 'default',
	size = 'sm',
	active = false,
	className = '',
	ariaLabel,
	type = 'button',
	onClick,
	children
}: ChipButtonProps) {
	const composedClasses = [
		'inline-flex items-center gap-2 rounded-full font-link uppercase tracking-[0.18em] transition-colors backdrop-blur border',
		toneClasses[tone],
		sizeClasses[size],
		active
			? 'ring-2 ring-offset-2 ring-primary/70 ring-offset-white dark:ring-offset-slate-900'
			: '',
		className
	]
		.filter(Boolean)
		.join(' ');

	if (href) {
		return (
			<a
				className={composedClasses}
				href={href}
				target={target}
				rel={rel}
				aria-label={ariaLabel || label}
				onClick={onClick}
			>
				{children}
				{label && label}
			</a>
		);
	}

	return (
		<button
			className={composedClasses}
			aria-label={ariaLabel || label}
			aria-pressed={active}
			type={type}
			onClick={onClick}
		>
			{children}
			{label && label}
		</button>
	);
}
