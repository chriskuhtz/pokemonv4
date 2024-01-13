import { ItemStack } from '../../../../interfaces/Item';
import { Pill } from '../../../../ui_components/Pill/Pill';
import './Cart.css';
export const Cart = ({
	cart,
	removeFromCart,
	totalCost,
	money,
	purchase,
}: {
	cart: ItemStack[];
	removeFromCart: (x: ItemStack) => void;
	totalCost: number;
	money: number;
	purchase: () => void;
}): React.JSX.Element => {
	if (cart.length === 0) {
		return <></>;
	}
	return (
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
					disabled={totalCost > money}
					className="buyButton"
					center={'Buy'}
					onClick={purchase}
				/>
			</div>
		</div>
	);
};
