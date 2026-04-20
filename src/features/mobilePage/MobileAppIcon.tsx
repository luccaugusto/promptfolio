import styles from './MobilePage.module.css';
import { MobileApp } from './apps';

type MobileAppIconProps = {
	app: MobileApp;
	onOpen: (app: MobileApp) => void;
};

export function MobileAppIcon({ app, onOpen }: MobileAppIconProps) {
	const handleClick = () => {
		if (app.kind === 'redirect' && app.url) {
			window.open(app.url, '_blank');
			return;
		}
		onOpen(app);
	};

	return (
		<button className={styles.appIcon} onClick={handleClick}>
			<div className={styles.appIconImage}>
				<img alt={app.label} src={app.icon} />
			</div>
			<span className={styles.appIconLabel}>{app.label}</span>
		</button>
	);
}
