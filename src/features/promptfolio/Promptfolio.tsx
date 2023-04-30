import React, { useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import {
	pushCommand,
	pushOutput,
	selectCommandCount,
	selectCommandHistory,
	selectOutput,
} from './promptfolioSlice';
import styles from './Promptfolio.module.css';
import { useSelector } from 'react-redux';
import { Input } from './components/Input';
import { Output } from './components/Output';
import { parseCommand } from './components/Parser';
import { selectPS1 } from './promptfolioSlice';

export function Promptfolio() {
	const dispatch = useAppDispatch();
	const totalCommandCount = useSelector(selectCommandCount);
	const outputHistory = useSelector(selectOutput);
	const commandHistory = useSelector(selectCommandHistory);
	const PS1 = useSelector(selectPS1);

	const [commandLine, setCommandLine] = useState('');
	const [currentCommandCount, setCurrentCommandCount] = useState(0);

	const fireCommand = () => {
		dispatch(pushCommand(`${PS1}${commandLine}`));
		setCurrentCommandCount(currentCommandCount+1);

		const commandResult = parseCommand(commandLine);
		dispatch(pushOutput(commandResult.output));
	}

	const keyPressMap = new Map();
	keyPressMap.set('Enter', function Enter() {
		fireCommand();
		setCommandLine("");
		setCurrentCommandCount(totalCommandCount);
	});
	keyPressMap.set('ArrowUp', function ArrowUp() {
		if (currentCommandCount > 0) {
			setCurrentCommandCount(currentCommandCount-1);
		}
		setCommandLine(commandHistory[currentCommandCount]);
	});
	keyPressMap.set('ArrowDown', function ArrowDown() {
		if (currentCommandCount < totalCommandCount) {
			setCurrentCommandCount(currentCommandCount+1);
			setCommandLine(commandHistory[currentCommandCount]);
		} else if (currentCommandCount === totalCommandCount) {
			setCommandLine("");
		}
	});

	const handleKeyPress = (e: React.KeyboardEvent) => {
		const keyFunction = keyPressMap.get(e.key);
		if (keyFunction) keyFunction();
	}

	return (
		<div className={`${styles.terminalColors} ${styles.terminal}`}>
			<Output
				outputHistory={outputHistory}
				commandHistory={commandHistory}
			/>
			<Input
				className={`${styles.terminalColors} ${styles.commandLine}`}
				value={commandLine}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommandLine(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
		</div>
	);
}
