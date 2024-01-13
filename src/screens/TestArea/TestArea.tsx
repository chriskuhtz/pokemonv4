import { CardWithImage } from '../../ui_components/CardWithImage/CardWithImage';

export const TestArea = (): JSX.Element => {
	return (
		<div>
			<CardWithImage
				url={
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
				}
				title="Ditto"
				subtitle="The transforming Pokemon"
				onClick={() => console.log('vrete')}
			/>
		</div>
	);
};
