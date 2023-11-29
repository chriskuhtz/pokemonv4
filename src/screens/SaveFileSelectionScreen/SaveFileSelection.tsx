import { useGetAllSaveFilesQuery } from '../../api/saveFileApi';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const SaveFileSelection = (): JSX.Element => {
	const { data, isFetching, isError, isSuccess } = useGetAllSaveFilesQuery();

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (isSuccess && data) {
		return (
			<div>
				{Object.values(data).map((saveFile) => (
					<Pill center={saveFile.username} />
				))}
			</div>
		);
	}
	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
