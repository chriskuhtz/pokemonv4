import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	selectIsFieldWatched,
	selectOccupantByPosition,
} from '../../../../slices/occupantsSlice';
import {
	isHealer,
	isMerchant,
	isNpc,
	isObstacle,
	isOverworldItem,
} from '../../functions/OccupantTypeGuards';
import { BaseTileId, Tile } from '../../interfaces/Overworld';
import { Position } from '../../interfaces/Position';
import { OverworldCharacter } from '../OverworldCharacter/OverworldCharacter';
import { OverworldItem } from '../OverworldItem/OverworldItem';
import { OverworldObstacle } from '../OverworldObstacle/OverworldObstacle';
import { TileDecoration } from '../TileDecoration/TileDecoration';
import './OverworldTile.css';
import { getBaseTileIndex } from './functions/getBaseTileIndex';

export const OverworldTile = ({
	baseTile,
	tile,
	index,
	position,
}: {
	baseTile: BaseTileId;
	tile: Tile;
	index: number;
	position: Position;
}) => {
	const watched = useSelector((state) => selectIsFieldWatched(state, position));
	const occupant = useSelector((state) =>
		selectOccupantByPosition(state, position)
	);
	const tileIndex = useMemo(() => getBaseTileIndex(baseTile), [baseTile]);

	return (
		<>
			<div
				className="tile"
				style={{
					backgroundImage: `url("assets/tiles/${baseTile}${tileIndex}.png")`,
					backgroundSize: 'cover',
					outlineColor: watched ? 'cyan' : undefined,
				}}
			>
				{(isNpc(occupant) || isMerchant(occupant) || isHealer(occupant)) && (
					<OverworldCharacter
						sprite={occupant.sprite}
						orientation={occupant.orientation}
						zIndex={index}
					/>
				)}
				{isOverworldItem(occupant) && (
					<OverworldItem handled={occupant.handled} />
				)}
				{isObstacle(occupant) && (
					<OverworldObstacle obstacle={occupant} zIndex={index} />
				)}
				{tile.onStep?.type === 'ENCOUNTER' && (
					<TileDecoration occupantOffset={!!occupant} />
				)}
			</div>
		</>
	);
};
