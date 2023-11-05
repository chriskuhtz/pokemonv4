import { OverworldMap } from './interfaces/Overworld';

export const mockMap: OverworldMap = {
	encounters: ['pikachu', 'growlithe'],
	occupants: [
		{
			orientation: 'Down',
			id: 'bob',
			position: { x: 0, y: 1 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 1,
			movement: { type: 'ROTATING' },
		},
		{
			orientation: 'Down',
			id: 'jim',
			position: { x: 0, y: 2 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 2,
			movement: {
				type: 'PATHING',
				path: [
					{ x: 1, y: 2 },
					{ x: 1, y: 3 },
					{ x: 0, y: 3 },
					{ x: 0, y: 2 },
				],
				index: 0,
			},
		},
		{
			orientation: 'Down',
			id: 'tammy',
			position: { x: 0, y: 3 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 3,
			viewRange: 2,
			movement: {
				type: 'PATHING',
				path: [
					{ x: 0, y: 4 },
					{ x: 1, y: 4 },
					{ x: 1, y: 3 },
					{ x: 0, y: 3 },
				],
				index: 0,
			},
		},
		{
			orientation: 'Left',
			id: 'gertrud',
			position: { x: 4, y: 4 },
			dialogue: ['Gotcha', 'Big Dog'],
			sprite: 4,
			viewRange: 3,
			movement: { type: 'ROTATING' },
		},
	],
	map: [
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
		[
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
		],
	],
};

export const focusedPlayerTest: OverworldMap = {
	encounters: ['pikachu', 'growlithe'],
	occupants: [
		{
			orientation: 'Left',
			id: 'bob',
			position: { x: 5, y: 1 },
			dialogue: ['Good Eyes', 'Big dog'],
			sprite: 1,
			viewRange: 7,
			watching: true,
		},
	],
	map: [
		[{}, {}, {}, {}, {}, {}],
		[{}, {}, {}, {}, {}, {}],
	],
};
