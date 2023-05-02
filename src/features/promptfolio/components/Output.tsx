import { useSelector } from 'react-redux';
import styles from '../Promptfolio.module.css';
import { selectPS1 } from '../promptfolioSlice';

interface OutputProps {
	outputHistory: string[],
	commandOutput: string[],
}

export function Output(props: OutputProps) {
	const PS1 = useSelector(selectPS1);

	const generateFullOutput = () => {
		const fullOutput = [];
		for (let i=0; i < props.commandOutput.length; i++) {
			let commandValue = `<span class="${styles.PS1}">${PS1}</span> ${props.commandOutput[i]}`;
			if (props.commandOutput[i] === 'welcome') {
				commandValue = '';
			}
			fullOutput.push({type: 'command', value: commandValue});
			fullOutput.push({type: 'output', value: props.outputHistory[i]});
		}
		return fullOutput.slice(0).reverse();
	}

	return (
		<ul className={styles.commandHistory}>
		{
			generateFullOutput().map((line, index) => (
				<li
					key={`line-${index}`}
					className={!line.value ? styles.hidden : ''}
					dangerouslySetInnerHTML={{__html: line.value}}
				>
				</li>
			))
		}
		</ul>
	);
}
