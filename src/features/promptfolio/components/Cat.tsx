import styles from '../Promptfolio.module.css';
import { useTerminal } from '../TerminalContext';
import { Resume } from '../../resume/Resume';

interface CatProps {
	args: string,
}

export function Cat(props: CatProps) {
	const { currentDir } = useTerminal();

	const getFileFullPath = (file: string) => {
		let path = currentDir[file];
		if (!path) {
			path = '';
		}
		return path;
	}

	const fileName = props.args;
	const filePath = getFileFullPath(fileName);

	if (!filePath) {
		return <span>File {fileName} not found</span>;
	}

	if (fileName === 'resume.pdf') {
		return (
			<div className={styles.catResume}>
				<Resume />
			</div>
		);
	}

	return (
		<div className={styles.catOutput}>
			<embed
				title={props.args}
				itemType={'application/pdf'}
				src={filePath}
				width={'100%'}
				height={'1200px'}
			>
			</embed>
		</div>
	);
}
