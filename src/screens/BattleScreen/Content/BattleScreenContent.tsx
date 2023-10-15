import { useState } from 'react';
import { Combatant } from '../../../interfaces/Combatant';
import { BattleScreenProps } from '../BattleScreen';
import '../battleScreen.css';
import { OpponentSide } from '../components/OpponentSide/OpponentSide';
import { PlayerSide } from '../components/PlayerSide/PlayerSide';
export const BattleScreenContent = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): JSX.Element => {
	const [currentCombatants, setCurrentCombatants] =
		useState<Combatant[]>(initialCombatants);

	return (
		<div className="battleScreen">
			<PlayerSide
				combatants={currentCombatants.filter(
					(c) => c.ownerId === playerId || c.ownerId === allyId
				)}
			/>
			<OpponentSide
				combatants={currentCombatants.filter((c) =>
					opponentIds.includes(c.ownerId)
				)}
			/>
		</div>
	);
};
