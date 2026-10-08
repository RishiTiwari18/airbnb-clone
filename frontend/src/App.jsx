import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Register from "./pages/Register";

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

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;