import styles from '../Promptfolio.module.css';
import { programResult } from './Parser';
import { Github } from './Github';
import { Skillset } from './Skillset';
import { Cat } from './Cat';
import { TextRender } from './TextRender';

interface OutputProps {
	outputHistory: programResult[],
	commandOutput: string[],
}

const availableComponents: { [key: string]: any } = {
	Github: Github,
	Skillset: Skillset,
	Cat: Cat,
	Text: TextRender,
}

export function Output(props: OutputProps) {
	const generateFullOutput = () => {
		const fullOutput = [];
		for (let i=0; i < props.commandOutput.length; i++) {
			let commandValue = props.commandOutput[i];
			if (props.commandOutput[i] === 'welcome') {
				commandValue = '';
			}
			fullOutput.push({type: 'command', args: commandValue, component: availableComponents.Text});
			fullOutput.push({type: 'output', args: props.outputHistory[i].args, component: props.outputHistory[i].component});
		}
		return fullOutput.slice(0).reverse();
	}

	return (
		<ul className={styles.commandHistory}>
		{
			generateFullOutput().map((line, index) => {
				const Component = availableComponents[line.component];
				return (
				<li
					key={`line-${index}`}
					className={line.type === 'command' && line.args ? styles.hidden : ''}
				>
					<Component args={line.args} type={line.type} />
				</li>
			)})
		}
		</ul>
	);
}
