import styles from '../Promptfolio.module.css';
import { useTerminal } from '../TerminalContext';

interface TextRenderProps {
	args: string,
	type: string,
	fullpath: string,
}

export function TextRender(props: TextRenderProps) {
	const {args, type} = props;
	const { userAtHost } = useTerminal();

	return (
		<div>
		{ type === 'command' ? <span className={styles.PS1}>{`${userAtHost} ${props.fullpath} >`} </span> : '' }
		<span dangerouslySetInnerHTML={{__html: args}}></span>
		</div>
	);
}
