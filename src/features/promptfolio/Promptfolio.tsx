import React, { useState } from 'react';// eslint-disable-line

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  pushCommand,
  pushOutput,
  clearOutput,
  selectCommandCount,
  selectCommand,
  selectOutput,
} from './promptfolioSlice';
import styles from './Promptfolio.module.css';
import { useSelector } from 'react-redux';

export function Promptfolio() {
  const dispatch = useAppDispatch();
  const commandCount = useSelector(selectCommandCount);
  const outputHistory = useSelector(selectOutput);

  const [commandLine, setCommandLine] = useState('')

  const fireCommand = () => {
	  dispatch(pushCommand(commandLine));
	  dispatch(pushOutput(commandLine));
  }

  const handleKeyPress = (e: any) => {
	  //TODO: change to a hash map when i have more events
	  if (e.key === 'Enter') {
		  fireCommand()
	  }
  }

  return (
    <div>
		<ul className={styles.commandHistory}>
			{
				outputHistory.map((line) => (
					<li>
						{line}
					</li>
				))
			}
		</ul>
		<input
			value={commandLine}
			onChange={e => setCommandLine(e.target.value)}
			onKeyDown={handleKeyPress}
		/>
    </div>
  );
}
