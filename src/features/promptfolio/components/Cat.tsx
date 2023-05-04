import styles from '../Promptfolio.module.css';

interface CatProps {
	args: string,
}

export function Cat(props: CatProps) {
	const filesystem: {[index: string]:any} = {
		'resume.pdf': `${process.env.PUBLIC_URL}/resume.png`,
	}

	const getFileFullPath = (file: string) => {
		let path = filesystem[file];
		if (!path) {
			path = '';
		}
		return path;
	}

	const fileName = props.args;
	const filePath = getFileFullPath(fileName);

	return (
		filePath ?
			(
			<div className={styles.catOutput}>
				<embed
					title={props.args}
					src={filePath}
					width={'100%'}
				>
				</embed>
			</div>
			)
		:
			(<span>File {fileName} not found</span>)
	);
}
