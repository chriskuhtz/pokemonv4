import { useState } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import { UseBattleScreen } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { Modal } from '../../ui_components/Modal/Modal';

export const ChooseActionModal = ({
	combatant,
	combatants,
	selectAction,
}: {
	combatant: Combatant;
	combatants: Combatant[];
	selectAction: UseBattleScreen['selectNextActionForCombatant'];
}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false);
	const [actionName, setActionName] = useState<string | undefined>('');

	if (!open) {
		return <button onClick={() => setOpen(true)}>Choose Action</button>;
	}
	if (!actionName) {
		return (
			<Modal
				open={!actionName}
				onCancel={() => setOpen(false)}
				modalTitle={`what should ${combatant.pokemon.name} do`}
				modalContent={
					<div>
						<button
							onClick={() => {
								setActionName('Attacku');
								//selectAction(combatant.id, actionGenerator());
								//assign action to combatant
							}}
						>
							Attack
						</button>
					</div>
				}
			/>
		);
	}

	return (
		<Modal
			open={!!(actionName && open)}
			onCancel={() => setOpen(false)}
			modalTitle={`who is the target`}
			modalContent={
				<div>
					{combatants.map((c) => (
						<button
							onClick={() => {
								setOpen(false);

								selectAction(combatant.id, { name: actionName, target: c.id });
								//assign action to combatant
							}}
						>
							{c.pokemon.name}
						</button>
					))}
				</div>
			}
		/>
	);
};
