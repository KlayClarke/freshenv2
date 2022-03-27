import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SalonList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [salons, setSalons] = useState([]);

  useEffect(async () => {
    const response = await axios(`http://localhost:9000/salons/`);
    setSalons(response.data);
    setIsLoaded(true);
  }, []);

  console.log(salons);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <ul>
          {salons.map((salon) => (
            <li key={salon._id}>
              <Link to={`/salons/${salon._id}`}>{salon.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SalonList;
