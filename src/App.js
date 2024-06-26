import "./App.css";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import History from "./History";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const getLocalData = () => {
    let data = localStorage.getItem("data");
    // console.log(data);

    if (data) {
      return JSON.parse(localStorage.getItem("data"));
    } else {
      return [];
    }
  };

  const [formData, setFormData] = useState(getLocalData());

  const handleDelete = (index) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(formData));
  }, [formData]);
  // console.log(formData);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                formData={formData}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            }
          />
          <Route path="/history" element={<History formData={formData} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
