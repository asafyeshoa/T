import "./App.css";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [apiData, setApiData] = useState(null);
  const [chartData, setChartData] = useState(null);

  function compare(a, b) {
    if (a.data.episode.length > b.data.episode.length) {
      return 1;
    }

    if (a.data.episode.length < b.data.episode.length) {
      return -1;
    }
  }

  useEffect(() => {
    async function getData() {
      const stateValue = [];
      const res = await axios.get("https://rickandmortyapi.com/api/location/1");
      const urls = res.data.residents;

      const data = await Promise.all(urls.map((u) => axios.get(u)));
      data.sort(compare);
      data.forEach((char) => {
        if (char.data.origin.name === "Earth (C-137)") {
          stateValue.push(char.data);
        }
      });
      setApiData(stateValue);
    }

    if (!apiData) {
      getData();
    }
  }, [apiData]);

  useEffect(() => {
    const names = [
      "Rick Sanchez",
      "Summer Smith",
      "Morty Smith",
      "Beth Smith",
      "Jerry Smith",
    ];
    const chartDataValue = [];

    async function getAllChars() {
      const data = await Promise.all(
        names.map((n) =>
          axios.get(`https://rickandmortyapi.com/api/character/?name=${n}`)
        )
      );
      data.forEach((char) => {
        char.data.results.forEach((option) => {
          if (option.origin.name === "Earth (C-137)") {
            chartDataValue.push([option.name, option.episode.length]);
          } else if (option.id === 2) {
            chartDataValue.push([option.name, option.episode.length]);
          }
        });
      });
      setChartData(chartDataValue);
    }
    if (!chartData) {
      getAllChars();
    }
  }, [chartData]);

  return (
    <div className="App">
      <Home apiData={apiData} chartData={chartData} />
    </div>
  );
}
