import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";

function SalonDetail() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [salon, setSalon] = useState([]);

  const { salonid } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`http://localhost:9000/salons/${salonid}`);
      console.log(response.data);
      if (!response.data) {
        setError(true);
      } else {
        setSalon(response.data);
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return (
      <div className="loading-icon-wrapper">
        <div className="loading-icon centered">
          <CirclesWithBar
            type="Circles"
            color="rgb(1, 102, 255)"
            height={80}
            width={80}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="page-header"></h1>
        <h1>{salon.name}</h1>
        <h3>{salon.street_address}</h3>
      </div>
    );
  }
}

export default SalonDetail;
