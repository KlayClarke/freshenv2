import axios from "axios";
import { useState } from "react";

function SalonCreateForm({ user }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [averagePrice, setAveragePrice] = useState();
  const [image, setImage] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  function createSalon(e) {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_SALON_ENDPOINT,
        {
          name,
          type,
          average_price: averagePrice,
          image,
          street_address: streetAddress,
          city,
          state,
          zip_code: zipCode,
          author: user.id,
        },
        {
          headers: {
            Authorization: `Basic ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("salon successfully created", response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  return (
    <div className="salon-create-content-wrapper">
      <div className="salon-create-content-container">
        <form onSubmit={createSalon}>
          <div className="form-section">
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="type">Type</label>
            <br />
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled></option>
              <option value="hybrid">Hybrid</option>
              <option value="barbershop">Barbershop</option>
              <option value="salon">Salon</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="average_price">Average Price ($)</label>
            <br />
            <input
              type="number"
              id="average_price"
              min={0}
              value={averagePrice}
              onChange={(e) => setAveragePrice(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="image">Image URL</label>
            <br />
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="street_address">Street Address</label>
            <br />
            <input
              type="text"
              id="street_address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="city">City</label>
            <br />
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="state">State</label>
            <br />
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label htmlFor="zip_code">Zip Code</label>
            <br />
            <input
              type="text"
              id="zip_code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <button className="button button-s button-success border-radius-4px">
            Create Salon
          </button>
        </form>
      </div>
    </div>
  );
}

export default SalonCreateForm;
