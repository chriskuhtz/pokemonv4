import { useNavigate } from 'react-router-dom';
import './RouterButton.css';
export const RouterButton = ({
	sideEffect,
	to,
	text,
}: {
	to: string;
	text: string;
	sideEffect?: () => void;
}): JSX.Element => {
	const navigate = useNavigate();
	return (
		<button
			className="menuButton"
			onClick={() => {
				if (sideEffect) {
					sideEffect();
				}
				navigate(to);
			}}
		>
			{text}
		</button>
	);
};
