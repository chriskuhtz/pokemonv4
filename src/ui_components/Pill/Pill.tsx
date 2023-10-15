import { ReactNode } from 'react';
import './pill.css';

export const Pill = ({
	leftSide,
	center,
	rightSide,
	onClick,
}: {
	leftSide?: ReactNode;
	center?: ReactNode;
	rightSide?: ReactNode;
	onClick?: () => void;
}) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};
	return (
		<div className="pill" onClick={handleClick}>
			<div>{leftSide}</div>
			<div>{center}</div>
			<div>{rightSide}</div>
		</div>
	);
};
