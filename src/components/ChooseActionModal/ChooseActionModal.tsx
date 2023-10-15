import { useState } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import { UseBattleScreen } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { Modal } from '../../ui_components/Modal/Modal';

export const ChooseActionModal = ({
	combatant,
	selectAction,
}: {
	combatant: Combatant;
	selectAction: UseBattleScreen['selectNextActionForCombatant'];
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			buttonContent={'Choose Action'}
			modalTitle={`what should ${combatant.pokemon.name} do`}
			modalContent={
				<div>
					<button
						onClick={() => {
							setOpen(false);
							selectAction(combatant.id, { name: 'Attacku' });
							//assign action to combatant
						}}
					>
						Attack
					</button>
				</div>
			}
		/>
	);
};
