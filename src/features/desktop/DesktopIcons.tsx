import styles from "./DesktopIcons.module.css";
import { Program } from "./programs";

type DesktopIconsProps = {
  programs: Program[];
  onOpen: (program: Program) => void;
};

export function DesktopIcons({ programs, onOpen }: DesktopIconsProps) {
  return (
    <div className={styles.grid}>
      {programs.map((program) => (
        <div
          key={program.name}
          className={styles.icon}
          onClick={() => onOpen(program)}
        >
          <div className={styles.iconImage}>
            <img alt={program.label} src={program.icon} />
          </div>
          <span className={styles.label}>{program.label}</span>
        </div>
      ))}
    </div>
  );
}
