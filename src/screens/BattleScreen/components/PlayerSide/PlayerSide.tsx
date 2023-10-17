import { ChooseActionModal } from '../../../../components/ChooseActionModal/ChooseActionModal';
import { PokemonPill } from '../../../../components/PokemonPill/PokemonPill';
import { Combatant } from '../../../../interfaces/Combatant';
import { UseBattleScreen } from '../../hooks/useBattleScreen';
import './playerSide.css';
export const PlayerSide = ({
	playerSide,
	allCombatants,
	selectNextActionForCombatant,
}: {
	playerSide: Combatant[];
	allCombatants: Combatant[];
	selectNextActionForCombatant: UseBattleScreen['selectNextActionForCombatant'];
}): JSX.Element => {
	return (
		<div className="playerSide">
			{playerSide.map((c) => (
				<PokemonPill
					key={c.id}
					pokemon={c.pokemon}
					rightSide={
						c.nextAction?.name ?? (
							<ChooseActionModal
								combatant={c}
								combatants={allCombatants}
								selectAction={selectNextActionForCombatant}
							/>
						)
					}
				/>
			))}
		</div>
	);
};
