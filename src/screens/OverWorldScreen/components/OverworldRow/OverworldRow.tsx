import React from 'react';
import { Occupant } from '../../interfaces/Occupant';
import { Tile } from '../../interfaces/Overworld';
import { WatchedField } from '../../interfaces/WatchedField';
import { OverworldCharacter } from '../OverworldCharacter/OverworldCharacter';
import './OverworldRow.css';
export const OverworldRow = ({
	row,
	index,
	occupants,
	watchedFields,
	baseTile,
}: {
	index: number;
	row: Tile[];
	occupants: Occupant[];
	watchedFields: WatchedField[];
	baseTile: string;
}): JSX.Element => {
	return (
		<div className="row" key={index}>
			{row.map((tile, j) => {
				const occupant = occupants.find(
					(o) => o.position.x === j && o.position.y === index
				);

				return (
					<React.Fragment key={`${index}+${j}`}>
						<div
							className="tile"
							style={{
								backgroundImage: `url("assets/tiles/${baseTile}.png")`,
								outlineColor: watchedFields.some(
									(f) => f.position.x === j && f.position.y === index
								)
									? 'cyan'
									: tile.onStep
									? 'darkgreen'
									: undefined,
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
					</React.Fragment>
				);
			})}
		</div>
	);
};
