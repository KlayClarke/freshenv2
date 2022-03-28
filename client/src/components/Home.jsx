import { useState, useEffect, useRef } from "react";

function Home() {
  const [apiResponse, setApiResponse] = useState();
  const [testState, setTestState] = useState("testing");

  async function callApi() {
    let response = await fetch(process.env.REACT_APP_API_ENDPOINT);
    let data = await response.text();
    setApiResponse(data);
  }

  useEffect(() => {
    callApi();
  });

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
