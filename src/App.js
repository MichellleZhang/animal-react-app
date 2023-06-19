import './App.css';
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import PetSOS from './PetSOS';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<PetSOS />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;