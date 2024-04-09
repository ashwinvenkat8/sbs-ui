import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index path="/" element={<Landing />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
