import { BattleScreenProps } from '../BattleScreen';
import '../battleScreen.css';
import { ActionHandlerModal } from '../components/ActionHandlerModal/ActionHandlerModal';
import { OpponentSide } from '../components/OpponentSide/OpponentSide';
import { PlayerSide } from '../components/PlayerSide/PlayerSide';
import { useBattleScreen } from '../hooks/useBattleScreen';
export const BattleScreenContent = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): JSX.Element => {
	const {
		currentCombatants,
		selectNextActionForCombatant,
		mode,
		handleActionForCombatant,
	} = useBattleScreen({
		initialCombatants: initialCombatants,
		opponentIds: opponentIds,
		playerId: playerId,
		allyId: allyId,
	});
	return (
		<div className="battleScreen">
			<div className="devInfo">MODE: {mode}</div>

			<PlayerSide
				playerSide={currentCombatants.filter(
					(c) => c.pokemon.ownerId === playerId || c.pokemon.ownerId === allyId
				)}
				allCombatants={currentCombatants}
				selectNextActionForCombatant={selectNextActionForCombatant}
			/>
			<ActionHandlerModal
				mode={mode}
				currentCombatants={currentCombatants}
				handleActionForCombatant={handleActionForCombatant}
			/>
			<OpponentSide
				combatants={currentCombatants.filter((c) =>
					opponentIds.includes(c.pokemon.ownerId)
				)}
			/>
		</div>
	);
};
