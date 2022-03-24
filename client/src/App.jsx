import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [apiResponse, setApiResponse] = useState(() => {
    console.log("run function");
    return "api response";
  });
  const [testState, setTestState] = useState("testing");

  async function callApi() {
    let response = await fetch(process.env.REACT_APP_API_ENDPOINT);
    let data = response.text();
    setApiResponse("data");
  }

  useEffect(() => {
    callApi();
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>{apiResponse}</p>
        <p>Hello world!</p>
        <p>{testState}</p>
      </header>
    </div>
  );
}

export default App;
