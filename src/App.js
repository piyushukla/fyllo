import { useEffect, useState } from "react";
import "./App.css";
import Maps from "./component/Maps";

function App() {
  const [loading, setloading] = useState(false);
  const [mapData, setData] = useState([]);
  useEffect(() => {
    setloading(true);
    fetch(
      "https://api.agrihawk.in/api/devices/getMarkers?access_token=0DnJcoZVNNCjuORU2JpSzN57gdMAtYdeSWqe1Ri24Y87KLhhtYC3ZYMLaDYuJHss"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data => ", data);

        setData(data);
        setloading(false);
      })
      .catch((err) => console.log("err => ", err));
  }, []);
  return (
    <div className="App">
      <h3>Maps</h3>
      {loading ? <h3>Loading...</h3> : <Maps mapData={mapData} />}
      {console.log("mapData => ", mapData)}
    </div>
  );
}

export default App;
