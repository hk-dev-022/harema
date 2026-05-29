import React from 'react';

interface HeadingProps {
	children: React.ReactNode;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
	variant?: 'brackets';
	className?: string;
}

export const Heading: React.FC<HeadingProps> = ({

	children,
	as: Component = 'h2',
	variant = 'brackets',
	className = '',

}) => {

	const variantStyle = {
		brackets: "inline-block text-xs font-semibold leading-[1.2] px-2 mb-1 relative before:content-['('] before:block  before:my-auto before:absolute before:left-0 before:top-0 before:bottom-0 after:content-[')'] after:block  after:my-auto after:absolute after:right-0 after:top-0 after:bottom-0"
	}[variant];

	return (
		<Component className={`${variantStyle} ${className}`}>
			{children}
		</Component>
	);
};