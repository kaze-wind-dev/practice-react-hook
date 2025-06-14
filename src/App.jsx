import React, { useState, useEffect } from "react";

export default function App() {
  //カウンター
  const [counter, setCounter] = useState(0);
  const countUp = (prev) => setCounter(prev + 1);
  const countDown = (prev) => setCounter(prev - 1);

  //タイマー
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerHandler = () => {
    setTimerRunning((prev) => !prev);
  };
  const timerReset = () => {
    setTimer(0);
  };
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  //API　articles
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/posts?userId=1"; //100件は多いのでuserId=1に限定
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
        return [];
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Practice React</h1>
      <hr />
      <section>
        <h2>counter(useState)</h2>
        <input type="button" onClick={() => countUp(counter)} value="+" />
        <input type="button" onClick={() => countDown(counter)} value="-" />
        {counter}
      </section>

      <hr />

      <section>
        <h2>timer(useState + useEffect)</h2>
        {timer}
        <input
          type="button"
          onClick={timerHandler}
          value={timerRunning ? "Stop" : "Start"}
        />
        <input type="button" onClick={timerReset} value="Reset" />
      </section>

      <hr />

      <section>
        <h2>Get API Articles（Fetch×useEffect）</h2>
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.id}>
                <p>{article.title}</p>
                <p>{article.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <hr />

    </div>
  );
}
