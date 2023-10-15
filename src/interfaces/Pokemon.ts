export interface Pokemon {
	ownerId: string;
	name: string;
	dexId: string;
	hp: { current: number; max: number };
}
