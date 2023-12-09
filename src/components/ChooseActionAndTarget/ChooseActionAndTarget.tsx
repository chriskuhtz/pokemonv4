import { useState } from 'react';
import { Combatant } from '../../interfaces/Combatant';
import { UseBattleScreen } from '../../screens/BattleScreen/hooks/useBattleScreen';
import { ChooseActionModal } from './components/ChooseActionModal';
import { ChooseTargetModal } from './components/ChooseTargetModal';

export const ChooseActionAndTarget = ({
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
			<ChooseActionModal
				open={!actionName}
				name={combatant.pokemon.name}
				setActionName={setActionName}
				setOpen={setOpen}
			/>
		);
	}

	return (
		<ChooseTargetModal
			open={!!(actionName && open)}
			setOpen={setOpen}
			actionName={actionName}
			selectAction={selectAction}
			combatants={combatants}
			combatant={combatant}
		/>
	);
};
