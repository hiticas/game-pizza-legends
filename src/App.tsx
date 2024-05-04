import { useEffect } from "react";
import Overworld from "./components/Overworld";

function App() {
  useEffect(() => {
    const overworld = new Overworld({
      element: document.querySelector(".game-container"),
    });
    overworld.init();
  }, []);

  return (
    <div className="game-container">
      <canvas className="game-canvas" width="352" height="198"></canvas>
    </div>
  );
}

export default App;
