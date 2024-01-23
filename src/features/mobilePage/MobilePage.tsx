import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';

import styles from './MobilePage.module.css';

export function MobilePage() {

	return (
		<div className={`${styles.mobileColors} ${styles.mobileWindow}`}>
			<p className={styles.footnote}>This site is much more fun on the desktop version</p>
		</div>
	)
}
