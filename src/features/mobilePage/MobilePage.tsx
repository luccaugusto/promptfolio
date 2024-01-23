import { skillTable } from '../promptfolio/components/Skillset';
import styles from './MobilePage.module.css';

export function MobilePage() {
	return (
		<div className={`${styles.mobileColors} ${styles.mobileWindow}`}>
			<p className={styles.footnote}>This site is much more fun on the desktop version</p>
			<span>Hi, My name is Lucca and i'm a software engineer currently improving my skills in Ruby</span>

			<div className={styles.row}>
				<div className={styles.social}>
					<img alt="GitHub" className={styles.icon} src={`${process.env.PUBLIC_URL}/github-icon.png`}/>
				</div>
				<div className={styles.social}>
					<img alt="Linkedin" className={styles.icon} src={`${process.env.PUBLIC_URL}/linkedin-icon.png`}/>
				</div>
			</div>
		</div>
	)
}
