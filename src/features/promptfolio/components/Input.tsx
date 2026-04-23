import { ChangeEventHandler, KeyboardEventHandler, useEffect }  from 'react';
import styles from '../Promptfolio.module.css';
import { useTerminal } from '../TerminalContext';

interface inputProps {
	className: string,
	value: string,
	onChange: ChangeEventHandler,
	onKeyDown: KeyboardEventHandler,
}

export function Input(props: inputProps) {
	const { PS1 } = useTerminal();

	useEffect(() => {
		setTimeout(
			() => {document.getElementById('cli-input')?.focus()},
			0
		);
	});

	return (
		<div className={props.className}>
		<span className={styles.PS1}>{PS1}&nbsp;</span>
			<input
				id={'cli-input'}
				value={props.value}
				onChange={props.onChange}
				onKeyDown={props.onKeyDown}
				autoComplete={'off'}
			/>
		</div>
	);
}
