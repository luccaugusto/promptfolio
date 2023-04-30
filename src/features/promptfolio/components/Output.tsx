import { useSelector } from 'react-redux';
import styles from '../Promptfolio.module.css';
import { selectPS1 } from '../promptfolioSlice';

interface OutputProps {
	outputHistory: string[],
	commandOutput: string[],
}

export function Output(props: OutputProps) {
	const PS1 = useSelector(selectPS1);
	const lineToKey = (line: string, index: number) => {
		const prefix = line ? line.substring(0,5).replaceAll(' ','-') : '';
		return `${prefix}-${index}`;
	}

	const generateFullOutput = () => {
		const fullOutput = [];
		for (let i=0; i < props.commandOutput.length; i++) {
			fullOutput.push({type: 'command', value: `<span class="${styles.PS1}">${PS1}</span> ${props.commandOutput[i]}`});
			fullOutput.push({type: 'output', value: props.outputHistory[i]});
		}
		return fullOutput.slice(0).reverse();
	}

	return (
		<ul className={styles.commandHistory}>
		{
			generateFullOutput().map((line, index) => (
				<li
					key={lineToKey(line.value, index)}
					className={line.type === 'output' && !line.value ? styles.hidden : ''}
					dangerouslySetInnerHTML={{__html: line.value}}
				>
				</li>
			))
		}
		</ul>
	);
}
