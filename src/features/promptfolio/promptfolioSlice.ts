import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface PromptfolioState {
  commandHistory: string[],
  outputHistory: string[],
  commandCount: number,
  PS1User: string,
  PS1Host: string,
  PS1Directory: string,
}

const initialState: PromptfolioState = {
  commandHistory: [],
  outputHistory: [],
  commandCount: 0,
  PS1User: 'lucca',
  PS1Host: 'portfolio',
  PS1Directory: '~',
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
      state.commandCount += 1;
    },
    pushOutput: (state, action: PayloadAction<string>) => {
      state.outputHistory.push(action.payload);
    },
    clearOutput: (state) => {
      state.outputHistory = [];
    },
    updatePS1User: (state, action: PayloadAction<string>) => {
      state.PS1User = action.payload;
    },
    updatePS1Host: (state, action: PayloadAction<string>) => {
      state.PS1Host = action.payload;
    },
    updatePS1Directory: (state, action: PayloadAction<string>) => {
      state.PS1Directory = action.payload;
    }
  },
});

export const { pushCommand, pushOutput, clearOutput, updatePS1Directory } = promptfolioSlice.actions;
export const selectCommandCount = (state: RootState) => state.promptfolio.commandCount;
export const selectCommandHistory = (state: RootState) => state.promptfolio.commandHistory;
export const selectOutput = (state: RootState) => state.promptfolio.outputHistory;
export const selectPS1 = (state: RootState) => `${state.promptfolio.PS1User}@${state.promptfolio.PS1Host} ${state.promptfolio.PS1Directory} >`;

export default promptfolioSlice.reducer;
