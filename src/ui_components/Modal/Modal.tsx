import { ReactNode } from 'react';
import './modal.css';
export const Modal = ({
	open,

	modalContent,
	modalTitle,

	onCancel,
}: {
	open: boolean;

	onCancel: () => void;
	modalContent: ReactNode;
	modalTitle: ReactNode;
}): JSX.Element => {
	if (!open) {
		return <></>;
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
