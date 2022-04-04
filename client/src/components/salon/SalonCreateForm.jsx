function SalonCreateForm() {
  return (
    <div className="salon-create-content-wrapper">
      <div className="salon-create-content-container">
        <form action="">
          <div className="form-section">
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" id="name" />
          </div>
          <div className="form-section">
            <label htmlFor="type">Type</label>
            <br />
            <select name="type" id="type">
              <option value="" disabled selected>
                ...
              </option>
              <option value="barbershop">Barbershop</option>
              <option value="salon">Salon</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="average_price">Average Price ($)</label>
            <br />
            <input type="number" id="average_price" min={0} />
          </div>
          <div className="form-section">
            <label htmlFor="images">Images</label>
            <br />
            <input type="file" id="images" multiple />
          </div>
          <div className="form-section">
            <label htmlFor="street_address">Street Address</label>
            <br />
            <input type="text" id="street_address" />
          </div>
          <div className="form-section">
            <label htmlFor="city">City</label>
            <br />
            <input type="text" id="city" />
          </div>
          <div className="form-section">
            <label htmlFor="state">State</label>
            <br />
            <input type="text" id="state" />
          </div>
          <div className="form-section">
            <label htmlFor="zip_code">Zip Code</label>
            <br />
            <input type="text" id="zip_code" />
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
