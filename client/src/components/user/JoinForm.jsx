function JoinForm() {
  return (
    <div className="join-content-container">
      <form action="">
        <div className="form-section">
          <label htmlFor="display-name">Display Name</label>
          <br />
          <input type="text" id="display-name" />
          <br />
        </div>
        <div className="form-section">
          <label htmlFor="email">Email</label>
          <br />
          <input type="text" id="email" />
          <br />
        </div>
        <div className="form-section">
          <label htmlFor="password">Password</label>
          <br />
          <input type="text" id="password" />
          <br />
        </div>
      </form>
    </div>
  );
}

export default JoinForm;
