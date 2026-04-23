import React, { useState } from 'react';

import styles from './Promptfolio.module.css';
import { Input } from './components/Input';
import { Parser } from './components/Parser';
import { ProgramActions } from './components/Parser';
import { Github } from './components/Github';
import { Skillset } from './components/Skillset';
import { Cat } from './components/Cat';
import { TextRender } from './components/TextRender';
import { TerminalProvider, useTerminal } from './TerminalContext';

const availableComponents: { [key: string]: any } = {
	Github: Github,
	Skillset: Skillset,
	Cat: Cat,
	TextRender: TextRender,
}

export const componentNames = {
	TEXT: 'TextRender',
	GITHUB: 'Github',
	CAT: 'Cat',
	SKILLSET: 'Skillset',
}

function PromptfolioInner() {
	const {
		commandHistory,
		commandOutput,
		output: outputHistory,
		currentDir,
		pushCommand,
		pushOutput,
		clearOutput,
		clearCommand,
	} = useTerminal();
	const {programList, parseCommand} = Parser();

	const [commandLine, setCommandLine] = useState('');
	const [currentCommandCount, setCurrentCommandCount] = useState(commandHistory.length);

	const fireCommand = (command: string) => {
		pushCommand(command);

		const programResult = parseCommand(command);
		if (programResult.action.indexOf(ProgramActions.OUTPUT_CLEAR) > -1) {
			clearOutput();
			clearCommand();
		} else if (programResult.action.indexOf(ProgramActions.REDIRECT) > -1){
			window.open(programResult.args);
			pushOutput({
				...programResult,
				action: ProgramActions.RENDER,
				args: `Opening ${programResult.args} in a new tab`
			});
		} else {
			pushOutput(programResult);
		}
	}

	const keyPressMap = new Map();
	function Enter(command?: string) {
		if (!command) command = commandLine;
		fireCommand(command);
		setCommandLine("");
		setCurrentCommandCount(commandHistory.length+1);
	}
	keyPressMap.set('Enter', Enter);
	keyPressMap.set('ArrowUp', function ArrowUp() {
		let lastCommandIndex = currentCommandCount;
		if (currentCommandCount > 1) {
			lastCommandIndex-=1;
			setCurrentCommandCount(lastCommandIndex);
			setCommandLine(commandHistory[lastCommandIndex]);
		}
	});
	keyPressMap.set('ArrowDown', function ArrowDown() {
		if (currentCommandCount < commandHistory.length) {
			const nextCommandIndex = currentCommandCount+1;
			setCurrentCommandCount(nextCommandIndex);
			setCommandLine(commandHistory[nextCommandIndex]);
		} else if (currentCommandCount === commandHistory.length) {
			setCommandLine("");
		}
	});
	keyPressMap.set('Tab', function Tab() {
		if (commandLine === '') {
			return;
		}
		const possibleValues: string[] = [];
		let possibleValuesCount = 0;
		let cmdLength = commandLine.length;
		//autocomplete files
		if (commandLine.indexOf(' ') > -1) {
			const file = commandLine.split(' ')[1]
			cmdLength = file.length
			Object.keys(currentDir).forEach(fileName => {
				if (fileName.substring(0, cmdLength) === file) {
					possibleValues.push(fileName);
					possibleValuesCount+=1;
				}
			});
			if (possibleValuesCount === 1) {
				setCommandLine(`${commandLine.split(' ')[0]} ${possibleValues[0]}`);
			}
		}

		//autocomplete programs
		else {
			programList.forEach((_program, programName) => {
				if (programName.substring(0, cmdLength) === commandLine) {
					possibleValues.push(programName);
					possibleValuesCount+=1;
				}
			})
			if (possibleValuesCount === 1) {
				setCommandLine(possibleValues[0]);
			}
		}
		if (possibleValuesCount > 1) {
			pushCommand(commandLine);
			pushOutput({
				args: possibleValues.reduce(
					(suggestionString, pName) => suggestionString += `&nbsp;&nbsp;${pName}`
				),
				action: ProgramActions.RENDER,
				component: componentNames.TEXT
			});
		}
	});

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Tab") e.preventDefault();
		const keyFunction = keyPressMap.get(e.key);
		if (keyFunction) keyFunction();
	}

	const generateFullOutput = () => {
		const fullOutput = [];
		for (let i=0; i < commandOutput.length; i++) {
			let commandValue = commandOutput[i].command;
			if (commandOutput[i].command === 'welcome') {
				commandValue = '';
			}
			fullOutput.push({type: 'command', args: commandValue, component: componentNames.TEXT, fullpath: commandOutput[i].PWD});
			fullOutput.push({type: 'output', args: outputHistory[i].args, component: outputHistory[i].component});
		}
		return fullOutput.slice(0).reverse();
	}

	return (
		<div className={`${styles.terminalColors} ${styles.terminal}`}>
			<ul className={styles.commandHistory}>
			{
				generateFullOutput().map((line, index) => {
					const Component = availableComponents[line.component];
					return (
					<li
						key={`line-${index}`}
						className={line.type === 'command' && line.args === '' ? styles.hidden : ''}
					>
						<Component args={line.args} type={line.type} fullpath={line.fullpath}/>
					</li>
				)})
			}
			</ul>
			<Input
				className={styles.commandLine}
				value={commandLine}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommandLine(e.target.value)}
				onKeyDown={handleKeyPress}
			/>
		</div>
	);
}

export function Promptfolio() {
	return (
		<TerminalProvider>
			<PromptfolioInner />
		</TerminalProvider>
	);
}
