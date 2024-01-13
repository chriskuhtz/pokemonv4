import { Tile } from '../../interfaces/Overworld';
import { OverworldTile } from '../OverworldTile/OverworldTile';
import './OverworldRow.css';

export const OverworldRow = ({
	row,
	index,
	baseTile,
}: {
	index: number;
	row: Tile[];
	baseTile: string;
}): JSX.Element => {
	console.log('render row');

	return (
		<div className="row" key={index}>
			{row.map((tile, j) => {
				return (
					<OverworldTile
						key={`${index}+${j}`}
						baseTile={baseTile}
						tile={tile}
						index={index}
						position={{ y: index, x: j }}
					/>
				);
			})}
		</div>
	);
};
