import { useSelector } from 'react-redux';
import styles from './Promptfolio.module.css';
import { selectPS1 } from './promptfolioSlice';

interface OutputProps {
	outputHistory: string[],
}

export function Output(props: OutputProps) {
	const PS1 = useSelector(selectPS1);
	const lineToKey = (line: string, index: number) => {
		return `${line.substring(0,5).replaceAll(' ','-')}-${index}`;
	}

	return (
		<ul className={styles.commandHistory}>
		{
			props.outputHistory.slice(0).reverse().map((line, index) => (
				<li key={lineToKey(line, index)}>
					<span className={styles.PS1}>{PS1}</span>{line}
				</li>
			))
		}
		</ul>
	);
}
