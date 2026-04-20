import styles from './MobilePage.module.css';
import { MobileApp } from './apps';

type MobileAppViewProps = {
	app: MobileApp;
	onClose: () => void;
};

export function MobileAppView({ app, onClose }: MobileAppViewProps) {
	if (!app.Component) return null;
	const Component = app.Component;
	return (
		<div className={styles.appView}>
			<button
				className={styles.appBackButton}
				onClick={onClose}
				aria-label="Back"
			>
				&lt;
			</button>
			<Component />
		</div>
	);
}
