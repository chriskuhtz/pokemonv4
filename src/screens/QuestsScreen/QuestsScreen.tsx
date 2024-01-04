import { skipToken } from '@reduxjs/toolkit/query';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { QuestListItem } from '../../components/QuestListItem/QuestListItem';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
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
						<QuestListItem quest={quest} key={quest.id} />
					))}
				</div>
			)}
		</div>
	);
};
