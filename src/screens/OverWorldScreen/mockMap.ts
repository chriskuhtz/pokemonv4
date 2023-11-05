import { OverworldMap } from './interfaces/Overworld';

export const mockMap: OverworldMap = {
	encounters: ['pikachu', 'growlithe'],
	occupants: [
		{
			orientation: 'Down',
			id: 'testOccupant',
			position: { x: 0, y: 1 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 1,
			movement: { type: 'ROTATING' },
		},
		{
			orientation: 'Down',
			id: 'testOccupant2',
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
			id: 'testOccupant3',
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
			id: 'testOccupant4',
			position: { x: 4, y: 4 },
			dialogue: ['Gotcha', 'Big Dog'],
			sprite: 1,
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
