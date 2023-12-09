import { useCallback, useEffect, useState } from 'react';
import { useGetSaveFileQuery } from '../../../api/saveFileApi';
import { getUserName } from '../../../functions/getUserName';
import { Direction } from '../../../interfaces/Direction';
import { currentMapId } from '../Overworld';
import { moveOccupants } from '../functions/moveOccupants';
import { Occupant, OverworldMap } from '../interfaces/Overworld';
import { mockMap } from '../mockMap';
import { useAnimationFrame } from './useAnimationFrame';
import { useCurrentField } from './useCurrentField';
import { useEncounter } from './useEncounter';
import { useFocusedOccupant } from './useFocusedOccupant';
import { useHandleKeyPress } from './useHandleKeyPress';
import { useHandleMovement } from './useHandleMovement';
import { useNextField } from './useNextField';
import { useWatchedFields } from './useWatchedFields';

const fps = 15;

export const useOverworld = () => {
	const username = getUserName();
	const { data: saveFile } = useGetSaveFileQuery(username ?? '');

	const [currentWorld] = useState<OverworldMap>(mockMap);
	const [occupants, setOccupants] = useState<Occupant[]>([
		...currentWorld.occupants,
	]);

	const [offsetX, setOffsetX] = useState<number>(0);
	const [offsetY, setOffsetY] = useState<number>(0);

	const [orientation, setOrientation] = useState<Direction>('Up');

	const [handledTrainers, setHandledTrainers] = useState<string[]>([]);

	useEffect(() => {
		if (saveFile) {
			setOffsetX(saveFile.position.x);
			setOffsetY(saveFile.position.y);
			setOrientation(saveFile.orientation);
			setHandledTrainers(
				saveFile.mapProgress[currentMapId]?.handledTrainers ?? []
			);
			setOccupants((occupants) => {
				return occupants.map((o) => {
					if (!o.watching) {
						return o;
					} else
						return {
							...o,
							watching: !(
								saveFile.mapProgress[currentMapId]?.handledTrainers ?? []
							).some((h) => h === o.id),
						};
				});
			});
		}
	}, [saveFile]);
	const [currentDialogue, setCurrentDialogue] = useState<string[]>([]);
	const [nextInput, setNextInput] = useState<
		React.KeyboardEvent<HTMLDivElement>['key'] | undefined
	>();

	const { focusedOccupant, setFocusedOccupant } =
		useFocusedOccupant(setCurrentDialogue);

	const nextField = useNextField(
		orientation,
		offsetX,
		offsetY,
		currentWorld,
		occupants
	);
	const watchedFields = useWatchedFields(occupants);
	const currentField = useCurrentField(
		watchedFields,
		offsetX,
		offsetY,
		occupants,
		setFocusedOccupant,
		currentWorld
	);

	useEncounter(currentWorld, setCurrentDialogue, currentField);

	const handleMovement = useHandleMovement(
		setOffsetX,
		setOffsetY,
		offsetX,
		offsetY
	);

	const handleKeyPress = useHandleKeyPress(
		currentDialogue,
		setCurrentDialogue,
		setFocusedOccupant,
		nextField,
		orientation,
		setOrientation,
		handleMovement,
		focusedOccupant,
		occupants,
		setOccupants,
		setHandledTrainers,
		handledTrainers
	);

	const update = useCallback(() => {
		if (nextInput) {
			handleKeyPress(nextInput);
		}
		if (!focusedOccupant) {
			setOccupants(moveOccupants(occupants, { x: offsetX, y: offsetY }));
		}

		setNextInput(undefined);
	}, [focusedOccupant, handleKeyPress, nextInput, occupants, offsetX, offsetY]);

	const tryToSetNextInput = useCallback(
		(x: React.KeyboardEvent<HTMLDivElement>) => {
			if (!nextInput) {
				setNextInput(x.key);
			}
		},
		[nextInput]
	);

	useAnimationFrame(update, fps);

	return {
		currentWorld,
		tryToSetNextInput,
		offsetX,
		offsetY,
		orientation,
		currentDialogue,
		setCurrentDialogue,
		occupants,
		watchedFields,
		handledTrainers,
		setHandledTrainers,
	};
};
