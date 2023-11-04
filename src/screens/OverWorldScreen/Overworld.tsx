import { Modal } from '../../ui_components/Modal/Modal';
import { OverworldRow } from './components/OverworldRow/OverworldRow';
import { PlayerCharacter } from './components/PlayerCharacter/PlayerCharacter';
import { useOverworld } from './hooks/useOverworld';
import './overworld.css';

const tileSize = window.innerWidth / 15;
const playerOffsetX = 7;
const playerOffsetY = 4;

export const Overworld = (): JSX.Element => {
	const {
		handleKeyPress,
		currentWorld,
		offsetX,
		offsetY,
		orientation,
		currentDialogue,
	} = useOverworld();
	return (
		<>
			<div onKeyDown={(e) => handleKeyPress(e)} tabIndex={0} id="overworld">
				<Modal
					open={currentDialogue.length > 0}
					modalContent={<p>{currentDialogue[0]}</p>}
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
								index={i}
								row={row}
								occupants={currentWorld.occupants.filter(
									(o) => o.position.y === i
								)}
							/>
						))}
					</div>

					<PlayerCharacter orientation={orientation} zIndex={offsetY} />
				</div>
			</div>
		</>
	);
};
