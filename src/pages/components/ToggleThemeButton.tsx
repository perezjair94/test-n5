import { useState } from "react";
import { Icon } from "./Icon";

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  function onChangeTheme(value: "light" | "dark") {
    const html = document.querySelector("html");
    if (html) html.setAttribute("data-theme", theme);
    setTheme(value);
  }
  return (
    <button
      className="toggle-button"
      onClick={() => onChangeTheme(theme === "light" ? "dark" : "light")}
    >
      <Icon name={theme === "light" ? "Sun" : "Moon"} />
    </button>
  );
}
