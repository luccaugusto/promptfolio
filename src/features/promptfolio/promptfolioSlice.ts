import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface PromptfolioState {
  commandHistory: string[],
  commandOutput: string[],
  output: string[],
  commandCount: number,
  username: string,
  hostname: string,
  PWD: string,
  filesystem: {},
}

const welcomeText = "Linux V4.7.10 Psychotic Stoned Sheep</br>Welcome to Lucca's Prompfolio</br>Type `help` for available commands.";

const initialState: PromptfolioState = {
  commandHistory: ['welcome'],
  commandOutput: ['welcome'],
  output: [welcomeText],
  commandCount: 0,
  username: 'lucca',
  hostname: 'portfolio',
  PWD: '~',
  filesystem: {
    "~": {
      "projects": {},
    }
  }
};

export const promptfolioSlice = createSlice({
  name: 'promptfolio',
  initialState,
  reducers: {
    incrementCommandCount: (state) => {
      state.commandCount += 1;
    },
    pushCommand: (state, action: PayloadAction<string>) => {
      state.commandHistory.push(action.payload);
      state.commandOutput.push(action.payload);
      state.commandCount += 1;
    },
    pushOutput: (state, action: PayloadAction<string>) => {
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
    updateFileSystem: (state, action: PayloadAction<object>) => {
      state.filesystem = action.payload;
    },
  },
});

export const { pushCommand, pushOutput, clearOutput, updatePS1Directory, clearCommand } = promptfolioSlice.actions;
export const selectCommandCount = (state: RootState) => state.promptfolio.commandCount;
export const selectCommandHistory = (state: RootState) => state.promptfolio.commandHistory;
export const selectcommandOutput = (state: RootState) => state.promptfolio.commandOutput;
export const selectOutput = (state: RootState) => state.promptfolio.output;
export const selectPS1 = (state: RootState) => `${state.promptfolio.username}@${state.promptfolio.hostname} ${state.promptfolio.PWD} >`;
export const selectFileSystem = (state: RootState) => state.promptfolio.filesystem;

export default promptfolioSlice.reducer;
