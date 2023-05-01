import styles from '../Promptfolio.module.css';

export function Github() {
	return (
		<div>
			<a rel={"noreferrer"} target={"_blank"} href="https://github.com/luccaugusto">
				<img className={styles.githubStats} alt="Github Stats for Luccaugusto" height="180em" src="https://github-readme-stats-steel-nine.vercel.app/api?username=luccaugusto&show_icons=true&theme=dracula&include_all_commits=true&count_private=true"/>
				<img className={styles.githubStats} alt="Github Compact Stats for Luccaugusto"height="180em" src="https://github-readme-stats-steel-nine.vercel.app/api/top-langs/?username=luccaugusto&layout=compact&langs_count=7&theme=dracula"/>
			</a>
		</div>
	);
}
