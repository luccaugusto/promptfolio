import { useSelector } from 'react-redux';
import styles from '../Promptfolio.module.css';
import { selectPS1 } from '../promptfolioSlice';

interface OutputProps {
	outputHistory: string[],
	commandHistory: string[],
}

export function Output(props: OutputProps) {
	const PS1 = useSelector(selectPS1);
	const lineToKey = (line: string, index: number) => {
		return `${line.substring(0,5).replaceAll(' ','-')}-${index}`;
	}

	const generateFullOutput = () => {
		const fullOutput = [];
		for (let i=0; i < props.commandHistory.length; i++) {
			fullOutput.push(props.commandHistory[i]);
			fullOutput.push(props.outputHistory[i]);
		}
		return fullOutput.slice(0).reverse();
	}

	return (
		<ul className={styles.commandHistory}>
		{
			generateFullOutput().map((line, index) => (
				<li key={lineToKey(line, index)}>
				{
					index % 2 !== 0 ?
					(<span><span className={styles.PS1}>{PS1}</span><span>{line}</span></span>)
					:
					(<span>{line}</span>)
				}
				</li>
			))
		}
		</ul>
	);
}
