import { BattleScreenProps } from '../BattleScreen';

export const BattleScreenContent = ({
	initialCombatants,
	opponentIds,
	playerId,
	allyId,
}: BattleScreenProps): JSX.Element => {
	return <div>{initialCombatants.map((c) => c.name)}</div>;
};
