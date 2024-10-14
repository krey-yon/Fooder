import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/Home";
import Favourite from "./Components/Pages/Favorites";
import Details from "./Components/Pages/Details";

function App() {
  return (
    <>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favourite />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
