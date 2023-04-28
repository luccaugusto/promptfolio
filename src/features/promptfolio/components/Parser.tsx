const programList = new Map();
programList.set('ls', function Ls() {
	return 'projects\t';
});

export function parseCommand (command: string) {
	const program = programList.get(command);
	let output = "";

	if (program) {
		output = program();
	} else if(command !== "") {
		output = `shell: ${command}: command not found`;
	}
	return output;
}
