import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(909);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  );
}
