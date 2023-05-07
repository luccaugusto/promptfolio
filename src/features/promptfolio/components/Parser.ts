import styles from '../Promptfolio.module.css';
import { componentNames } from '../Promptfolio';

export const enum ProgramActions {
  OUTPUT_CLEAR = 'outputclear',
  RENDER = 'render',
  OUTPUT = 'output',
}

//TODO: implement cd command that opens a new tab to wherever the user cd to
  //cd goes to linkedin and github pages, github dir has my repos to cd into
//TODO: implement write command to send me an email
export interface programResult {
  component: string,
  action: ProgramActions,
  description?: string,
  args: string,
}

export const programList = new Map();
programList.set('ls', function Ls(fileSystem?: {[index: string]: any}): programResult {
  if (!fileSystem) fileSystem = {};
  return {
    args: Object.keys(fileSystem).map((k) => `<span class=${styles.indented}>${k}</span>`).join(' '),
    action: ProgramActions.RENDER,
    component: componentNames.TEXT,
    description: "List files and directories"
  };
});
programList.set('help', function Help(): programResult {
  let args = 'Commands available:';
  programList.forEach((program, programName) => {
    let description = "Show this help text";
    if (programName !== "help") {
      description = program().description;
    }
    args = `${args}</br><span class="${styles.indented}">${programName}: ${description}</span>`
  });
  return { component: componentNames.TEXT, action: ProgramActions.RENDER, args };
});
programList.set('clear', function Clear(): programResult {
  return {
    component: '',
    action: ProgramActions.OUTPUT_CLEAR,
    args: '',
    description: 'Clear the terminal screen'
  };
});
programList.set('github-stats', function GithubStats(): programResult {
  return {
    component: componentNames.GITHUB,
    action: ProgramActions.RENDER,
    args: '',
    description: 'Show github stats',
  }
});
programList.set('skillset', function Skillset(): programResult {
  return {
    component: componentNames.SKILLSET,
    action: ProgramActions.RENDER,
    args: '',
    description: 'Show my skill set',
  }
});
programList.set('cat', function Cat(args: string): programResult {
  return {
    component: componentNames.CAT,
    action: ProgramActions.RENDER,
    args,
    description: 'view a file',
  }
});
programList.set('about', function Cat(): programResult {
  return {
    args: `
    This is my Promptfolio, a ReactJS application made to simulate linux terminal.<br/>
    I do love terminal applications and i try to do most of my work without GUI applications.<br/>
    I feel a lot more confortable not having to use the mouse. This project reflects this directly.<br/>
    As i mentioned before, Promptfolio is developed in ReactJS, using Redux<br/>
    (i didn't really need to use it, but i really wanted to just to practice).<br/>
    You can find the source code in my github page (just type cd github/promptfolio to get there)<br/>
    Fun fact, <a href="https://en.wikipedia.org/wiki/Linux_kernel_version_history#Releases_4.x.y" target="_blank" rel="noreferrer">linux 4.7.10 was actually named Psychotic Stoned Sheep</a>`,
    action: ProgramActions.RENDER,
    component: componentNames.TEXT,
    description: 'information about this project',
  }
});
programList.set('welcome', function Welcome(): programResult {
  const welcomeText = `
  Linux V4.7.10 Psychotic Stoned Sheep</br>
  Welcome to Lucca's Prompfolio</br>
  Type \`help\` for available commands.`;
  return {component: componentNames.TEXT, args: welcomeText, action: ProgramActions.RENDER}
});

export function parseCommand (command: string, fileSystem: {[index: string]: any}): programResult {
	const programName = command.split(' ')[0];
	const programArgs = programName === 'ls' ? fileSystem : command.split(' ').slice(1)[0];
	const program = programList.get(programName);
	let component = componentNames.TEXT;
	let action = ProgramActions.RENDER;
  let args = '';

	if (program) {
		({component, action, args} = program(programArgs));
	} else if(command !== "") {
		args = `shell: ${command}: command not found`;
	}
	return {component, action, args};
}
