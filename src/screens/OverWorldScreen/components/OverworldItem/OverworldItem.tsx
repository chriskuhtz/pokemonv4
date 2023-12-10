import './OverworldItem.css';

export const OverworldItem = ({ handled }: { handled?: boolean }) => {
	if (!handled) {
		return (
			<div className="overworldItem">
				<img src={`assets/mapObjects/pokeball.png`} />
			</div>
		);
	}
	return <></>;
};
