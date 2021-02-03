import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

// Component imports
import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "ebb7fd9b11f8a5c7d53529ef63a71d902e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  // Load button
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
        }
      },
    });
  }, []);

  return (
    <div>
      <h1>Allan AI news application</h1>
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
