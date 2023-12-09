import { Modal } from '../../../ui_components/Modal/Modal';

export const ChooseActionModal = ({
	open,
	setOpen,
	setActionName,
	name,
}: {
	open: boolean;
	setOpen: (x: boolean) => void;
	setActionName: (x: string) => void;
	name: string;
}) => {
	return (
		<Modal
			open={open}
			onCancel={() => setOpen(false)}
			modalTitle={`what should ${name} do`}
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
};
