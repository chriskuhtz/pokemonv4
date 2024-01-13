import { useSelector } from 'react-redux';
import { selectOccupantsByYCoordinate } from '../../../../slices/occupantsSlice';
import { Tile } from '../../interfaces/Overworld';
import { WatchedField } from '../../interfaces/WatchedField';
import { OverworldTile } from '../OverworldTile/OverworldTile';
import './OverworldRow.css';

export const OverworldRow = ({
	row,
	index,

	watchedFields,
	baseTile,
}: {
	index: number;
	row: Tile[];
	watchedFields: WatchedField[];
	baseTile: string;
}): JSX.Element => {
	const occupants = useSelector((state) =>
		selectOccupantsByYCoordinate(state, index)
	);
	console.log(occupants);
	return (
		<div className="row" key={index}>
			{row.map((tile, j) => {
				const occupant = occupants.find(
					(o) => o.position.x === j && o.position.y === index
				);

				return (
					<OverworldTile
						key={`${index}+${j}`}
						baseTile={baseTile}
						watched={watchedFields.some(
							(f) => f.position.x === j && f.position.y === index
						)}
						occupant={occupant}
						tile={tile}
						index={index}
					/>
				);
			})}
		</div>
	);
};
