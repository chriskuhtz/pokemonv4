import { ReactNode } from 'react';
import './modal.css';
export const Modal = ({
	open,

	modalContent,
	modalTitle,
	onOpen,
	buttonContent,
	onCancel,
}: {
	open: boolean;
	onOpen: () => void;
	onCancel: () => void;
	modalContent: ReactNode;
	modalTitle: ReactNode;
	buttonContent: ReactNode;
}): JSX.Element => {
	if (!open) {
		return <button onClick={onOpen}>{buttonContent}</button>;
	}
	return (
		<div className="modal">
			<div className="modalContent">
				<div className="modalHeader">
					<div>{modalTitle}</div>
					<button onClick={onCancel}>X</button>
				</div>

				{modalContent}
			</div>
		</div>
	);
};
