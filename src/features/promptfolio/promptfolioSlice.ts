import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface PromptfolioState {
  commandHistory: string[],
  outputHistory: string[],
  commandCount: number,
  PS1: string,
}

const initialState: PromptfolioState = {
  commandHistory: [],
  outputHistory: [],
  commandCount: 0,
  PS1: 'lucca@~ >',
};

export const promptfolioSlice = createSlice({
  name: 'promptfolio',
  initialState,
  reducers: {
    incrementCommandCount: (state) => {
      state.commandCount += 1;
    },
    pushCommand: (state, action: PayloadAction<string>) => {
      state.commandHistory.push(action.payload)
      state.commandCount += 1;
    },
    pushOutput: (state, action: PayloadAction<string>) => {
      state.outputHistory.push(action.payload)
    },
    clearOutput: (state) => {
      state.outputHistory = []
    },
  },
});

export const { pushCommand, pushOutput, clearOutput } = promptfolioSlice.actions;
export const selectCommandCount = (state: RootState) => state.promptfolio.commandCount;
export const selectCommandHistory = (state: RootState) => state.promptfolio.commandHistory;
export const selectOutput = (state: RootState) => state.promptfolio.outputHistory;
export const selectPS1 = (state: RootState) => state.promptfolio.PS1;

export default promptfolioSlice.reducer;
