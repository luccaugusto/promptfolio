import { useSelector } from 'react-redux';
import styles from '../Promptfolio.module.css';
import { selectPS1 } from '../promptfolioSlice';

interface TextRenderProps {
	args: string,
	type?: string,
}

export function TextRender(props: TextRenderProps) {
	const {args, type} = props;
	const PS1 = useSelector(selectPS1);

	return (
		<div>
		{ type === 'command' ? <span className={styles.PS1}>{PS1} </span> : '' }
		<span dangerouslySetInnerHTML={{__html: args}}></span>
		</div>
	);
}
