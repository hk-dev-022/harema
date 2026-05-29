import { ReactNode } from "react";

type ContainerProps = {
	children: ReactNode;
	size?: "sm" | "md";
	className?: string;
};

// CONTAINER
export function Container({ children, size="md", className = "" }: ContainerProps) {
	const sizeClasses = {
		sm: "px-[2px]",
		md: "px-[16px] md:px-[24px]"
	};

	return (
		<div className={`w-full mx-auto ${sizeClasses[size]} ${className}`}>
			{children}
		</div>
	)
}

type SecInnerProps = {
	children: ReactNode;
	as?: 'section' | 'div' | 'article';
	size?: "xs" | "sm" | "md";
	className?: string;
};

// SECTION INNER
export function SecInner({ children, as = 'section', size="md", className = "" }: SecInnerProps) {
	const sizeClasses = {
		xs: "pt-7",
		sm: "pt-10",
		md: "pt-18"
	};

	const Component = as;

	return (
		<Component className={`w-full ${sizeClasses[size]} ${className}`}>
			{children}
		</Component>
	)
}