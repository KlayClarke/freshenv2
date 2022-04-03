import axios from "axios";
import { Link } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";
import { useEffect, useState } from "react";

function SalonList() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`http://localhost:9000/salons/`);
      setSalons(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    fetchData();
  }, []);

  if (loading) {
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
      <div className="explore-page-wrapper">
        <div className="explore-page-container">
          <ul className="salon-cards-container">
            {salons.map((salon) => (
              <Link to={`/salons/${salon._id}`}>
                <li key={salon._id}>
                  <div className="salon-card border-radius-4px">
                    <div className="left-content">
                      <p className="bold">{salon.name}</p>
                      <p>{`${salon.street_address} ${salon.city}, ${salon.state} ${salon.zip_code}`}</p>
                    </div>
                    <div className="right-content">
                      {salon.images.length ? (
                        <img
                          src={salon.images[0]}
                          className="border-radius-8px"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SalonList;
