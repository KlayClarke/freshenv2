import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SalonList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`http://localhost:9000/salons/`);
      setSalons(response.data);
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className="page-header">Salons</h1>
        <ul>
          {salons.map((salon) => (
            <li key={salon._id}>
              <div className="salon-card">
                <Link to={`/salons/${salon._id}`}>{salon.name}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SalonList;
