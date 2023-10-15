import { Combatant } from '../../interfaces/Combatant';
import { ErrorMessage } from '../../ui_components/ErrorMessage/ErrorMessage';

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
}: BattleScreenProps): JSX.Element => {
	if (opponentIds.length === 0) {
		return (
			<ErrorMessage
				message={'missing opponent ids'}
				log={JSON.stringify({ initialCombatants, opponentIds, playerId })}
			/>
		);
	}

	return <div>{initialCombatants.map((c) => c.name)}</div>;
};
