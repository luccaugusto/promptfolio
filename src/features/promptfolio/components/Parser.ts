import styles from '../Promptfolio.module.css';

export const enum ProgramActions {
  OUTPUT_CLEAR = 'outputclear',
  RENDER = 'render',
  OUTPUT = 'output',
}

interface programResult {
  output: string,
  action: ProgramActions[],
  description?: string,
}

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
programList.set('skillset', function Skillset(): programResult {
  return {
    output: "Skillset",
    action: [ProgramActions.RENDER,],
    description: 'Show my skill set',
  }
});
programList.set('cat', function Cat(): programResult {
  return {
    output: "Cat",
    action: [ProgramActions.RENDER,],
    description: 'view a file',
  }
});
programList.set('about', function Cat(): programResult {
  return {
    output: 'Fun fact, <a href="https://en.wikipedia.org/wiki/Linux_kernel_version_history#Releases_4.x.y" target="_blank" rel="noreferrer">linux 4.7.10 was actually named Psychotic Stoned Sheep</a>',
    action: [],
    description: 'information about this project',
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
