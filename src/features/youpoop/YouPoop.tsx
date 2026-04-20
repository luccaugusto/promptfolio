import styles from './YouPoop.module.css';

const VIDEO_ID = 'xfuIlmywvXI';

export function YouPoop() {
	return (
		<div className={styles.wrapper}>
			<iframe
				title="YouPoop"
				src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&mute=1`}
				allow="autoplay; encrypted-media; fullscreen"
				allowFullScreen
			/>
		</div>
	);
}
