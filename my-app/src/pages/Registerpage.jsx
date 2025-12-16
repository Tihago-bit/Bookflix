/*import Register from "../components/Register";
import "../styles/App.css";

export default function Registerpage() {
  return (
    <div>
      <Register />
      <a href="/">¿Ya tenés cuenta? Iniciá sesión</a>
    </div>
    
  );
}*/

import Register from "../components/Register"; 
import "../styles/App.css";
import { Link } from "react-router-dom";

export default function Registerpage() {
  return (
    <div>
      <Register />

      {/* Este p ahora queda dentro del MISMO cuadro visual */}
      <p className="register-link">
        ¿Ya tenés cuenta?{" "}
        <Link to="/">Iniciá sesión</Link>
      </p>
    </div>
  );
}
