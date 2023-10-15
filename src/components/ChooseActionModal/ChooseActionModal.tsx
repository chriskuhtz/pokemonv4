import { useState } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import { Modal } from '../../ui_components/Modal/Modal';

export const ChooseActionModal = ({
	combatant,
}: {
	combatant: Combatant;
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
