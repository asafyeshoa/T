import PaginationTable from "../components/PaginationTable";
import Chart from "../components/Chart";
export default function Home(props) {
  const { apiData, chartData } = props;
  return (
    <div className="home-page">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
        alt="title"
        className="title-image"
      />
      <PaginationTable rows={apiData || []} />
      <Chart data={chartData} />
    </div>
  );
}
