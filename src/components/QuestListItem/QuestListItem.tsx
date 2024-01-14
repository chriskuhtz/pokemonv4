import { useClaimQuest } from '../../hooks/useClaimQuest';
import { useIsConditionFulfilled } from '../../hooks/useIsConditionFulfilled';
import { Quest } from '../../interfaces/Quest';
import { IconWithTag } from '../../shared/components/IconWithTag/IconWithTag';
import { Pill } from '../../ui_components/Pill/Pill';

export const QuestListItem = ({ quest }: { quest: Quest }) => {
	const isConditionFulfilled = useIsConditionFulfilled();
	const claimQuest = useClaimQuest();

	return (
		<Pill
			leftSide={
				quest.status === 'active' && isConditionFulfilled(quest.condition) ? (
					<Pill
						style={{ backgroundColor: 'green' }}
						onClick={() => claimQuest(quest)}
						center={'claim'}
					/>
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
