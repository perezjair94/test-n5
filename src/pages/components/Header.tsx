import ToggleThemeButton from "./ToggleThemeButton";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Test N5</h2>
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
}
