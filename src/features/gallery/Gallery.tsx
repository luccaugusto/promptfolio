import styles from './Gallery.module.css';

export function Gallery() {
	return (
		<div className={styles.wrapper}>
			<iframe
				title="Gallery"
				src="https://luccaaugusto.xyz"
				allow="fullscreen"
				allowFullScreen
			/>
		</div>
	);
}
