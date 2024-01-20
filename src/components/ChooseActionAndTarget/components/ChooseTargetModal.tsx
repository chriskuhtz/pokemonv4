import { Combatant } from '../../../interfaces/Combatant';
import { UseBattleScreen } from '../../../screens/BattleScreen/hooks/useBattleScreen';
import { Modal } from '../../../ui_components/Modal/Modal';

export const ChooseTargetModal = ({
	open,
	setOpen,
	combatants,
	selectAction,
	actionName,
	combatant,
}: {
	open: boolean;
	setOpen: (x: boolean) => void;
	actionName: string;
	selectAction: UseBattleScreen['selectNextActionForCombatant'];
	combatants: Combatant[];
	combatant: Combatant;
}) => {
	return (
		<Modal
			open={!!(actionName && open)}
			onCancel={() => setOpen(false)}
			modalTitle={`who is the target`}
			modalContent={
				<div>
					{combatants.map((c) => (
						<button
							key={c.id}
							onClick={() => {
								setOpen(false);

								selectAction(combatant.id, {
									name: actionName,
									target: c.id,
								});
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
