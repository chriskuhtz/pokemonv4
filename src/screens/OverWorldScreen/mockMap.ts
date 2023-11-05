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
			rotating: true,
		},
		{
			orientation: 'Down',
			id: 'testOccupant2',
			position: { x: 0, y: 2 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 2,
			rotating: false,
		},
		{
			orientation: 'Down',
			id: 'testOccupant3',
			position: { x: 0, y: 3 },
			dialogue: ['Hello', 'Goodbye'],
			sprite: 3,
			rotating: true,
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
