import './EncounterGrass.css';

export const EncounterGrass = ({
	occupantOffset,
}: {
	occupantOffset: boolean;
}) => {
	return (
		<img
			className={`encounterGrass ${
				occupantOffset ? 'occupantOffset' : undefined
			}`}
			src={`/assets/mapObjects/tallGrass.png`}
		/>
	);
};
