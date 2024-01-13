import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { Direction } from '../../interfaces/Direction';
import { ForwardFoot } from '../../interfaces/ForwardFoot';
import { SaveFile } from '../../interfaces/SaveFile';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../slices/dialogueSlice';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { OverworldRow } from './components/OverworldRow/OverworldRow';
import { PlayerCharacter } from './components/PlayerCharacter/PlayerCharacter';
import { useOverworld } from './hooks/useOverworld';
import { OverworldMap } from './interfaces/Overworld';
import { WatchedField } from './interfaces/WatchedField';
import './overworld.css';

const tileSize = window.innerWidth / 15;
const playerOffsetX = 7;
const playerOffsetY = 4;

export const OverworldWrapper = (): JSX.Element => {
	const {
		currentWorld,
		offsetX,
		offsetY,
		orientation,
		tryToSetNextInput,
		watchedFields,
		saveGame,
		saveFile,
		isFetching,
		isError,
		forwardFoot,
	} = useOverworld();
	const currentDialogue = useSelector(selectCurrentDialogue);

	console.log('render overworldWrapper');

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (saveFile) {
		return (
			<MemoizedOverworld
				tryToSetNextInput={tryToSetNextInput}
				saveGame={saveGame}
				currentDialogue={currentDialogue}
				offsetY={offsetY}
				offsetX={offsetX}
				currentWorld={currentWorld}
				watchedFields={watchedFields}
				orientation={orientation}
				saveFile={saveFile}
				forwardFoot={forwardFoot}
			/>
		);
	}

	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};

export const Overworld = ({
	tryToSetNextInput,
	saveGame,
	currentDialogue,
	offsetY,
	offsetX,
	currentWorld,
	watchedFields,
	orientation,
	saveFile,
	forwardFoot,
}: {
	tryToSetNextInput: (x: React.KeyboardEvent<HTMLDivElement>) => void;
	saveGame: (heal?: boolean | undefined) => void;
	currentDialogue: string[];
	offsetY: number;
	offsetX: number;
	currentWorld: OverworldMap;
	watchedFields: WatchedField[];
	orientation: Direction;
	saveFile: SaveFile;
	forwardFoot: ForwardFoot;
}) => {
	const autoFocusFn = useCallback(
		//@ts-expect-error whatever
		(element) => (element ? element.focus() : null),
		[]
	);

	console.log('render overworld');

	return (
		<div
			onKeyDown={(e) => tryToSetNextInput(e)}
			tabIndex={0}
			id="overworld"
			ref={autoFocusFn}
		>
			<RouterButton
				to={RoutesEnum.menu}
				text={'Menu'}
				className="leftCorner"
				sideEffect={saveGame}
			/>
			<Modal
				open={currentDialogue.length > 0}
				modalContent={<Pill center={currentDialogue[0]} />}
			/>
			<div className="camera">
				<div
					className="map"
					style={{
						top: (-offsetY + playerOffsetY) * tileSize,
						left: (-offsetX + playerOffsetX) * tileSize,
					}}
				>
					{currentWorld.map.map((row, i) => (
						<OverworldRow
							baseTile={currentWorld.baseTile}
							key={i}
							index={i}
							row={row}
							watchedFields={watchedFields.filter((f) => f.position.y === i)}
						/>
					))}
				</div>

				<PlayerCharacter
					orientation={orientation}
					zIndex={offsetY}
					sprite={saveFile.sprite}
					forwardFoot={forwardFoot}
				/>
			</div>
		</div>
	);
};

export const MemoizedOverworld = memo(Overworld);
