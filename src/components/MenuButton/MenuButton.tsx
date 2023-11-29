import { useNavigate } from 'react-router-dom';
import './MenuButton.css';
export const MenuButton = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<button className="menuButton" onClick={() => navigate('menu')}>
			Menu
		</button>
	);
};
