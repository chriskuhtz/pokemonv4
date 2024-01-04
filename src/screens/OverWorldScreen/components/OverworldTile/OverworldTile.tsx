import {
	isHealer,
	isMerchant,
	isNpc,
	isOverworldItem,
} from '../../functions/isNpc';
import { Occupant } from '../../interfaces/Occupant';
import { Tile } from '../../interfaces/Overworld';
import { EncounterGrass } from '../EncounterGrass/EncounterGrass';
import { OverworldCharacter } from '../OverworldCharacter/OverworldCharacter';
import { OverworldItem } from '../OverworldItem/OverworldItem';
import './OverworldTile.css';

export const OverworldTile = ({
	baseTile,
	watched,
	occupant,
	tile,
	index,
}: {
	baseTile: string;
	watched: boolean;
	occupant?: Occupant;
	tile: Tile;
	index: number;
}) => {
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
				{tile.onStep?.type === 'ENCOUNTER' && (
					<EncounterGrass occupantOffset={!!occupant} />
				)}
			</div>
		</>
	);
};
