import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { RoutesEnum } from '../../router/router';
import { selectCurrentDialogue } from '../../slices/dialogueSlice';
import { Modal } from '../../ui_components/Modal/Modal';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { OverworldMapLayer } from './components/OverworldMapLayer/OverworldMapLayer';
import { PlayerCharacter } from './components/PlayerCharacter/PlayerCharacter';
import { useOverworld } from './hooks/useOverworld';
import './overworld.css';

const tileSize = window.innerWidth / 15;
const playerOffsetX = 7;
const playerOffsetY = 4;

export const OverworldWrapper = (): JSX.Element => {
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
		saveGame,
		saveFile,
		isFetching,
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
					modalContent={
						<Pill center={currentDialogue[0]} style={{ margin: '0 2rem' }} />
					}
				/>
				<div className="camera">
					<div
						className="layerWrapper"
						style={{
							top: (-offsetY + playerOffsetY) * tileSize,
							left: (-offsetX + playerOffsetX) * tileSize,
						}}
					>
						<OverworldMapLayer currentWorld={currentWorld} />
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

	return <ErrorScreen />;
};
