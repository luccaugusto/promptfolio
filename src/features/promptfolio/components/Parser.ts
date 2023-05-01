import styles from '../Promptfolio.module.css';

export const enum ProgramActions {
  OUTPUT_CLEAR = 'outputclear',
  RENDER = 'render',
}

interface programResult {
  output: string,
  action: ProgramActions[],
  description?: string,
}

//TODO: cd command opens a new tab in the website that is the directory: example cd github goes to https://github.com/luccaugusto
export const programList = new Map();
programList.set('ls', function Ls(): programResult {
  return {
    output: `resume.pdf<span class=${styles.indented}>github</span>`,
    action: [],
    description: "List files and directories"
  };
});
programList.set('help', function Help(): programResult {
  let output = 'Commands available:';
  programList.forEach((program, programName) => {
    let description = "Show this help text";
    if (programName !== "help") {
      description = program().description;
    }
    output = `${output}</br><span class="${styles.indented}">${programName}: ${description}</span>`
  });
  return { output, action: [] };
});
programList.set('clear', function Clear(): programResult {
  return {
    output: '',
    action: [ProgramActions.OUTPUT_CLEAR,],
    description: 'Clear the terminal screen'
  };
});
programList.set('github-stats', function GithubStats(): programResult {
  return {
    output: "Github",
    action: [ProgramActions.RENDER,],
    description: 'Show github stats',
  }
});

export function parseCommand (command: string): programResult {
	const programName = command.split(' ')[0];
	const programArgs = command.split(' ').slice(1);
	const program = programList.get(programName);
	let output = "";
	let action = [];

	if (program) {
		({output, action} = program(programArgs));
	} else if(command !== "") {
		output = `shell: ${command}: command not found`;
	}
	return {output, action};
}
