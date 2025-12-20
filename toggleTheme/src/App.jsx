import { useState } from "react";
import "./App.css";

function App() {
  const [isDark, setDark] = useState(false);

  return (
    <div className={`container ${isDark ? "dark" : "light"}`}>
      <h1>Here is a theme changer</h1>

      <button
        className="button"
        onClick={() => setDark(!isDark)}
      >
        Switch to {isDark ? "Light" : "Dark"} Theme
      </button>
    </div>
  );
}

export default App;
