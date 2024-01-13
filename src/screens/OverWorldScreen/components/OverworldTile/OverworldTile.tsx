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
import { Tile } from '../../interfaces/Overworld';
import { Position } from '../../interfaces/Position';
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
	baseTile: string;

	tile: Tile;
	index: number;
	position: Position;
}) => {
	const watched = useSelector((state) => selectIsFieldWatched(state, position));
	const occupant = useSelector((state) =>
		selectOccupantByPosition(state, position)
	);

	console.log('render tile');
	return (
		<>
			<div
				className="tile"
				style={{
					backgroundImage: `url("assets/tiles/${baseTile}.png")`,
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
