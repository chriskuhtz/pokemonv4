import { Combatant } from '../../../../interfaces/Combatant';
import './playerSide.css';
export const PlayerSide = ({
	combatants,
}: {
	combatants: Combatant[];
}): JSX.Element => {
	console.log(combatants);
	return (
		<div className="playerSide">{combatants.map((c) => c.pokemon.name)}</div>
	);
};
