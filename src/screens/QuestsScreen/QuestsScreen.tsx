import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { Headline, HeadlineProps } from '../../components/Headline/Headline';
import { QuestListItem } from '../../components/QuestListItem/QuestListItem';
import { getUserName } from '../../functions/getUserName';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const QuestsScreen = ({
	headlineProps,
	routeAwayAfterAllClaimed,
}: {
	headlineProps: HeadlineProps;
	routeAwayAfterAllClaimed?: { to: RoutesEnum };
}): JSX.Element => {
	const username = getUserName();
	const navigate = useNavigate();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);

	useEffect(() => {
		if (
			data?.quests.every((q) => q.status === 'completed') &&
			routeAwayAfterAllClaimed
		) {
			navigate(routeAwayAfterAllClaimed.to);
		}
	}, [data, navigate, routeAwayAfterAllClaimed]);

	return (
		<div className="container">
			<Headline
				text={headlineProps.text}
				routerButtonProps={headlineProps.routerButtonProps}
				style={headlineProps.style}
				className={headlineProps.className}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
					{Object.values(data.quests)
						.filter((q) => q.status !== 'inactive')
						.map((quest) => (
							<QuestListItem quest={quest} key={quest.id} />
						))}
				</div>
			)}
		</div>
	);
};
