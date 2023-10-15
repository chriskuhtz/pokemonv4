import { ChooseActionModal } from '../../../../components/ChooseActionModal/ChooseActionModal';
import { PokemonPill } from '../../../../components/PokemonPill/PokemonPill';
import { Combatant } from '../../../../interfaces/Combatant';
import './playerSide.css';
export const PlayerSide = ({
	combatants,
}: {
	combatants: Combatant[];
}): JSX.Element => {
	return (
		<div className="playerSide">
			{combatants.map((c) => (
				<PokemonPill
					pokemon={c.pokemon}
					onClick={() => {}}
					rightSide={c.nextAction?.name ?? <ChooseActionModal combatant={c} />}
				/>
			))}
		</div>
	);
};
