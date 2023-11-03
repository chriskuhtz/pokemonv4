import { useEffect, useMemo, useState } from 'react';

import { mockMap } from './mockMap';
import './overworld.css';

const tileSize = 40;
const playerOffsetX = 7;
const playerOffsetY = 4;

export interface EncounterEvent {
	type: 'ENCOUNTER';
}

export interface Dialogue {
	passages: string[];
}
export interface DialogueEvent {
	type: 'DIALOGUE';
	id: string;
}

export type OverworldEvent = EncounterEvent | DialogueEvent;

export type OverworldMap = {
	map: Tile[][];
	encounters: string[];
	dialogues: Record<string, Dialogue>;
};
export interface Tile {
	onStep?: OverworldEvent;
	onClick?: OverworldEvent;
	passable: boolean;
}

export type Direction = 'up' | 'right' | 'down' | 'left';

export const Overworld = (): JSX.Element => {
	const [currentMap] = useState<OverworldMap>(mockMap);
	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);
	const [orientation, setOrientation] = useState<Direction>('up');

	const nextField = useMemo((): Tile | undefined => {
		if (orientation === 'up' && offsetY > 0) {
			return currentMap.map[offsetY - 1][offsetX];
		}
		if (orientation === 'down' && offsetY < currentMap.map.length - 1) {
			return currentMap.map[offsetY + 1][offsetX];
		}
		if (orientation === 'left' && offsetX > 0) {
			return currentMap.map[offsetY][offsetX - 1];
		}
		if (orientation === 'right' && offsetY < currentMap.map[0].length - 1) {
			return currentMap.map[offsetY][offsetX + 1];
		}
		return;
	}, [currentMap, offsetX, offsetY, orientation]);
	const currentField = useMemo((): Tile => {
		return currentMap.map[offsetY][offsetX];
	}, [currentMap.map, offsetX, offsetY]);

	useEffect(() => {
		console.log('nextField:', nextField);
	}, [nextField]);
	useEffect(() => {
		console.log(
			`Position: ${offsetY}|${offsetX}`,
			'currentField:',
			currentField
		);
	}, [currentField, offsetX, offsetY]);
	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
		//handle click
		if (e.key === ' ' || e.key === 'Enter') {
			if (nextField?.onClick?.type === 'DIALOGUE') {
				const dialogue = currentMap.dialogues[nextField.onClick.id];
				console.log(dialogue);
			}
		}
		//handle orientation
		if ((e.key === 'w' || e.key === 'ArrowUp') && orientation !== 'up') {
			setOrientation('up');
			return;
		}
		if ((e.key === 's' || e.key === 'ArrowDown') && orientation !== 'down') {
			setOrientation('down');
			return;
		}
		if ((e.key === 'd' || e.key === 'ArrowRight') && orientation !== 'right') {
			setOrientation('right');
			return;
		}
		if ((e.key === 'a' || e.key === 'ArrowLeft') && orientation !== 'left') {
			setOrientation('left');
			return;
		}
		if (!nextField || !nextField.passable) {
			return;
		}
		//handle movement
		if (e.key === 'w' || e.key === 'ArrowUp') {
			setOffsetY(offsetY - 1);
		}
		if (e.key === 's' || e.key === 'ArrowDown') {
			setOffsetY(offsetY + 1);
		}
		if (e.key === 'd' || e.key === 'ArrowRight') {
			setOffsetX(offsetX + 1);
		}
		if (e.key === 'a' || e.key === 'ArrowLeft') {
			setOffsetX(offsetX - 1);
		}
	};
	return (
		<div onKeyDown={(e) => handleKeyPress(e)} tabIndex={0}>
			<div className="camera">
				<div className="player">{orientation}</div>
				<div
					className="map"
					style={{
						top: (-offsetY + playerOffsetY) * tileSize,
						left: (-offsetX + playerOffsetX) * tileSize,
					}}
				>
					{currentMap.map.map((row, i) => (
						<div className="row" key={i}>
							{row.map((tile, j) => (
								<div
									className="tile"
									key={`${i}+${j}`}
									style={{
										backgroundColor:
											tile.passable === false
												? 'brown'
												: tile.onStep
												? 'darkgreen'
												: tile.onClick
												? 'khaki'
												: undefined,
									}}
								>
									{i}/{j}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
