import { useState } from "react";
import { ThemeSelect } from "@/components/themeSelect";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>LoL Team Balancer v2</h1>
      <ThemeSelect />

      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
