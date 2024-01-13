import { skipToken } from '@reduxjs/toolkit/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetItemDataByNameQuery } from '../../../api/pokeApi';
import {
	useGetSaveFileQuery,
	usePutSaveFileMutation,
} from '../../../api/saveFileApi';
import { addItemStacksToInventory } from '../../../functions/addItemStacksToInventory';
import { addItemToStackList } from '../../../functions/addItemToStackList';
import { getUserName } from '../../../functions/getUserName';
import { Item, ItemStack } from '../../../interfaces/Item';
import { ItemData } from '../../../shared/interfaces/ItemData';

export const useMarketScreen = () => {
	const username = getUserName();
	const { data, isError, isFetching } = useGetSaveFileQuery(
		username ?? skipToken
	);
	const [getItemData] = useLazyGetItemDataByNameQuery();
	const [saveFile] = usePutSaveFileMutation();
	const { state } = useLocation();

	const [hydratedInventory, setHydratedInventory] = useState<ItemData[]>([]);

	useEffect(() => {
		const inventory = state as Item[];
		const getHydratedItems = () =>
			Promise.all(inventory.map((i) => getItemData(i.id).unwrap()));
		void getHydratedItems().then((res) => setHydratedInventory(res));
	}, [getItemData, state]);

	const [cart, setCart] = useState<ItemStack[]>([]);

	const addToCart = useCallback((x: ItemData) => {
		setCart((cart) => addItemToStackList(cart, x));
	}, []);

	const removeFromCart = useCallback((x: ItemStack) => {
		const updatedStack = { ...x, amount: x.amount - 1 };

		setCart((cart) =>
			cart
				.filter((cartItem) => cartItem.item.id !== x.item.id)
				.concat(updatedStack.amount > 0 ? [updatedStack] : [])
		);
	}, []);
	const totalCost = useMemo(() => {
		return cart.reduce((sum, summand) => {
			const cost =
				hydratedInventory.find((x) => x.name === summand.item.id)?.cost ?? 0;
			return sum + summand.amount * cost;
		}, 0);
	}, [cart, hydratedInventory]);

	const purchase = useCallback(() => {
		if (!data) {
			return;
		}
		const updatedFunds = data.money - totalCost;
		const updatedInventory = addItemStacksToInventory(data.inventory, cart);
		void saveFile({
			...data,
			inventory: updatedInventory,
			money: updatedFunds,
		});
		setCart([]);
	}, [cart, data, saveFile, totalCost]);

	return {
		addToCart,
		removeFromCart,
		totalCost,
		purchase,
		isError,
		isFetching,
		hydratedInventory,
		cart,
		data,
	};
};
