import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../api/saveFileApi';
import { Headline } from '../../components/Headline/Headline';
import { PokemonCardWithImage } from '../../components/PokemonCardWithImage/PokemonCardWithImage';
import { getUserName } from '../../functions/getUserName';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';

export const PokemonSelectionScreen = ({
	choices,
	headline,
}: {
	choices: number[];
	headline: string;
}): JSX.Element => {
	const username = getUserName();
	const { data, isFetching } = useGetSaveFileQuery(username ?? skipToken);
	const [save] = usePutSaveFileMutation();
	const navigate = useNavigate();

	if (isFetching) {
		return <FetchingScreen />;
	}

	if (data) {
		return (
			<div className="container">
				<Headline text={headline} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
						marginTop: '2rem',
						flexWrap: 'wrap',
						gap: '2rem',
					}}
				>
					{choices.map((c) => (
						<PokemonCardWithImage
							dexId={c}
							onClick={() => {
								void save({
									...data,
									pokemon: [
										...data.pokemon,
										{
											dexId: c,
											id: v4(),
											onTeam: data.pokemon.length < 6,
											xp: 100,
											damage: 0,
										},
									],
									pokedex: [...data.pokedex, { dexId: c, status: 'owned' }],
								});
								navigate('/overworld');
							}}
						/>
					))}
				</div>
			</div>
		);
	}
	return <ErrorScreen />;
};
