import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import {
	useGetAllSaveFilesQuery,
	usePostSaveFileMutation,
} from '../../api/saveFileApi';
import { CharacterSprite } from '../../components/CharacterSprite/CharacterSprite';
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
		id: v4(),
		currentMapId: 'portalTest1',
		mapProgress: {},
		money: 5000,
		pokemon: [
			{ dexId: 25, id: v4(), onTeam: true },
			{ dexId: 1, id: v4() },
		],
	});

	const startGame = useCallback(async () => {
		if (isValidSaveFile(newSaveFile)) {
			await postSaveFile(newSaveFile);
			setUserName(newSaveFile.username);
			navigate(RoutesEnum.overworld);
		}
	}, [navigate, newSaveFile, postSaveFile]);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (data) {
		return (
			<div className="container">
				<h3>Whats your name</h3>
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
					leftSide={
						newSaveFile.sprite !== undefined ? (
							<CharacterSprite
								style={{ height: '40px' }}
								orientation={'Down'}
								index={newSaveFile.sprite}
							/>
						) : undefined
					}
				/>
			</div>
		);
	}

	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
