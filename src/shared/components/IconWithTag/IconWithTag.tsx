import './IconWithTag.css';

export const IconWithTag = ({
	src,
	tag,
}: {
	src: string;
	tag?: string | number;
}): JSX.Element => {
	return (
		<div style={{ marginBottom: tag ? '-1.5rem' : undefined }}>
			<img className="icon" src={src} />
			{tag && <div className="tag">{tag}</div>}
		</div>
	);
};
