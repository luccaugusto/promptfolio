import styles from './MobilePage.module.css';
import { MobileApp, apps } from './apps';
import { MobileAppIcon } from './MobileAppIcon';

type MobileHomeProps = {
	onOpen: (app: MobileApp) => void;
};

export function MobileHome({ onOpen }: MobileHomeProps) {
	return (
		<div className={styles.homeGrid}>
			{apps.map((app) => (
				<MobileAppIcon key={app.name} app={app} onOpen={onOpen} />
			))}
		</div>
	);
}
