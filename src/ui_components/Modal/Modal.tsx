import { ReactNode } from 'react';
import './modal.css';
export const Modal = ({
	open,

	modalContent,
	modalTitle,

	onCancel,
}: {
	open: boolean;

	onCancel?: () => void;
	modalContent: ReactNode;
	modalTitle?: ReactNode;
}): JSX.Element => {
	if (!open) {
		return <></>;
	}
	return (
		<div className="modal">
			<div>
				<div className="modalHeader">
					{modalTitle && <div>{modalTitle}</div>}
					{onCancel && <button onClick={onCancel}>X</button>}
				</div>

				{modalContent}
			</div>
		</div>
	);
};
