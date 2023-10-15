import { combatantGenerator } from '../../../testing/generators/combatantGenerator';
import { updateCombatantInArray } from './updateCombatantInArray';

describe('updateCombatantInArray', () => {
	it('returns empty array when given empty array', () => {
		expect(updateCombatantInArray([], combatantGenerator())).toHaveLength(0);
	});
});
