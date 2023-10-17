import { Modal } from '../../../../ui_components/Modal/Modal';

export const MessageHandlerModal = ({
	message,
	handleNextSnapshot,
}: {
	message?: string;
	handleNextSnapshot: () => void;
}): JSX.Element => {
	if (!message) {
		return <></>;
	}

	return (
		<Modal
			open={!!message}
			modalContent={<button onClick={handleNextSnapshot}>{message}</button>}
		/>
	);
};
