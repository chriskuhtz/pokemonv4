import { useMemo } from 'react';
import { Modal } from '../../../../ui_components/Modal/Modal';
import { UseBattleScreen } from '../../hooks/useBattleScreen';

export const ActionHandlerModal = ({
	mode,
	allCombatantsOnField,
	handleActionForCombatant,
}: Pick<
	UseBattleScreen,
	'mode' | 'allCombatantsOnField' | 'handleActionForCombatant'
>): JSX.Element => {
	const combatantsInCorrectOrder = useMemo(() => {
		return allCombatantsOnField.filter((c) => c.nextAction);
	}, [allCombatantsOnField]);

	const nextCombatant = useMemo(() => {
		return combatantsInCorrectOrder[0];
	}, [combatantsInCorrectOrder]);

	if (mode !== 'HANDLING' || !nextCombatant) {
		return <></>;
	}

	return (
		<Modal
			open={!!(mode === 'HANDLING' && nextCombatant)}
			modalContent={
				<div>
					{nextCombatant.pokemon.name} used action{' '}
					{nextCombatant.nextAction?.name}!
					<button onClick={() => handleActionForCombatant(nextCombatant.id)}>
						Ok
					</button>{' '}
				</div>
			}
			modalTitle={undefined}
		/>
	);
};
