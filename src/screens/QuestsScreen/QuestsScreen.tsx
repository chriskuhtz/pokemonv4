import { skipToken } from '@reduxjs/toolkit/query';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
import { IconWithTag } from '../../shared/components/IconWithTag/IconWithTag';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const QuestsScreen = (): JSX.Element => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);

	return (
		<div className="container">
			<Headline
				text={'Quests'}
				routerButtonProps={{ to: RoutesEnum.menu, text: 'Menu' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{Object.values(data.quests).map((quest) => (
						<Pill
							leftSide={quest.status}
							center={
								<div>
									<h3>{quest.title}</h3>
									<p>{quest.description}</p>
									<p>Reward Money: {quest.rewardMoney}$</p>
								</div>
							}
							rightSide={
								<div style={{ display: 'flex' }}>
									{quest.rewardItems?.map((itemStack) => (
										<IconWithTag
											src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemStack.item.id}.png`}
											tag={itemStack.amount}
										/>
									))}
								</div>
							}
						/>
					))}
				</div>
			)}
		</div>
	);
};
