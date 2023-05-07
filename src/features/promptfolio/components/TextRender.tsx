import { useSelector } from 'react-redux';
import styles from '../Promptfolio.module.css';
import { selectUserAtHost } from '../promptfolioSlice';

interface TextRenderProps {
	args: string,
	type: string,
	fullpath: string,
}

export function TextRender(props: TextRenderProps) {
	const {args, type} = props;
	const userAtHost = useSelector(selectUserAtHost);

	return (
		<div>
		{ type === 'command' ? <span className={styles.PS1}>{`${userAtHost} ${props.fullpath} >`} </span> : '' }
		<span dangerouslySetInnerHTML={{__html: args}}></span>
		</div>
	);
}
