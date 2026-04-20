import styles from './Resume.module.css';

export function Resume() {
	return (
		<div className={styles.wrapper}>
			<a
				className={styles.printButton}
				href={`${process.env.PUBLIC_URL}/resume.pdf`}
				download="Lucca Augusto - SWE.pdf"
			>
				Download
			</a>
			<iframe
				title="resume"
				src={`${process.env.PUBLIC_URL}/resume.html`}
			/>
		</div>
	);
}
