import styles from './FloatingWindow.module.css';

export function FloatingWindow({children}: any) {
	return (
		<div className={styles.floatingDiv}>
			<div className={styles.header}>
			</div>
			<div className={styles.body}>
			{children}
			</div>
		</div>
	);
}
