import { Headline } from '../../components/Headline/Headline';
import { RoutesEnum } from '../../router/router';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import './MarketScreen.css';
import { Cart } from './components/Cart';
import { HydratedInventory } from './components/HydratedInventory';
import { useMarketScreen } from './hooks/useMarketScreen';

export const MarketScreen = (): JSX.Element => {
	const {
		addToCart,
		removeFromCart,
		totalCost,
		purchase,
		isError,
		isFetching,
		hydratedInventory,
		cart,
		data,
	} = useMarketScreen();

	return (
		<div className="container">
			<Headline
				text={'Market'}
				routerButtonProps={{ to: RoutesEnum.overworld, text: 'Overworld' }}
			/>
			{isError && <ErrorScreen />}
			{isFetching && <FetchingScreen />}
			{data && (
				<div className="marketScreen">
					<div>
						<h3 className="availableFunds">Available Funds: {data.money}$</h3>
						<HydratedInventory
							addToCart={addToCart}
							hydratedInventory={hydratedInventory}
						/>
					</div>
					<Cart
						cart={cart}
						removeFromCart={removeFromCart}
						totalCost={totalCost}
						money={data.money}
						purchase={purchase}
					/>
				</div>
			)}
		</div>
	);
};
