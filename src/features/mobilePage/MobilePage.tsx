import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';

import styles from './MobilePage.module.css';
import { selectPS1 } from './mobilePageSlice';

export function MobilePage() {
	const PS1 = useSelector(selectPS1);

	return (
		<div className={`${styles.mobileColors} ${styles.mobileWindow}`}>
			<p className={styles.footnote}>This site is much more fun on the desktop version</p>
			<span className={styles.PS1}>{PS1}</span>
		</div>
	)
}
