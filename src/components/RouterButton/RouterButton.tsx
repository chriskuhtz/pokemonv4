import { useNavigate } from 'react-router-dom';
import { Pill } from '../../ui_components/Pill/Pill';
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
		<div className="routerButton">
			<Pill
				center={text}
				onClick={() => {
					if (sideEffect) {
						sideEffect();
					}
					navigate(to);
				}}
			/>
		</div>
	);
};
