import { Combatant } from '../../interfaces/Combatant';
import { BattleScreenErrorHandler } from './ErrorHandler/BattleScreenErrorHandler';

export interface BattleScreenProps {
	initialCombatants: Combatant[];
	playerId: string;
	opponentIds: string[];
	allyId?: string;
}

export const BattleScreen = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): JSX.Element => {
	return (
		<BattleScreenErrorHandler
			initialCombatants={initialCombatants}
			opponentIds={opponentIds}
			playerId={playerId}
			allyId={allyId}
		/>
	);
};
