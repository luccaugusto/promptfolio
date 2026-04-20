import { useState } from 'react';
import styles from './MobilePage.module.css';
import { MobileApp } from './apps';
import { MobileHome } from './MobileHome';
import { MobileAppView } from './MobileAppView';
import { MobileHomeBar } from './MobileHomeBar';

export function MobilePage() {
	const [openApp, setOpenApp] = useState<MobileApp | null>(null);

	return (
		<div className={styles.mobilePage}>
			<MobileHome onOpen={setOpenApp} />
			{openApp && (
				<MobileAppView app={openApp} onClose={() => setOpenApp(null)} />
			)}
			<MobileHomeBar
				onHome={() => setOpenApp(null)}
				interactive={openApp !== null}
			/>
		</div>
	);
}
