import { isLargeObstacle } from '../../functions/OccupantTypeGuards';
import { LargeObstacle, Obstacle } from '../../interfaces/Occupants/Occupant';
import './OverworldObstacle.css';

export const OverworldObstacle = ({
	obstacle,
	zIndex,
}: {
	obstacle: Obstacle | LargeObstacle;
	zIndex: number;
}) => {
	return (
		<div
			className="overworldObstacle"
			style={
				{
					'--obstacleHeight': isLargeObstacle(obstacle) ? obstacle.height : 1,
					'--obstacleWidth': isLargeObstacle(obstacle) ? obstacle.width : 1,
				} as React.CSSProperties
			}
		>
			<img
				style={{ zIndex: zIndex }}
				src={`assets/mapObjects/${obstacle.sprite}.png`}
			/>
		</div>
	);
};
