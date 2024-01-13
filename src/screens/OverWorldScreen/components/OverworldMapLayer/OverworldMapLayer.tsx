import { memo } from 'react';
import { OverworldMap } from '../../interfaces/Overworld';
import { OverworldRow } from '../OverworldRow/OverworldRow';
import './OverworldMapLayer.css';

const UnmemoizedOverworldMapLayer = ({
	currentWorld,
}: {
	currentWorld: OverworldMap;
}): React.JSX.Element => {
	return (
		<div className="layer" id="mapLayer">
			{currentWorld.map.map((row, i) => (
				<OverworldRow
					baseTile={currentWorld.baseTile}
					key={i}
					index={i}
					row={row}
				/>
			))}
		</div>
	);
};
export const OverworldMapLayer = memo(UnmemoizedOverworldMapLayer);
