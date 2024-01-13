export const PokemonSelectionScreen = ({
	choices,
}: {
	choices: number[];
}): JSX.Element => {
	return (
		<div>
			{choices.map((c) => (
				<h1>{c}</h1>
			))}
		</div>
	);
};
