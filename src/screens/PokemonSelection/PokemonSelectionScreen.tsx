import { Headline } from '../../components/Headline/Headline';
import { PokemonCardWithImage } from '../../components/PokemonCardWithImage/PokemonCardWithImage';

export const PokemonSelectionScreen = ({
	choices,
	headline,
}: {
	choices: number[];
	headline: string;
}): JSX.Element => {
	return (
		<div className="container">
			<Headline text={headline} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					marginTop: '2rem',
				}}
			>
				{choices.map((c) => (
					<PokemonCardWithImage
						dexId={c}
						onClick={() => console.log('rfref')}
					/>
				))}
			</div>
		</div>
	);
};
