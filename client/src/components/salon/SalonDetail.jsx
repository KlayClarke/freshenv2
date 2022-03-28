import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SalonDetail() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [salon, setSalon] = useState([]);

  const { salonid } = useParams();

  useEffect(async () => {
    const response = await axios(`http://localhost:9000/salons/${salonid}`);
    setSalon(response.data);
    setIsLoaded(true);
  }, []);

  console.log(salon);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1 className="page-header"></h1>
        <h1>{salon.name}</h1>
        <h3>{salon.street_address}</h3>
        <h5>Created by {salon.author.email}</h5>
      </div>
    );
  }
}

export default SalonDetail;
