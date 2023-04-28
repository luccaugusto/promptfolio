import { ChangeEventHandler, KeyboardEventHandler }  from 'react';
import { useSelector } from 'react-redux';
import { selectPS1 } from './promptfolioSlice';

interface inputProps {
	className: string,
	value: string,
	onChange: ChangeEventHandler,
	onKeyDown: KeyboardEventHandler,
}

export function Input(props: inputProps) {
	const PS1 = useSelector(selectPS1);

	return (
		<div className={props.className}>
		<span>{PS1} </span>
			<input
				value={props.value}
				onChange={props.onChange}
				onKeyDown={props.onKeyDown}
			/>
		</div>
	);
}
