import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { OverworldMap } from '../interfaces/Overworld';

export const useOnSaveFileLoad = (
	setOffsetX: (x: number) => void,
	setOffsetY: (x: number) => void,
	setOrientation: (x: Direction) => void,
	currentWorld: OverworldMap
) => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? skipToken);
	useEffect(() => {
		if (saveFile) {
			setOffsetX(saveFile.overworldPosition.position.x);
			setOffsetY(saveFile.overworldPosition.position.y);
			setOrientation(saveFile.overworldPosition.orientation);
		}
	}, [currentWorld, saveFile, setOffsetX, setOffsetY, setOrientation]);
};
