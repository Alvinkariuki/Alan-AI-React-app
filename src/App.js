import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "ebb7fd9b11f8a5c7d53529ef63a71d902e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  // Load button
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === "testCommand") {
          alert("Code was executed");
        }
      },
    });
  }, []);

  return (
    <div>
      <h1>Allan AI news application</h1>
    </div>
  );
};

export default App;
