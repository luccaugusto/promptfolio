import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { ProgramActions, programResult } from './components/Parser';
import { componentNames } from './Promptfolio';

export interface PromptfolioState {
  commandHistory: string[],
  commandOutput: string[],
  output: programResult[],
  username: string,
  hostname: string,
  PWD: string,
  fileSystem: {[index: string]: any},
}

const welcomeText = "Linux V4.7.10 Psychotic Stoned Sheep</br>Welcome to Lucca's Prompfolio</br>Type `help` for available commands.";

const initialState: PromptfolioState = {
  commandHistory: ['welcome'],
  commandOutput: ['welcome'],
  output: [{component: componentNames.TEXT, args: welcomeText, action: ProgramActions.RENDER}],
  username: 'lucca',
  hostname: 'portfolio',
  PWD: '~',
  fileSystem: {
		'resume.pdf': `${process.env.PUBLIC_URL}/resume.pdf`,
  },
};

export const promptfolioSlice = createSlice({
  name: 'promptfolio',
  initialState,
  reducers: {
    pushCommand: (state, action: PayloadAction<string>) => {
      state.commandHistory.push(action.payload);
      state.commandOutput.push(action.payload);
    },
    pushOutput: (state, action: PayloadAction<programResult>) => {
      state.output.push(action.payload);
    },
    clearOutput: (state) => {
      state.output = [];
    },
    clearCommand: (state) => {
      state.commandOutput = [];
    },
    updatePS1User: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updatePS1Host: (state, action: PayloadAction<string>) => {
      state.hostname = action.payload;
    },
    updatePS1Directory: (state, action: PayloadAction<string>) => {
      state.PWD = action.payload;
    },
  },
});

export const { pushCommand, pushOutput, clearOutput, updatePS1Directory, clearCommand } = promptfolioSlice.actions;
export const selectCommandHistory = (state: RootState) => state.promptfolio.commandHistory;
export const selectcommandOutput = (state: RootState) => state.promptfolio.commandOutput;
export const selectOutput = (state: RootState) => state.promptfolio.output;
export const selectPS1 = (state: RootState) => `${state.promptfolio.username}@${state.promptfolio.hostname} ${state.promptfolio.PWD} >`;
export const selectFileSystem = (state: RootState) => state.promptfolio.fileSystem;

export default promptfolioSlice.reducer;
