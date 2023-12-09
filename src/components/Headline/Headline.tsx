import { RouterButton, RouterButtonProps } from '../RouterButton/RouterButton';
import './Headline.css';
export const Headline = ({
	text,
	routerButtonProps,
	className,
	style,
}: {
	text: string;
	routerButtonProps?: RouterButtonProps;
	className?: string;
	style?: React.CSSProperties;
}): JSX.Element => {
	return (
		<div className={`headline ${className}`} style={style}>
			{routerButtonProps && (
				<RouterButton
					to={routerButtonProps.to}
					text={routerButtonProps.text}
					sideEffect={routerButtonProps.sideEffect}
				/>
			)}
			<h1>{text}</h1>
		</div>
	);
};
