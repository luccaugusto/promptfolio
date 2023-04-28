const programList = new Map();
programList.set('ls', function Ls() {
	return {output: 'projects\t', updated: {}};
});
programList.set('cd', function Cd(arg: string) {
	//ignore other arguments
	if (Array.isArray(arg)) {
		arg = arg[0];
	}
	if (!arg) {
		arg = '~';
	}
	return {output: '', updated: {directory: arg}};
});

export function parseCommand (command: string) {
	const programName = command.split(' ')[0];
	const programArgs = command.split(' ').slice(1);
	const program = programList.get(programName);
	let output = "";
	let updated = "";

	if (program) {
		({output, updated} = program(programArgs));
	} else if(command !== "") {
		output = `shell: ${command}: command not found`;
	}
	return {output, updated};
}
