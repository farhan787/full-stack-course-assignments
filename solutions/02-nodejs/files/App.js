// import logo from './logo.svg';
import "./App.css";
import Navbar from "./component/Navbar";
import TextForm from "./component/TextForm";
import React, { useState } from "react";
// import About from './component/About';
import Alert from "./component/Alert";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type
    });
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "grey";
      showAlert("Dark mode enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";

      showAlert("LightMode enabled", "success");
    }
  };
  return (
    <>
      <Navbar title="Azhan" mode={mode} toggleMode={toggleMode} />

      <Alert alert={alert} />
      <div className="container my-3">
        <TextForm heading="Enter Text to Analyse" mode={mode} />
        {/* <About/> */}
      </div>
    </>
  );
}

export default App;
