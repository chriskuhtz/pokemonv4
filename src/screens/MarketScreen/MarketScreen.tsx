import { skipToken } from '@reduxjs/toolkit/query';
import { useLocation } from 'react-router-dom';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { getUserName } from '../../functions/getUserName';
import { Item } from '../../interfaces/Item';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const MarketScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);
	const { state } = useLocation();
	const inventory = state as Item[];
	return (
		<div className="container">
			<Headline
				text={'Market'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{inventory.map((inventoryItem) => (
						<Pill
							leftSide={
								<img
									height={40}
									width={40}
									src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${inventoryItem.id}.png`}
								/>
							}
							center={inventoryItem.id}
						/>
					))}
				</div>
			)}
		</div>
	);
};
