import { Headline } from '../../components/Headline/Headline';
import { MarketListItem } from '../../components/MarketListItem/MarketListItem';
import { RoutesEnum } from '../../router/router';
import { Pill } from '../../ui_components/Pill/Pill';
import { ErrorScreen } from '../ErrorScreen/ErrorScreen';
import { FetchingScreen } from '../FetchingScreen/FetchingScreen';
import './MarketScreen.css';
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
			{hydratedInventory && data && (
				<div className="marketScreen">
					<div>
						<h3 className="availableFunds">Available Funds: {data.money}$</h3>
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
						>
							{hydratedInventory.map((inventoryItem) => (
								<MarketListItem
									item={inventoryItem}
									onClick={() => addToCart(inventoryItem)}
								/>
							))}
						</div>
					</div>
					{cart.length > 0 && (
						<div className="cart">
							<div>
								{cart.map((cartItem) => (
									<h3 className="cartItem">
										<span>
											{cartItem.amount} {cartItem.item.id}
										</span>
										<span onClick={() => removeFromCart(cartItem)}>
											{cartItem.amount === 1 ? 'X' : '-'}
										</span>
									</h3>
								))}
							</div>
							<div>
								<h3 className="cartTotal">
									<span>TOTAL :</span>
									<span>{totalCost}$</span>{' '}
								</h3>
								<Pill
									disabled={totalCost > data.money}
									className="buyButton"
									center={'Buy'}
									onClick={purchase}
								/>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
