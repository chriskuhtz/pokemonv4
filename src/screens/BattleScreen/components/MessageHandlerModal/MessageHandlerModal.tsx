import { useCallback, useState } from 'react';
import { Modal } from '../../../../ui_components/Modal/Modal';

export const MessageHandlerModal = ({
	messages,
	handleNextSnapshot,
}: {
	messages?: string[];
	handleNextSnapshot: () => void;
}): JSX.Element => {
	const [index, setIndex] = useState<number>(0);

	const iterateThroughMessages = useCallback(() => {
		if (messages && index === messages?.length - 1) {
			handleNextSnapshot();
			setIndex(0);
		} else setIndex(index + 1);
	}, [handleNextSnapshot, index, messages]);
	if (!messages) {
		return <></>;
	}

	return (
		<Modal
			open={!!messages}
			modalContent={
				<button onClick={iterateThroughMessages}>{messages[index]}</button>
			}
		/>
	);
};
