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
	],
	map: [
		[{}, {}, {}, {}, {}, {}],
		[
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
		],
		[{}, {}, {}, {}, {}, {}],
		[
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
		],
		[{}, {}, {}, {}, {}, {}],
		[
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
		],
		[{}, {}, {}, {}, {}, {}],
		[
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
			{ onStep: { type: 'ENCOUNTER' } },
		],
		[{}, {}, {}, {}, {}, {}],
	],
};
