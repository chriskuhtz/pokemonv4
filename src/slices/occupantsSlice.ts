import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../api/store';
import { isOverworldItem } from '../screens/OverWorldScreen/functions/OccupantTypeGuards';
import { moveOccupants } from '../screens/OverWorldScreen/functions/moveOccupants';
import {
	Occupant,
	OverworldItem,
} from '../screens/OverWorldScreen/interfaces/Occupant';
import { Position } from '../screens/OverWorldScreen/interfaces/Position';

export interface OccupantsSlice {
	occupants: Occupant[];
	collectedItems: OverworldItem[];
	focusedOccupant: Occupant | undefined;
}
const initialState: OccupantsSlice = {
	occupants: [],
	collectedItems: [],
	focusedOccupant: undefined,
};
export const occupantsSlice = createSlice({
	name: 'occupants',
	initialState: initialState,
	reducers: {
		setOccupants: (state, action: PayloadAction<Occupant[]>) => {
			state.occupants = action.payload;
		},
		unfocusOccupant: (state) => {
			state.focusedOccupant = undefined;
		},
		focusOccupant: (state, action: PayloadAction<string>) => {
			state.focusedOccupant = state.occupants.find(
				(o) => o.id === action.payload
			);
		},
		handleOccupants: (state, action: PayloadAction<string[]>) => {
			state.occupants = state.occupants.map((o) => {
				if (action.payload.includes(o.id)) {
					if (isOverworldItem(o)) {
						state.collectedItems = [...state.collectedItems, o];
					}

					return { ...o, handled: true, focused: false, watching: false };
				} else return o;
			});
		},
		moveOccupants: (state, action: PayloadAction<Position>) => {
			const { newOccupants, hasChanges } = moveOccupants(
				state.occupants,
				action.payload
			);
			if (hasChanges) {
				state.occupants = newOccupants;
			}
		},
	},
});

export const {
	unfocusOccupant,
	focusOccupant,
	handleOccupants,
	setOccupants,
	moveOccupants: moveOccupantsReducer,
} = occupantsSlice.actions;

export const selectOccupants = (rootState: RootState): Occupant[] => {
	return rootState.occupantsSlice.occupants;
};
export const selectCollectedItems = (rootState: RootState): OverworldItem[] => {
	return rootState.occupantsSlice.collectedItems;
};

export const selectFocusedOccupant = (
	rootState: RootState
): Occupant | undefined => {
	return rootState.occupantsSlice.focusedOccupant;
};

export const selectHandledOccupantIds = createSelector(
	[selectOccupants],
	(occupants) => {
		return occupants.filter((o) => o.handled).map((o) => o.id);
	}
);
export const selectOccupantById = (
	rootState: RootState,
	id: string
): Occupant | undefined => {
	return rootState.occupantsSlice.occupants.find((o) => o.id === id);
};

export const selectOccupantsByYCoordinate = createSelector(
	[selectOccupants, (state, y) => y],
	(occupants, y) => {
		return occupants.filter((o) => o.position.y === y);
	}
);
