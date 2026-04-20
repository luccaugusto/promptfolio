import styles from '../MobilePage.module.css';

const VIDEO_ID = 'xfuIlmywvXI';

export function MobileYouPoop() {
	return (
		<div className={styles.videoWrapper}>
			<iframe
				title="YouPoop"
				src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&mute=1`}
				allow="autoplay; encrypted-media; fullscreen"
				allowFullScreen
			/>
		</div>
	);
}
