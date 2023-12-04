import { ReactNode } from 'react';
import './pill.css';

export const Pill = ({
	leftSide,
	center,
	rightSide,
	onClick,
	disabled,
}: {
	leftSide?: ReactNode;
	center?: ReactNode;
	rightSide?: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
}) => {
	const handleClick = () => {
		if (onClick && !disabled) {
			onClick();
		}
	};
	return (
		<div
			className={`pill ${disabled ? 'disabled' : undefined}`}
			onClick={handleClick}
		>
			<div>{leftSide}</div>
			<div>{center}</div>
			<div>{rightSide}</div>
		</div>
	);
};
