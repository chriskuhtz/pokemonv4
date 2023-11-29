import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllSaveFilesQuery } from '../../api/saveFileApi';
import { setUserName } from '../../functions/setUserName';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const SaveFileSelection = (): JSX.Element => {
	const { data, isFetching, isError, isSuccess } = useGetAllSaveFilesQuery();
	const navigate = useNavigate();

	const selectSaveFile = useCallback(
		(x: string) => {
			setUserName(x);
			navigate(RoutesEnum.overworld);
		},
		[navigate]
	);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (isSuccess && data) {
		return (
			<div>
				{Object.values(data).map((saveFile) => (
					<Pill
						key={saveFile.username}
						center={saveFile.username}
						onClick={() => selectSaveFile(saveFile.username)}
					/>
				))}
			</div>
		);
	}
	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
