import { useEffect, useState } from 'react';
import { Direction } from '../interfaces/Direction';
import { nextDirection } from '../screens/OverWorldScreen/functions/nextDirection';

export const useRotate = (): Direction => {
	const [currentOrientation, setCurrentOrientation] =
		useState<Direction>('Down');

	useEffect(() => {
		const rotor = setTimeout(
			() => setCurrentOrientation(nextDirection(currentOrientation)),
			1000
		);
		return () => clearTimeout(rotor);
	}, [currentOrientation]);
	return currentOrientation;
};
