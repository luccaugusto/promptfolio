import styles from './Resume.module.css';

type SkillRowProps = { name: string; level: 1 | 2 | 3 | 4 | 5 };

function SkillRow({ name, level }: SkillRowProps) {
	return (
		<div className={styles.skillRow}>
			<span className={styles.skillName}>{name}</span>
			<div className={styles.proficiencyCircles} data-level={level}>
				<span className={styles.circle}></span>
				<span className={styles.circle}></span>
				<span className={styles.circle}></span>
				<span className={styles.circle}></span>
				<span className={styles.circle}></span>
			</div>
		</div>
	);
}

export function Resume() {
	return (
		<div className={styles.wrapper}>
			<a
				className={styles.printButton}
				href={`${process.env.PUBLIC_URL}/resume.pdf`}
				download="Lucca Augusto - SWE.pdf"
			>
				Download
			</a>

			<div className={styles.pageContainer}>
				<div className={styles.resumeHeader}>
					<h1>LUCCA AUGUSTO MOREIRA SANTOS</h1>
					<div className={styles.contactInfo}>
						<div className={styles.item}>
							<a href="mailto:lucca@luccaaugusto.xyz">
								<i className={`fa-solid fa-at ${styles.icon}`}></i>lucca@luccaaugusto.xyz
							</a>
						</div>
						<div className={styles.item}>
							<a href="https://github.com/luccaugusto">
								<i className="fa-brands fa-github"></i>github.com/luccaugusto
							</a>
						</div>
						<div className={styles.item}>
							<a href="https://www.linkedin.com/in/luccaugusto/">
								<i className="fa-brands fa-linkedin-in"></i>linkedin.com/in/luccaugusto
							</a>
						</div>
						<div className={styles.item}>
							<a href="https://dev.luccaaugusto.xyz">
								<i className="fa-solid fa-link"></i>https://dev.luccaaugusto.xyz
							</a>
						</div>
						<div className={styles.item}>
							<i className="fa-solid fa-location-dot"></i>Belo Horizonte, MG, Brazil
						</div>
						<div className={styles.item}>
							<i className="fa-solid fa-cake-candles"></i>28/05/1999
						</div>
					</div>
				</div>

				<div className={styles.cvBody}>
					<div className={styles.content}>
						<h1 className={styles.sectionHeader}>CAREER SUMMARY</h1>
						<p className={styles.description}>
							<b>Software Engineer with generalist skills</b> experienced in working with agile
							methodologies, responsible for developing and maintaining solutions that support
							marketing, business and technology teams, able to anticipate scaling problems and
							executive needs, and building solutions that increase autonomy across teams, enabling
							faster changes and growth in any part of the project. Experience with Node.js, React,
							Python, PHP, Java, JavaScript, SQL, HTML, CSS, Tailwind, Django, Wordpress, C, Git,
							DevOps, GCP, AWS, AI and MCP.
						</p>

						<h1 className={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</h1>
						<div className={styles.experienceBlock}>
							<span className={styles.position}>Full Stack Software Engineer</span>
							<span>
								<a href="https://roadwayai.com">RoadwayAI</a> via{' '}
								<a href="https://nacif.xyz">NacifIT</a>
							</span>
							<div className={styles.timeLocation}>
								<span className={styles.date}>
									<i className="fa-regular fa-calendar-days"></i>Feb 2024 - Present
								</span>
								<span className={styles.location}>
									<i className="fa-solid fa-location-dot"></i>San Francisco-CA, US (Remote)
								</span>
							</div>
							<div className={styles.description}>
								<p>
									Roadway AI is a Growth Marketing analytics and automation startup, with the goal
									of{' '}
									<b>
										automating the measurement, modeling and analysis of the metrics that actually
										drive growth for companies at scale
									</b>
									. As a full stack software engineer (allocated by NacifIT) in a lean team of four
									engineers, I work on the{' '}
									<b>development and maintenance of the entire platform</b>, including the Frontend
									(ReactJS) to build dashboards, the Backend (Python FastAPI) responsible for data
									orchestration and dashboard management, and customer data modeling and
									transformation using SQL, dbt and a semantic layer (
									<a href="https://cube.dev">Cube.dev</a>). The project has a{' '}
									<b>strong Generative AI layer</b>, which works on top of modeled data to{' '}
									<b>generate detailed and actionable analytical reports</b>, using{' '}
									<b>MCP (Model Context Protocol) servers</b> to integrate AI agents with internal
									tools and data sources. My main highlight is the <b>Attribution Manager</b>, built
									mostly by me, a tool that allows us to{' '}
									<b>
										manage complex attribution rules for user source based on UTMs and navigation
										history
									</b>
									.
								</p>
							</div>
						</div>
					</div>

					<div className={styles.sidebar}>
						<h1 className={styles.sectionHeader}>LANGUAGES</h1>
						<div>
							<span className={styles.subtitle}>Machine</span>
							<ul className={styles.pillList}>
								<li>C</li>
								<li>Java</li>
								<li>Python</li>
								<li>PHP</li>
								<li>JavaScript</li>
								<li>TypeScript</li>
								<li>Shell</li>
								<li>Ruby</li>
								<li>SQL</li>
							</ul>
						</div>
						<div>
							<span className={styles.subtitle}>Human</span>
							<div className={styles.skillList}>
								<SkillRow name="English (fluent)" level={5} />
								<SkillRow name="Portuguese (native)" level={5} />
								<SkillRow name="Japanese (basic)" level={2} />
							</div>
						</div>

						<h1 className={styles.sectionHeader}>TECHNOLOGY SKILLS</h1>
						<div className={styles.skillList}>
							<SkillRow name="SQL" level={5} />
							<SkillRow name="Shell script" level={5} />
							<SkillRow name="Linux" level={5} />
							<SkillRow name="HTML" level={5} />
							<SkillRow name="CSS/Tailwind" level={5} />
							<SkillRow name="Git" level={5} />
							<SkillRow name="FastAPI" level={5} />
							<SkillRow name="Docker" level={5} />
							<SkillRow name="ReactJS" level={4} />
							<SkillRow name="Django" level={4} />
							<SkillRow name="NodeJS" level={4} />
							<SkillRow name="Generative AI" level={4} />
							<SkillRow name="MCP" level={4} />
							<SkillRow name="GCP" level={3} />
							<SkillRow name="AWS" level={3} />
						</div>

						<h1 className={styles.sectionHeader}>SOFT SKILLS</h1>
						<ul className={styles.pillList}>
							<li>Communication</li>
							<li>Tenacity</li>
							<li>Problem solving</li>
							<li>Teamwork</li>
							<li>Creativity</li>
							<li>Resilience</li>
						</ul>

						<h1 className={styles.sectionHeader}>EDUCATION</h1>
						<div className={styles.educationBlock}>
							<span className={styles.position}>Bachelor's Degree in Computer Science</span>
							<span className={styles.location}>
								<i className="fa-solid fa-location-dot"></i>PUC Minas
							</span>
							<span className={styles.date}>
								<i className="fa-regular fa-calendar-days"></i>Jan 2017 - Jun 2021
							</span>
						</div>
						<div className={styles.educationBlock} style={{ marginBottom: 0 }}>
							<span className={styles.position}>Technical Degree in Business Administration</span>
							<span className={styles.location}>
								<i className="fa-solid fa-location-dot"></i>SEBRAE Contagem
							</span>
							<span className={styles.date}>
								<i className="fa-regular fa-calendar-days"></i>Jan 2014 - Dec 2016
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.pageContainer}>
				<div className={styles.cvBody}>
					<div className={styles.content}>
						<h1 className={styles.sectionHeader}>PROFESSIONAL EXPERIENCE</h1>

						<div className={styles.experienceBlock}>
							<span className={styles.position}>Full Stack Software Engineer</span>
							<span>CityShoppe</span>
							<div className={styles.timeLocation}>
								<span className={styles.date}>
									<i className="fa-regular fa-calendar-days"></i>June 2021 - May 2023
								</span>
								<span className={styles.location}>
									<i className="fa-solid fa-location-dot"></i>Austin-TX, US (Remote)
								</span>
							</div>
							<div className={styles.description}>
								<p>
									CityShoppe is a digital marketplace startup for small businesses in the US and
									Europe.
									<br />
									As the second person in the dev team I was responsible for understanding
									everything about the business and tech stack, as well as{' '}
									<b>participating in all the software decisions and solutions finding</b>. I also{' '}
									<b>helped hands on building all the company's products</b>, developing key
									features and setting up infrastructure to make it reliable and available. These
									efforts resulted in <b>raising over 200 thousand dollars in investment</b> for
									the company. Most of the project was built in Wordpress before we moved to a
									NestJS application.
									<br />
									Additionally,
								</p>
								<ul>
									<li>
										<b>Worked with people from 4 different countries</b> in one project, further
										developing my communication skills.
									</li>
									<li>
										Developed products in NodeJS, NestJS and PHP, using AWS services (lambda, API
										gateway, ECS, EC2, etc) for infrastructure.
									</li>
								</ul>
							</div>
						</div>

						<div className={styles.experienceBlock}>
							<span className={styles.position}>Full Stack Software Engineer</span>
							<span>
								<a href="https://educandoseubolso.blog.br">
									Educando Seu Bolso (https://educandoseubolso.blog.br)
								</a>
							</span>
							<div className={styles.timeLocation}>
								<span className={styles.date}>
									<i className="fa-regular fa-calendar-days"></i>Aug 2017 – Jan 2019 / Aug 2019 -
									Jun 2020
								</span>
								<span className={styles.location}>
									<i className="fa-solid fa-location-dot"></i>BH-MG, Brazil
								</span>
							</div>
							<div className={styles.description}>
								<p>
									Financial Edutech that connects companies and people through courses, podcasts
									and tools. Business model through affiliate programs and digital products.
									<br />
									I joined the team as a intern and was responsible for{' '}
									<b>
										understanding the business from a tech perspective and helping build the
										business tools
									</b>
									. I quickly demonstrated skills of <b>communication</b> and{' '}
									<b>product development</b>, and was later hired. I{' '}
									<b>built a platform in Django</b> to manage all our data and{' '}
									<b>
										improve our tools, increasing efficiency for the marketing, commercial and
										technology teams
									</b>
									, as well as allowing for the business to grow faster.{' '}
									<b>Developed strong communication skills</b> as this job required constant
									communication with the commercial team to translate the idea into a user
									friendly tool.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
