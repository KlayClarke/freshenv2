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
      const response = await axios(
        process.env.REACT_APP_API_SALON_ENDPOINT + `/${salonid}`
      );
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
      <div className="salon-detail-wrapper">
        <div className="salon-detail-container">
          <div className="top-section border-radius-10px">
            <div className="left">
              {salon.image && (
                <img
                  src={salon.image}
                  alt="salon"
                  className="border-radius-8px"
                />
              )}
              {!salon.image && (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                  alt="image not found"
                  className="border-radius-8px"
                />
              )}
            </div>
            <div className="right">
              <h1>{salon.name}</h1>
              <h3>
                {salon.street_address} {salon.city}, {salon.state}{" "}
                {salon.zip_code}
              </h3>
            </div>
          </div>
          <div className="bottom-section border-radius-10px"></div>
        </div>
      </div>
    );
  }
}

export default SalonDetail;
