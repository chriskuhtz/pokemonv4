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
		},
		{
			orientation: 'Down',
			id: 'testOccupant3',
			position: { x: 0, y: 3 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 3,
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
