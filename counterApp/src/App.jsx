import { useState } from "react";
import "./App.css";

function App() {
  // state → data store
  const [count, setCount] = useState(0);

  // increment
  const increase = () => {
    setCount(count + 1);
  };

  // decrement
  const decrease = () => {
    setCount(count > 0 ? count - 1 : 0);
  };
  
  // reset
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Counter App</h1>
        <p className="count">{count}</p>

        <div className="buttons">
          <button onClick={decrease}>-</button>
          <button onClick={reset}>Reset</button>
          <button onClick={increase}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
