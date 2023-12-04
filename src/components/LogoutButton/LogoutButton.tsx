import { useNavigate } from 'react-router-dom';
import { logout } from '../../functions/logout';

export const LogoutButton = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				logout();
				navigate('/');
			}}
		>
			Log Out
		</button>
	);
};
