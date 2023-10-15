import { useMemo } from 'react';
import { Modal } from '../../../../ui_components/Modal/Modal';
import { UseBattleScreen } from '../../hooks/useBattleScreen';

export const ActionHandlerModal = ({
	mode,
	currentCombatants,
	handleActionForCombatant,
}: Pick<
	UseBattleScreen,
	'mode' | 'currentCombatants' | 'handleActionForCombatant'
>): JSX.Element => {
	const combatantsInCorrectOrder = useMemo(() => {
		return currentCombatants.filter((c) => c.nextAction);
	}, [currentCombatants]);

	const nextCombatant = useMemo(() => {
		return combatantsInCorrectOrder[0];
	}, [combatantsInCorrectOrder]);

	if (mode === 'COLLECTING' || !nextCombatant) {
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
