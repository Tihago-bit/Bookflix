import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpages from "./pages/Loginpages";
import Registerpage from "./pages/Registerpage";
import Catalogopage from "./pages/Catalogopage";
import Bookpage from "./pages/Bookpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpages />} />
        <Route path="/catalogo" element={<Catalogopage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/book/:id" element={<Bookpage />} />
      </Routes>
    </Router>
  );
}

export default App;
