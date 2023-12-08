import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useGetAllSaveFilesQuery,
	usePostSaveFileMutation,
} from '../../api/saveFileApi';
import { isValidSaveFile } from '../../functions/isValidSaveFile';
import { setUserName } from '../../functions/setUserName';
import { SaveFile } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { SpriteSelection } from './components/SpriteSelection';
import { useRotate } from './hooks/useRotate';

export const NewGameProcess = (): JSX.Element => {
	const currentOrientation = useRotate();
	const { data, isFetching, isError } = useGetAllSaveFilesQuery();
	const navigate = useNavigate();
	const [postSaveFile] = usePostSaveFileMutation();
	const [newSaveFile, setNewSaveFile] = useState<Partial<SaveFile>>({
		position: { x: 0, y: 0 },
		orientation: 'Down',
	});

	const startGame = useCallback(() => {
		if (isValidSaveFile(newSaveFile)) {
			postSaveFile(newSaveFile);
			setUserName(newSaveFile.username);
			navigate(RoutesEnum.overworld);
		}
	}, [navigate, newSaveFile, postSaveFile]);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (data) {
		return (
			<div>
				<h4>Whats your name</h4>
				<input
					placeholder="Whats your name"
					onChange={(e) =>
						setNewSaveFile({ ...newSaveFile, username: e.target.value })
					}
				/>
				<SpriteSelection
					newSaveFile={newSaveFile}
					setNewSaveFile={setNewSaveFile}
					currentOrientation={currentOrientation}
				/>

				<Pill
					center={'Start Game'}
					onClick={startGame}
					disabled={!isValidSaveFile(newSaveFile)}
				/>
			</div>
		);
	}

	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
