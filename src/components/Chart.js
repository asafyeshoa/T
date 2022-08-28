import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

export default function Chart(props) {
  const {data} = props
const matches = useMediaQuery("(min-width:600px)");
const [svgW, setSvgW] = useState(600)
const [svgH] = useState(350)
useEffect(() => {
    if(!matches){
        setSvgW(400)
    }
}, [matches])

    console.log(data)
  if(!data) {
    return (<h3>Loading...</h3>)
  }

  const x0 = 50;
  const xAxisLength = svgW- x0 * 2;

  const y0 = 50;
  const yAxisLength = svgH - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = data.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY),
    -Infinity
  );
  const dataYMin = data.reduce(
    (currMin, [_, dataY]) => Math.min(currMin - 1, dataY),
    Infinity
  );
  const dataYRange = dataYMax - dataYMin;

  const numYTicks = 15;

  const barPlotWidth = xAxisLength / data.length;

  return (
    <svg width={svgW} height={svgH} style={{border: '1px black solid', marginTop: '10px'}}>

      {Array.from({ length: numYTicks }).map((_, index) => {
        const y = y0 + index * (yAxisLength / numYTicks);

        const yValue = Math.round(dataYMax - index * (dataYRange / numYTicks));

        return (
          <g key={index}>
            <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
            <text x={x0 - 5} y={y + 5} textAnchor="end">
              {yValue}
            </text>
          </g>
        );
      })}
      <text x={x0} y={y0 - 8} textAnchor="middle" style={{marginBottom: '5px'}}>
      Popularity
      </text>

      {data.map(([char, dataY], index) => {
        const x = x0 + index * barPlotWidth;

        const yRatio = (dataY - dataYMin) / dataYRange;

        const y = y0 + (1 - yRatio) * yAxisLength;
        const height = yRatio * yAxisLength;

        const sidePadding = 25;

        return (
          <g key={index}>
            <rect
              x={x + sidePadding / 2}
              y={y}
              width={barPlotWidth - sidePadding}
              height={height}
            />
            <text x={x + barPlotWidth / 2} y={xAxisY + 16} textAnchor="middle">
              {char}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
