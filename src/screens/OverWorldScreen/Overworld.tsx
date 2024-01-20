import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RouterButton } from '../../components/RouterButton/RouterButton';
import { useHasUnclaimedQuests } from '../../hooks/useHasUnclaimedQuests';
import { useSaveGame } from '../../hooks/useSaveGame';
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

const tileSize = window.innerWidth / 25;
const playerOffsetX = 12;
const playerOffsetY = 6;

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
		saveFile,
		isFetching,
		forwardFoot,
		currentPosition,
	} = useOverworld();
	const currentDialogue = useSelector(selectCurrentDialogue);
	const hasUnclaimedQuests = useHasUnclaimedQuests();
	const navigate = useNavigate();
	const save = useSaveGame();

	if (isFetching) {
		return <FetchingScreen invisible />;
	}
	if (saveFile) {
		return (
			<div
				onKeyDown={(e) => tryToSetNextInput(e)}
				tabIndex={0}
				id="overworld"
				ref={autoFocusFn}
				style={
					{
						'--size': `${tileSize}px`,
						'--playerOffsetX': playerOffsetX,
						'--playerOffsetY': playerOffsetY,
					} as React.CSSProperties
				}
			>
				<RouterButton
					to={RoutesEnum.menu}
					text={'Menu'}
					className="leftCorner"
					sideEffect={() => save({ currentPosition })}
				/>
				<Modal
					open={currentDialogue.length > 0}
					modalContent={
						<Pill center={currentDialogue[0]} style={{ margin: '0 2rem' }} />
					}
				/>
				<Modal
					open={hasUnclaimedQuests}
					modalContent={
						<Pill
							onClick={() => navigate(RoutesEnum.newFulfilledQuest)}
							center={'You have completed a new Quest, claim your rewards'}
							style={{ margin: '0 2rem' }}
						/>
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
