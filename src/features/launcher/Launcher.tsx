import styles from './Launcher.module.css';
import { programList } from './ProgramList';

interface LauncherProps {
	openProgram: Function,
}

export function Launcher(props: LauncherProps) {
	return (
		<div className={styles.launcherContainer}>
			{
				programList.map ((p) => {
					return (
						<div
							key={p.program.name}
							className={styles.icon}
							onClick={() => props.openProgram(p)}
						>
							<img alt={p.program.name} src={p.icon}/>
						</div>
					);
				})
			}
		</div>
	);
}
