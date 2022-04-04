import axios from "axios";
import { Link } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";
import { useEffect, useState } from "react";

function SalonList({ user }) {
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
            {user ? (
              <div className="salon-create-button-container">
                <Link
                  to={"/salons/create"}
                  className="button button-l salon-create-button border-radius-4px"
                >
                  Add Salon
                </Link>
              </div>
            ) : (
              ""
            )}
            <div className="salon-card-key">
              <div className="salon-name-container">
                <p className="bold">Name</p>
              </div>
              <div className="salon-type-container">
                <p className="bold">Type</p>
              </div>
              <div className="salon-average-price-container">
                <p className="bold">Average Price</p>
              </div>
              <div className="salon-address-container">
                <p className="bold">Address</p>
              </div>
            </div>
            {salons.map((salon) => (
              <div key={salon._id}>
                <Link to={`/salons/${salon._id}`}>
                  <li className="salon-card">
                    <div className="salon-name-container">
                      <p>{salon.name}</p>
                    </div>
                    <div className="salon-type-container">
                      <p>{salon.type}</p>
                    </div>
                    <div className="salon-average-price-container">
                      <p>${salon.average_price}</p>
                    </div>
                    <div className="salon-address-container">
                      <p>{`${salon.street_address} ${salon.city}, ${salon.state} ${salon.zip_code}`}</p>
                    </div>
                  </li>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SalonList;
