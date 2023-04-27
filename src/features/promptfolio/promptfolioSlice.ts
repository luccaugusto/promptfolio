import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface PromptfolioState {
  commandHistory: string[],
  outputHistory: string[],
  commandCount: number
}

const initialState: PromptfolioState = {
  commandHistory: [],
  outputHistory: [],
  commandCount: 0
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
export const selectCommand = (state: RootState, action: PayloadAction<number>) => state.promptfolio.commandHistory[action.payload];
export const selectOutput = (state: RootState) => state.promptfolio.outputHistory;

export default promptfolioSlice.reducer;
