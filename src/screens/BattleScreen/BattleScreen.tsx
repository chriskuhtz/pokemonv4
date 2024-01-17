import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import { useGetSaveFileQuery } from '../../api/saveFileApi';
import { getUserName } from '../../functions/getUserName';
import { Combatant } from '../../interfaces/Combatant';
import { OPPOID, TRAINERID } from '../../testing/constants/trainerIds';
import { pokemonGenerator } from '../../testing/generators/pokemonGenerator';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import { BattleScreenErrorHandler } from './ErrorHandler/BattleScreenErrorHandler';

export interface BattleScreenProps {
	initialCombatants: Combatant[];
	playerId: string;
	opponentIds: string[];
	allyId?: string;
}

export const BattleScreen = (): JSX.Element => {
	const location = useLocation();
	const state = location.state as number[];

	const username = getUserName();
	const { data, isFetching, isError } = useGetSaveFileQuery(
		username ?? skipToken
	);
	const teamMembers = useMemo(() => {
		return data?.pokemon.filter((p) => p.onTeam);
	}, [data]);

	if (isFetching) {
		return <FetchingScreen />;
	}
	if (data && teamMembers && teamMembers.length > 0 && state) {
		console.log(teamMembers);
		return (
			<BattleScreenErrorHandler
				initialCombatants={[
					...teamMembers.map<Combatant>((p) => {
						return {
							id: v4(),
							state: 'ONFIELD',
							pokemon: pokemonGenerator({
								dexId: p.dexId,
								damage: p.damage,
								ownerId: data.id,
							}),
						};
					}),
					...state.map<Combatant>((p) => {
						return {
							id: v4(),
							state: 'ONFIELD',
							pokemon: pokemonGenerator({
								dexId: p,
								damage: 0,
								ownerId: OPPOID,
							}),
						};
					}),
				]}
				opponentIds={[OPPOID]}
				playerId={data.id}
				allyId={TRAINERID}
			/>
		);
	}
	if (isError) {
		return <ErrorScreen />;
	}
	return <></>;
};
