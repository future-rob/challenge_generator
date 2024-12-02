import React, { useState, useEffect } from "react";
import "./App.css";
import { Scene } from "./components/Scene";

// Define the Topic type
interface Topic {
  id: string;
  color: string;
  topic: string;
}

function App() {
  // Load initial data from localStorage or fall back to defaults
  const defaultData: Topic[] = [
    { id: "1", color: "#ff4500", topic: "Quantum Chaos & Ideas" },
    { id: "2", color: "#00ff7f", topic: "Tech Myths Debunked" },
    { id: "3", color: "#1e90ff", topic: "Open Source Experiments" },
    { id: "4", color: "#ffd700", topic: "Sim, Surf, Safari!" },
    { id: "5", color: "#da70d6", topic: "Art & Algorithm" },
    { id: "6", color: "#7fffd4", topic: "Memes & Memeconomics" },
    { id: "7", color: "#ffffff", topic: "Mad Design Lab" },
    { id: "8", color: "#ff6347", topic: "Chaos Reflections" },
  ];

  const [data, setData] = useState<Topic[]>(() => {
    const savedData = localStorage.getItem("topics");
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(data));
  }, [data]);

  // Add a new topic
  const addTopic = () => {
    const newTopic: Topic = {
      id: Date.now().toString(),
      color: "#000000", // Default color
      topic: "New Topic",
    };
    setData((prevData) => [...prevData, newTopic]);
  };

  // Update a topic
  const updateTopic = (id: string, updatedTopic: Topic) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? updatedTopic : item))
    );
  };

  // Remove a topic
  const removeTopic = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <Scene data={data} />
      <div className="topic-manager">
        <h2>Manage Topics</h2>
        <button onClick={addTopic}>Add Topic</button>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <input
                type="text"
                value={item.topic}
                onChange={(e) =>
                  updateTopic(item.id, { ...item, topic: e.target.value })
                }
              />
              <input
                type="color"
                value={item.color}
                onChange={(e) =>
                  updateTopic(item.id, { ...item, color: e.target.value })
                }
              />
              <button onClick={() => removeTopic(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
