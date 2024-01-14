import { useSelector } from 'react-redux';
import {
	selectIsFieldWatched,
	selectOccupantByPosition,
} from '../../../../slices/occupantsSlice';
import {
	isHealer,
	isLargeObstacle,
	isMerchant,
	isNpc,
	isObstacle,
	isOverworldItem,
} from '../../functions/OccupantTypeGuards';
import { Position } from '../../interfaces/Position';
import { BaseTileId, DecorationMap, Tile } from '../../interfaces/Tile';
import { OverworldCharacter } from '../OverworldCharacter/OverworldCharacter';
import { OverworldItem } from '../OverworldItem/OverworldItem';
import { OverworldObstacle } from '../OverworldObstacle/OverworldObstacle';
import { TileDecoration } from '../TileDecoration/TileDecoration';
import './OverworldTile.css';

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
	const tileIndex = tile.baseTileIndex ?? 1;

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
						orientation={occupant.position.orientation}
						zIndex={index}
					/>
				)}
				{isOverworldItem(occupant) && (
					<OverworldItem handled={occupant.handled} />
				)}
				{isObstacle(occupant) ||
					(isLargeObstacle(occupant) && (
						<OverworldObstacle obstacle={occupant} zIndex={index} />
					))}

				<TileDecoration
					occupantOffset={!!occupant}
					decoration={
						tile.decoration ??
						(tile.onStep?.type === 'ENCOUNTER'
							? DecorationMap['tallGrass']
							: undefined)
					}
				/>
			</div>
		</>
	);
};
