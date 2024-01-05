import { useClaimQuest } from '../../hooks/useClaimQuest';
import { useIsQuestConditionFulfilled } from '../../hooks/useIsQuestConditionFulfilled';
import { Quest } from '../../interfaces/Quest';
import { IconWithTag } from '../../shared/components/IconWithTag/IconWithTag';
import { Pill } from '../../ui_components/Pill/Pill';

export const QuestListItem = ({ quest }: { quest: Quest }) => {
	const conditionFulfilled = useIsQuestConditionFulfilled(quest);
	const claimQuest = useClaimQuest();

	return (
		<Pill
			leftSide={
				conditionFulfilled && quest.status === 'active' ? (
					<Pill onClick={() => claimQuest(quest)} center={'claim'} />
				) : (
					quest.status
				)
			}
			center={
				<div>
					<h3>{quest.title}</h3>
					<p>{quest.description}</p>
					<p>Reward Money: {quest.rewardMoney}$</p>
				</div>
			}
			rightSide={
				<div style={{ display: 'flex' }}>
					{quest.rewardItems?.map((itemStack) => (
						<IconWithTag
							key={itemStack.item.id}
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${itemStack.item.id}.png`}
							tag={itemStack.amount}
						/>
					))}
				</div>
			}
		/>
	);
};
