import styles from "../Promptfolio.module.css";

export const skillTable: {
  [index: string]: { [index: string]: string | boolean };
} = {
  python: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "5+ years across Django (Educando Seu Bolso), FastAPI (RoadwayAI) and personal projects",
    interested: true,
  },
  typescript: {
    experience: "Work Experience",
    level: "Advanced",
    comment: "Primary frontend language at RoadwayAI and CityShoppe",
    interested: true,
  },
  javascript: {
    experience: "Work Experience",
    level: "Advanced",
    comment: "7+ years across React, Node.js, NestJS and vanilla JS",
    interested: true,
  },
  php: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "4+ years building WordPress plugins at CityShoppe and tools at Educando Seu Bolso",
    interested: false,
  },
  ruby: {
    experience: "Personal projects and Work",
    level: "Intermediate",
    comment:
      "Built <a href='https://www.idealidx.com/' target='blank'>Ideal Exchange</a>'s backend in ROR. Many personal projects in ruby too",
    interested: true,
  },
  C: {
    experience: "Personal and college experience",
    level: "Intermediate",
    comment:
      "Used in personal projects (rice, tarts) and exercises. No professional experience yet",
    interested: true,
  },
  rust: {
    experience: "Personal projects",
    level: "Beginner",
    comment: "Brief use on a small personal project. Would love to dive deeper",
    interested: true,
  },
  java: {
    experience: "College experience",
    level: "Intermediate",
    comment: "Most college tasks were in Java",
    interested: false,
  },
  FastAPI: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Backend framework powering the RoadwayAI platform: data orchestration, dashboards, AI integrations",
    interested: true,
  },
  Django: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Built and led the Django backend at Educando Seu Bolso. Built many personal projects in Django",
    interested: true,
  },
  "Node.js / NestJS": {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Migrated CityShoppe from WordPress to a NestJS architecture. Also built a Shopify Koa app for vendor onboarding",
    interested: true,
  },
  ReactJS: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Building dashboards and embedded widgets across RoadwayAI, CityShoppe and Educando",
    interested: false,
  },
  "Generative AI / LLMs": {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Built RoadwayAI's GenAI layer that turns modeled marketing data into actionable analytical reports",
    interested: true,
  },
  "MCP (Model Context Protocol)": {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Built MCP servers at RoadwayAI to integrate AI agents with internal tools and data sources",
    interested: true,
  },
  "SQL / Relational DBs": {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "PostgreSQL, MySQL, BigQuery, Snowflake. Comfortable with dbt and semantic layers",
    interested: true,
  },
  "REST APIs": {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Designed and consumed REST APIs across every project I've worked on",
    interested: true,
  },
  Linux: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "My daily system for 8+ years. I also Self-host my own Proxmox server with many different services",
    interested: true,
  },
  "Shell scripting": {
    experience: "Work Experience",
    level: "Advanced",
    comment: "Heavy use for automation, deploys, dotfiles and tooling",
    interested: true,
  },
  Docker: {
    experience: "Work Experience",
    level: "Advanced",
    comment:
      "Compose for development and production across all current projects",
    interested: true,
  },
  "HTML / CSS / Tailwind": {
    experience: "Work Experience",
    level: "Advanced",
    comment: "7+ years across every frontend project",
    interested: true,
  },
  Git: {
    experience: "Work Experience",
    level: "Advanced",
    comment: "Always worked with Git",
  },
  GCP: {
    experience: "Work Experience",
    level: "Intermediate",
    comment:
      "BigQuery, Cloud Run and supporting services for RoadwayAI's data platform",
    interested: true,
  },
  AWS: {
    experience: "Work Experience",
    level: "Intermediate",
    comment: "Lambda, ECS, EC2, API Gateway, S3 — mainly from CityShoppe",
    interested: true,
  },
  "Agile methodologies": {
    experience: "Work Experience",
    level: "",
    comment: "Always worked with Agile methodologies",
  },
};

export function Skillset() {
  return (
    <div className={styles.skillSetWrapper}>
      {Object.keys(skillTable).map((skillName) => (
        <div className={styles.skillWrapper} key={skillName}>
          <div style={{ width: "70%" }}>
            <span className={styles.skillName}>{skillName}</span>
            <br />
            <div className={`${styles.skillComment} ${styles.indented}`}>
              {skillTable[skillName].comment}
            </div>
          </div>
          <div className={styles.skillBubbleWrapper}>
            {skillTable[skillName].level ? (
              <div className={styles.skillBubble}>
                {skillTable[skillName].level}
              </div>
            ) : (
              ""
            )}
            {skillTable[skillName].interested ? (
              <div className={styles.skillBubble}>Interested</div>
            ) : (
              ""
            )}
            {skillTable[skillName].experience ? (
              <div className={styles.skillBubble}>
                {skillTable[skillName].experience}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
