import * as React from "react";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div>
      <p className={styles.paragraph}>
        Hello <span>world</span>
      </p>
    </div>
  );
};

export default App;
