import { useAppDispatch } from '../../../app/hooks';
import { pushOutput } from '../promptfolioSlice';

export function ParseCommand(command: string) {
	const programList = new Map();
	const dispatch = useAppDispatch();

	programList.set('ls', function Enter() {
		dispatch(pushOutput('projects\t'));
	});

	const program = programList.get(command);
	if (program) program();
}
