import { ChangeEventHandler, KeyboardEventHandler }  from 'react';
import { selectPS1 } from './promptfolioSlice';
import styles from './Promptfolio.module.css';
import { useSelector } from 'react-redux';

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
		<span className={styles.PS1}>{PS1}</span>
			<input
				value={props.value}
				onChange={props.onChange}
				onKeyDown={props.onKeyDown}
			/>
		</div>
	);
}
