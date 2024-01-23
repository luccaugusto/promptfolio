import styles from '../Promptfolio.module.css';

export const skillTable: {[index: string]: {[index: string]: string | boolean}} = {
	javascript: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "4 years of experience",
		interested: true,
	},
	typescript: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "1.5 years of experience",
		interested: true,
	},
	ruby: {
		experience: "Personal projects",
		level: "Experienced",
		comment: "Mostly working with Ruby on Rails",
		interested: true,
	},
	python: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "2 years experience with Django framework (version 3.5)",
		interested: true,
	},
	php: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "4+ years of experience. Every project i worked on relied on Wordpress for a piece of the puzzle, some projects more, some projects less.",
		interested: false,
	},
	C: {
		experience: "Personal and College experience",
		level: "Intermediate",
		comment: "I really enjoy working with C in programming exercises and challenges, currently i have no professional experience with C, but i use it a lot in my personal projects",
		interested: true,
	},
	rust: {
		experience: "",
		level: "Beginner",
		comment: "I would love to dive deep in Rust but I've only had the time to use it briefly on a small personal project. I do plan on working more with Rust",
		interested: true,
	},
	java: {
		experience: "College tasks experience",
		level: "Intermediate",
		comment: "Most tasks in College had to be done in Java",
		interested: false,
	},
	"Node.js": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "1.5 years of experience",
		interested: true,
	},
	"Rest API": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "always worked with REST API's",
		interested: true,
	},
	"Relational DB": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "Mostly worked with MySQL and PostgreSQL",
		interested: true,
	},
	"ReactJS": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "2 years of experience with React, and 4 years of frontend development overall, it is not really my thing. I'm backend heavy in a 65% 35% proportion",
		interested: false,
	},
	"AWS (EC2, Lambda, S3, ECS)": {
		experience: "Work Experience",
		level: "Beginner",
		comment: "",
		interested: true,
	},
	"Git": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "Always worked with Git",
	},
	"Docker": {
		experience: "Work Experience",
		level: "Intermediate",
		comment: "",
	},
	"Agile methodologies": {
		experience: "Work Experience",
		level: "",
		comment: "Always worked with Agile methodologies",
	}
}


export function Skillset() {
	return (
		<div className={styles.skillSetWrapper}>
			{
				Object.keys(skillTable).map((skillName) => (
					<div className={styles.skillWrapper} key={skillName}>
						<div style={{width: '70%'}}>
							<span className={styles.skillName}>{skillName}</span>
							<br/>
							<div className={`${styles.skillComment} ${styles.indented}`}>{skillTable[skillName].comment}</div>
						</div>
						<div className={styles.skillBubbleWrapper}>
							{skillTable[skillName].level ? (<div className={styles.skillBubble}>{skillTable[skillName].level}</div>) : '' }
							{skillTable[skillName].interested ? (<div className={styles.skillBubble}>Interested</div> ) : ""}
							{skillTable[skillName].experience ? (<div className={styles.skillBubble}>{skillTable[skillName].experience}</div>) : "" }
						</div>
					</div>
				))
			}
		</div>
	);
}
