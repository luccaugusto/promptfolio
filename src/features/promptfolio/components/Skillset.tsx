import styles from '../Promptfolio.module.css';

const skillTable: { [key: string]: any } = {
	javascript: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "",
		interested: true,
	},
	typescript: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "",
		interested: true,
	},
	python: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "3 years experience with Django framework",
		interested: true,
	},
	php: {
		experience: "Work Experience",
		level: "Advanced",
		comment: "Worked a lot with wordpress websites",
		interested: false,
	},
	C: {
		experience: "Personal and College experience",
		level: "Intermediate",
		comment: "I really enjoy working with C in programming exercises and challenges",
		interested: true,
	},
	rust: {
		experience: "",
		level: "Begginer",
		comment: "I would love to dive deep in Rust but i've only had the time to use it briefly on a small personal project. I do plan on working more with Rust",
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
		comment: "",
		interested: true,
   	},
   	"Rest API": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "",
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
		comment: "Although i have 1.5 years of experience with React, and 4 years of frontend development overall, it is not really my thing. I can do it, but i take a little bit more time and i would rather work on the backend",
		interested: false,
   	},
	"AWS (EC2, Lambda, S3, ECS)": {
		experience: "Work Experience",
		level: "Begginer",
		comment: "",
		interested: true,
	},
	"Git": {
		experience: "Work Experience",
		level: "Advanced",
		comment: "",
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
					<div className={styles.skillWrapper}>
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
