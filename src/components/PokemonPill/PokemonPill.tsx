import { ReactNode } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import { Pokemon } from '../../interfaces/Pokemon';
import { Pill } from '../../ui_components/Pill/Pill';

export const PokemonPill = ({
	pokemon,
	onClick,
	rightSide,
	battleStatus,
}: {
	pokemon: Pokemon;
	onClick?: () => void;
	rightSide?: ReactNode;
	battleStatus?: Combatant['status'];
}): JSX.Element => {
	return (
		<Pill
			leftSide={
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexId}.png`}
				/>
			}
			center={
				<div>
					<p>
						{pokemon.name}({battleStatus})
					</p>
					<p>
						{pokemon.hp.current}/{pokemon.hp.max}
					</p>
				</div>
			}
			rightSide={rightSide}
			onClick={onClick}
		/>
	);
};
