import { useSelector } from 'react-redux';
import styles from '../Promptfolio.module.css';
import { selectCurrentDir} from '../promptfolioSlice';

interface CatProps {
	args: string,
}

export function Cat(props: CatProps) {
	const currentDir = useSelector(selectCurrentDir);

	const getFileFullPath = (file: string) => {
		let path = currentDir[file];
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
					itemType={'application/pdf'}
					src={filePath}
					width={'100%'}
					height={'1200px'}
				>
				</embed>
			</div>
			)
		:
			(<span>File {fileName} not found</span>)
	);
}
