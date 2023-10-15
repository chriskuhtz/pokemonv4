import { Combatant } from '../../../../interfaces/Combatant';

export const OpponentSide = ({
	combatants,
}: {
	combatants: Combatant[];
}): JSX.Element => {
	return <div>{combatants.map((c) => c.name)}</div>;
};
