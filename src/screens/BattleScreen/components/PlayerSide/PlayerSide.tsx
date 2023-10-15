import { ChooseActionModal } from '../../../../components/ChooseActionModal/ChooseActionModal';
import { PokemonPill } from '../../../../components/PokemonPill/PokemonPill';
import { Combatant } from '../../../../interfaces/Combatant';
import { UseBattleScreen } from '../../hooks/useBattleScreen';
import './playerSide.css';
export const PlayerSide = ({
	combatants,
	selectNextActionForCombatant,
}: {
	combatants: Combatant[];
	selectNextActionForCombatant: UseBattleScreen['selectNextActionForCombatant'];
}): JSX.Element => {
	return (
		<div className="playerSide">
			{combatants.map((c) => (
				<PokemonPill
					pokemon={c.pokemon}
					rightSide={
						c.nextAction?.name ?? (
							<ChooseActionModal
								combatant={c}
								selectAction={selectNextActionForCombatant}
							/>
						)
					}
				/>
			))}
		</div>
	);
};
