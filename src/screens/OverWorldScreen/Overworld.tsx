import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../slices/dialogueSlice';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { OverworldRow } from './components/OverworldRow/OverworldRow';
import { PlayerCharacter } from './components/PlayerCharacter/PlayerCharacter';
import { useOverworld } from './hooks/useOverworld';
import './overworld.css';

const tileSize = window.innerWidth / 15;
const playerOffsetX = 7;
const playerOffsetY = 4;

export const Overworld = (): JSX.Element => {
	const autoFocusFn = useCallback(
		//@ts-expect-error whatever
		(element) => (element ? element.focus() : null),
		[]
	);
	const {
		currentWorld,
		offsetX,
		offsetY,
		orientation,

		tryToSetNextInput,
		occupants,
		watchedFields,
		saveGame,
		saveFile,
		isFetching,
		isError,
		forwardFoot,
	} = useOverworld();
	const currentDialogue = useSelector(selectCurrentDialogue);
	if (isFetching) {
		return <FetchingScreen />;
	}
	if (saveFile) {
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
								occupants={occupants.filter((o) => o.position.y === i)}
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
	}

	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
