import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

export interface MobilePageState {
  commandHistory: string[],
  commandOutput: {command: string, PWD: string}[],
  username: string,
  hostname: string,
  fullpath: string[],
  PWD: string,
  fileSystem: {[index: string]: any},
}

const welcomeText = "Linux V4.7.10 Psychotic Stoned Sheep</br>Welcome to Lucca's Prompfolio</br>Type `help` for available commands.";

const initialState: MobilePageState = {
  commandHistory: ['welcome'],
  commandOutput: [{command: 'welcome', PWD: '~'}],
  username: 'lucca',
  hostname: 'portfolio',
  fullpath: ['~'],
  PWD: '~',
  fileSystem: {
    '~' : {
      'resume.pdf': `${process.env.PUBLIC_URL}/resume.pdf`,
      'linkedin-short.pdf': `${process.env.PUBLIC_URL}/linkedin.pdf`,
      github: {
        promptfolio: {url: `${process.env.REACT_APP_GITHUB_URL}/promptfolio`},
        tarts: {url: `${process.env.REACT_APP_GITHUB_URL}/tarts`},
        rice: {url: `${process.env.REACT_APP_GITHUB_URL}/rice`},
        github: {url: process.env.REACT_APP_GITHUB_URL},
      },
      linkedin: {
        url: process.env.REACT_APP_LINKEDIN_URL
      }
    }
  },
};

export const mobilePageSlice = createSlice({
  name: 'promptfolio',
  initialState,
  reducers: {
    pushCommand: (state, action: PayloadAction<string>) => {
      state.commandHistory.push(action.payload);
      state.commandOutput.push({command: action.payload, PWD: state.fullpath.join('/')});
    },
    pushFullpath: (state, action: PayloadAction<string>) => {
      state.fullpath.push(action.payload);
    },
    popFullpath: (state) => {
      state.fullpath.pop();
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
    updatePWD: (state, action: PayloadAction<string>) => {
      state.PWD = action.payload;
    },
  },
});

export const { pushCommand, pushFullpath, popFullpath, updatePWD, clearCommand } = mobilePageSlice.actions;
export const selectCommandHistory = (state: RootState) => state.promptfolio.commandHistory;
export const selectcommandOutput = (state: RootState) => state.promptfolio.commandOutput;
export const selectOutput = (state: RootState) => state.promptfolio.output;
export const selectPS1 = (state: RootState) => `${state.promptfolio.username}@${state.promptfolio.hostname} ${state.promptfolio.PWD} >`;
export const selectUserAtHost = (state: RootState) => `${state.promptfolio.username}@${state.promptfolio.hostname}`;
export const selectFileSystem = (state: RootState) => state.promptfolio.fileSystem;
export const selectPWD = (state: RootState) => state.promptfolio.PWD;
export const selectFullpath = (state: RootState) => state.promptfolio.fullpath;

export const selectCurrentDir = (state: RootState) => {
  let currentDir = state.promptfolio.fileSystem['~'];
  state.promptfolio.fullpath.slice(1).forEach((dir) => {
    currentDir = currentDir[dir];
  });
  return currentDir;
}


export default mobilePageSlice.reducer;
