import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />
      </Routes>
    </>
  );
}

export default App;