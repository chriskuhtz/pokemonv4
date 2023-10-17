import { PokemonPill } from '../../../../components/PokemonPill/PokemonPill';
import { Combatant } from '../../../../interfaces/Combatant';
import './opponentSide.css';
export const OpponentSide = ({
	combatants,
}: {
	combatants: Combatant[];
}): JSX.Element => {
	return (
		<div className="opponentSide">
			{combatants.map((c) => (
				<PokemonPill
					key={c.id}
					pokemon={c.pokemon}
					onClick={() => {}}
					rightSide={c.nextAction?.name}
				/>
			))}
		</div>
	);
};
