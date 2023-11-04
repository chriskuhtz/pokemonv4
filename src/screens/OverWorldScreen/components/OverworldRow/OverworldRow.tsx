import { Occupant, Tile } from '../../interfaces/Overworld';
import { OverworldCharacter } from '../OverworldCharacter/OverworldCharacter';

export const OverworldRow = ({
	row,
	index,
	occupants,
}: {
	index: number;
	row: Tile[];
	occupants: Occupant[];
}): JSX.Element => {
	return (
		<div className="row" key={index}>
			{row.map((tile, j) => {
				const occupant = occupants.find(
					(o) => o.position.x === j && o.position.y === index
				);

				return (
					<>
						<div
							className="tile"
							key={`${index}+${j}`}
							style={{
								backgroundColor: tile.onStep ? 'darkgreen' : undefined,
							}}
						>
							{occupant ? (
								<OverworldCharacter
									sprite={occupant.sprite}
									orientation={occupant.orientation}
									zIndex={index}
								/>
							) : (
								`${index}/${j}`
							)}
						</div>
					</>
				);
			})}
		</div>
	);
};
