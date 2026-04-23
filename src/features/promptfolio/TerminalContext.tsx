import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ProgramActions, programResult } from './components/Parser';
import { componentNames } from './Promptfolio';

const USERNAME = 'lucca';
const HOSTNAME = 'portfolio';

const FILE_SYSTEM: { [key: string]: any } = {
	'~': {
		'resume.pdf': `${process.env.PUBLIC_URL}/resume.pdf`,
		'linkedin-short.pdf': `${process.env.PUBLIC_URL}/linkedin.pdf`,
		github: {
			promptfolio: { url: `${process.env.REACT_APP_GITHUB_URL}/promptfolio` },
			tarts: { url: `${process.env.REACT_APP_GITHUB_URL}/tarts` },
			rice: { url: `${process.env.REACT_APP_GITHUB_URL}/rice` },
			github: { url: process.env.REACT_APP_GITHUB_URL },
		},
		linkedin: {
			url: process.env.REACT_APP_LINKEDIN_URL,
		},
	},
};

const WELCOME_TEXT = "Linux V4.7.10 Psychotic Stoned Sheep</br>Welcome to Lucca's Prompfolio</br>Type `help` for available commands.";

interface CommandEntry {
	command: string;
	PWD: string;
}

interface TerminalContextValue {
	commandHistory: string[];
	commandOutput: CommandEntry[];
	output: programResult[];
	fullpath: string[];

	PWD: string;
	currentDir: { [key: string]: any };
	PS1: string;
	userAtHost: string;

	pushCommand: (command: string) => void;
	pushOutput: (result: programResult) => void;
	clearOutput: () => void;
	clearCommand: () => void;
	pushFullpath: (dir: string) => void;
	popFullpath: () => void;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: React.ReactNode }) {
	const [commandHistory, setCommandHistory] = useState<string[]>(['welcome']);
	const [commandOutput, setCommandOutput] = useState<CommandEntry[]>([
		{ command: 'welcome', PWD: '~' },
	]);
	const [output, setOutput] = useState<programResult[]>([
		{ component: componentNames.TEXT, args: WELCOME_TEXT, action: ProgramActions.RENDER },
	]);
	const [fullpath, setFullpath] = useState<string[]>(['~']);

	const PWD = fullpath.join('/');

	const currentDir = useMemo(() => {
		let dir = FILE_SYSTEM['~'];
		fullpath.slice(1).forEach((d) => { dir = dir[d]; });
		return dir;
	}, [fullpath]);

	const PS1 = `${USERNAME}@${HOSTNAME} ${PWD} >`;
	const userAtHost = `${USERNAME}@${HOSTNAME}`;

	const pushCommand = useCallback((command: string) => {
		setCommandHistory((prev) => [...prev, command]);
		setCommandOutput((prev) => [...prev, { command, PWD: fullpath.join('/') }]);
	}, [fullpath]);

	const pushOutput = useCallback((result: programResult) => {
		setOutput((prev) => [...prev, result]);
	}, []);

	const clearOutput = useCallback(() => setOutput([]), []);
	const clearCommand = useCallback(() => setCommandOutput([]), []);

	const pushFullpath = useCallback((dir: string) => {
		setFullpath((prev) => [...prev, dir]);
	}, []);

	const popFullpath = useCallback(() => {
		setFullpath((prev) => prev.slice(0, -1));
	}, []);

	const value: TerminalContextValue = {
		commandHistory,
		commandOutput,
		output,
		fullpath,
		PWD,
		currentDir,
		PS1,
		userAtHost,
		pushCommand,
		pushOutput,
		clearOutput,
		clearCommand,
		pushFullpath,
		popFullpath,
	};

	return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminal(): TerminalContextValue {
	const ctx = useContext(TerminalContext);
	if (!ctx) {
		throw new Error('useTerminal must be used within a TerminalProvider');
	}
	return ctx;
}
