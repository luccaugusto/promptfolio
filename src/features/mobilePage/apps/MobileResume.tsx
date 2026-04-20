import styles from '../MobilePage.module.css';

export function MobileResume() {
	return (
		<div className={styles.pdfWrapper}>
			<embed
				title="resume"
				type="application/pdf"
				src={`${process.env.PUBLIC_URL}/resume.pdf`}
				width="100%"
				height="100%"
			/>
		</div>
	);
}
