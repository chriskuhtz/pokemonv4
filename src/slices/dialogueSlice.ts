import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../api/store';
import { QuestsEnum } from '../interfaces/Quest';
import {
	Merchant,
	Npc,
	OverworldItem,
} from '../screens/OverWorldScreen/interfaces/Occupant';

export interface DialogueSlice {
	dialogue: string[];
}
const initialState: DialogueSlice = {
	dialogue: [],
};
export const dialogueSlice = createSlice({
	name: 'dialogue',
	initialState: initialState,
	reducers: {
		addDialogue: (state, action: PayloadAction<string[]>) => {
			state.dialogue = action.payload;
		},
		continueDialogue: (state) => {
			state.dialogue = [...state.dialogue.slice(1)];
		},
		initiateItemDialogue: (state, action: PayloadAction<OverworldItem>) => {
			state.dialogue = [`You found a ${action.payload.item}`];
		},
		initiateEncounterDialogue: (state, action: PayloadAction<string>) => {
			state.dialogue = [
				`a wild ${action.payload} jumped out of the high grass`,
			];
		},
		initiateMerchantDialogue: (state, action: PayloadAction<Merchant>) => {
			state.dialogue = action.payload.dialogue;
		},
		initiateNpcDialogue: (state, action: PayloadAction<Npc>) => {
			state.dialogue = action.payload.dialogue;
		},
		initiateHealerDialogue: (state) => {
			state.dialogue = ['Let me heal your Pokemon.'];
		},
		initiateQuestDialogue: (state, action: PayloadAction<QuestsEnum>) => {
			state.dialogue = [
				`You must complete the following quest to continue: ${action.payload}`,
				'You can see your active quests in the Quests tab of the menu.',
			];
		},
	},
});

export const {
	addDialogue,
	continueDialogue,
	initiateEncounterDialogue,
	initiateHealerDialogue,
	initiateItemDialogue,
	initiateMerchantDialogue,
	initiateNpcDialogue,
	initiateQuestDialogue,
} = dialogueSlice.actions;

export const selectCurrentDialogue = (rootState: RootState): string[] => {
	return rootState.dialogueSlice.dialogue;
};
