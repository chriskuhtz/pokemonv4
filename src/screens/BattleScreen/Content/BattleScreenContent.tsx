import { BattleScreenProps } from '../BattleScreen';
import '../battleScreen.css';
import { OpponentSide } from '../components/OpponentSide/OpponentSide';
import { PlayerSide } from '../components/PlayerSide/PlayerSide';
import { useBattleScreen } from '../hooks/useBattleScreen';
export const BattleScreenContent = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): JSX.Element => {
	const { currentCombatants, selectNextActionForCombatant, mode } =
		useBattleScreen({
			initialCombatants: initialCombatants,
			opponentIds: opponentIds,
			playerId: playerId,
			allyId: allyId,
		});
	return (
		<div className="battleScreen">
			<div className="devInfo">MODE: {mode}</div>
			<PlayerSide
				combatants={currentCombatants.filter(
					(c) => c.pokemon.ownerId === playerId || c.pokemon.ownerId === allyId
				)}
				selectNextActionForCombatant={selectNextActionForCombatant}
			/>
			<OpponentSide
				combatants={currentCombatants.filter((c) =>
					opponentIds.includes(c.pokemon.ownerId)
				)}
			/>
		</div>
	);
};
