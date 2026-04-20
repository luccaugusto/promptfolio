import styles from './MobilePage.module.css';

type MobileHomeBarProps = {
	onHome: () => void;
	interactive: boolean;
};

export function MobileHomeBar({ onHome, interactive }: MobileHomeBarProps) {
	return (
		<div className={styles.homeBar}>
			<button
				className={styles.homeBarButton}
				onClick={interactive ? onHome : undefined}
				aria-label={interactive ? 'Close app' : 'Home'}
				disabled={!interactive}
			>
				<img
					src={`${process.env.PUBLIC_URL}/home.png`}
					alt=""
					className={styles.homeBarIcon}
				/>
			</button>
		</div>
	);
}
