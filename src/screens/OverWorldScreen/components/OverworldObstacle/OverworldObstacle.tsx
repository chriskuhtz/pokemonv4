import { Obstacle } from '../../interfaces/Occupant';
import './OverworldObstacle.css';

export const OverworldObstacle = ({
	obstacle,
	zIndex,
}: {
	obstacle: Obstacle;
	zIndex: number;
}) => {
	return (
		<div
			className="overworldObstacle"
			style={
				{
					'--obstacleHeight': obstacle.height,
					'--obstacleWidth': obstacle.width,
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
